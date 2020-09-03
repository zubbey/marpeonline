<template>
  <div>
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <div>
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Product Settings" active>
              <b-card-text>
                <div>
                  <label for="tags-state-event">Shipping Methods</label>
                  <b-form-tags
                    input-id="tags-state-event"
                    v-model="shippingmethods"
                    :tag-validator="validator"
                    placeholder="Enter tags (3-50 characters) separated by comma"
                    separator=","
                    @tag-state="onTagState"
                  ></b-form-tags>
                </div>
                <hr class="mb-3" />
              </b-card-text>
              <!-- add tags for objects -->
              <b-card-text>
                <label for="tags-state-event">Product Websites</label>
                <div class="contain border w-100 p-2">
                  <ul
                    class="list-unstyled mt-n1 mb-0 d-flex flex-wrap align-items-center"
                    id="__BVID__119___TAG__LIST__"
                  >
                    <li
                      title="self pickup"
                      class="badge b-form-tag d-inline-flex align-items-baseline mw-100 my-0 mr-1 badge-secondary"
                      id="__BVID__126"
                      aria-labelledby="__BVID__126__taglabel_"
                      v-for="(website, index) in productWebsites"
                      :key="index"
                    >
                      <span
                        class="b-form-tag-content flex-grow-1 text-truncate"
                        id="__BVID__126__taglabel_"
                      >{{website.text}}</span>
                      <button
                        aria-keyshortcuts="Delete"
                        type="button"
                        aria-label="Remove tag"
                        class="close b-form-tag-remove ml-1"
                        aria-controls="__BVID__126"
                        aria-describedby="__BVID__126__taglabel_"
                        @click="handleRemoveWebsite(website)"
                      >×</button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="btn b-form-tags-button p-0 btn-outline-secondary"
                        style="font-size: 90%;"
                        v-b-modal.productWebsiteModal
                      >
                        <b-icon icon="plus"></b-icon>
                      </button>
                    </li>
                  </ul>
                </div>
                <hr class="mb-3" />
              </b-card-text>

              <b-card-text>
                <label for="tags-state-event">Social Media</label>
                <b-row
                  class="my-1 align-items-center"
                  v-for="(social, index) in socials"
                  :key="index"
                >
                  <b-col sm="1">
                    <mdb-icon fab :icon="social.icon" size="lg" />
                  </b-col>
                  <b-col>
                    <b-form-input
                      type="url"
                      v-model="social.link"
                      placeholder="paste social media link here"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <hr class="mb-3" />
              </b-card-text>

              <b-card-text>
                <label for="tags-state-event">Notes</label>

                <div class="columns is-mobile">
                  <div class="column" v-for="(note, index) in notes" :key="index">
                    <article class="message">
                      <div class="message-header">
                        <p>{{ note.page }}</p>
                        <button @click="editNote(note)">
                          <b-icon icon="pencil-square"></b-icon>
                        </button>
                        <button class="delete" aria-label="delete"></button>
                      </div>
                      <div class="message-body">
                        <div class="content">
                          <div v-html="note.message"></div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <hr class="mb-3" />
              </b-card-text>
              <mdb-btn color="primary" v-if="log.loading" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Please Wait...
              </mdb-btn>
              <mdb-btn
                v-else
                type="button"
                class="btn-primary"
                @click="handleUpdateChanges1"
              >Save Changes</mdb-btn>
            </b-tab>
            <b-tab title="Prices Settings">
              <b-card-text>
                <label for="tags-state-event">Currency Rates</label>
                <b-form ref="ratesForm">
                  <div v-for="(rate, index) in rates" :key="index">
                    <b-row
                      class="my-1 align-items-center"
                      v-for="(value, name, index) in rate"
                      :key="index"
                    >
                      <b-col sm="2">
                        <label :for="name">{{name}}</label>
                      </b-col>
                      <b-col>
                        <b-form-input
                          type="number"
                          placeholder="Enter Amount"
                          :value="value"
                          :name="name"
                          step="any"
                          required
                        ></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                </b-form>
                <hr class="mb-3" />
              </b-card-text>

              <b-card-text>
                <label for="tags-state-event">Marpe Commission</label>
                <b-form ref="commissionForm">
                  <b-row
                    class="my-1 align-items-center"
                    v-for="(value, name, index) in commission"
                    :key="index"
                  >
                    <b-col sm="2">
                      <label :for="name">{{name}}</label>
                    </b-col>
                    <b-col>
                      <b-form-input
                        type="number"
                        placeholder="Enter Amount"
                        :value="value"
                        :name="name"
                        step="any"
                        required
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </b-form>
                <hr class="mb-3" />
              </b-card-text>
              <b-button variant="primary" disabled v-if="log.loading">
                <b-spinner small></b-spinner>
                Please wait...
              </b-button>
              <b-button v-else variant="primary" type="button" @click="handleSaveRates">Update Prices</b-button>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>

      <!-- MODALS -->
      <b-modal
        ref="productWebsiteModal"
        id="productWebsiteModal"
        hide-backdrop
        content-class="shadow"
        title="Product Website"
      >
        <b-row class="my-1">
          <b-col sm="3">
            <label for="text">Website</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="text"
              type="text"
              v-model="productWebsiteText"
              @keydown.enter="handelAddWebsite"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="text">Web Link</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="text" type="url" v-model="productWebsiteValue" disabled></b-form-input>
          </b-col>
        </b-row>
        <div class="error" v-if="logger.error">{{ logger.errMsg }}</div>
        <template v-slot:modal-footer="{ ok }">
          <b-button size="sm" variant="success" @click="handelAddWebsite">
            <b-icon icon="plus"></b-icon>Add
          </b-button>
        </template>
      </b-modal>

      <!-- EDIT NOTES MODAL -->
      <b-modal
        ref="noteModal"
        id="noteModal"
        hide-backdrop
        content-class="shadow"
        title="page note"
      >
        <b-form-group class="my-1">
          <label for="text">Page Title</label>
          <b-form-input id="text" type="text" v-model="editableNote.page"></b-form-input>
        </b-form-group>
        <b-form-group>
          <ckeditor :editor="editor" v-model="editableNote.message" :config="editorConfig"></ckeditor>
        </b-form-group>

        <div class="error" v-if="logger.error">{{ logger.errMsg }}</div>
        <template v-slot:modal-footer="{ ok }">
          <b-button size="sm" variant="success" @click="handelSaveNote">Save</b-button>
        </template>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from "mdbvue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import { mapState } from "vuex";

export default {
  name: "general_settings",
  props: ["id"],
  components: {
    Breadcrumb,
    mdbIcon,
    mdbBtn,
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview",
        },
        {
          text: "General Settings",
          href: "/admin/" + this.id + "/general_settings",
        },
      ],
      logger: {
        error: false,
        errMsg: "",
      },
      shippingmethods: [],
      productWebsites: [],
      socials: [],
      notes: [],
      editableNote: {},
      rates: [],
      commission: {},
      validTags: [],
      invalidTags: [],
      duplicateTags: [],
      productWebsiteText: "",
      productWebsiteValue: "",
      editor: ClassicEditor,
      editorConfig: {
        toolbarGroups: [
          { name: "document", groups: ["mode", "document", "doctools"] },
          { name: "clipboard", groups: ["clipboard", "undo"] },
          {
            name: "editing",
            groups: ["find", "selection", "spellchecker", "editing"],
          },
          { name: "forms", groups: ["forms"] },
          "/",
          { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
          {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
          },
          { name: "links", groups: ["links"] },
          { name: "insert", groups: ["insert"] },
          "/",
          { name: "styles", groups: ["styles"] },
          { name: "colors", groups: ["colors"] },
          { name: "tools", groups: ["tools"] },
          { name: "others", groups: ["others"] },
          { name: "about", groups: ["about"] },
        ],
      },
    };
  },
  watch: {
    productWebsiteText(text) {
      this.productWebsiteValue = "https://" + text;
    },
  },
  mounted() {
    this.shippingmethods = this.settings.shippingmethods;
    this.productWebsites = this.settings.productwebsites;
    this.socials = this.settings.socials;
    this.notes = this.settings.notes;
    this.rates = this.settings.rates;
    this.commission = this.settings.commission;
  },
  computed: {
    ...mapState(["user", "settings", "adminData", "log"]),
  },
  methods: {
    onTagState(valid, invalid, duplicate) {
      this.validTags = valid;
      this.invalidTags = invalid;
      this.duplicateTags = duplicate;
    },
    validator(tag) {
      return tag.length > 2 && tag.length < 50;
    },
    handelAddWebsite() {
      let payload = {
        text: this.productWebsiteText,
        value: this.productWebsiteValue,
      };
      let inExist = this.productWebsites.filter(
        (website) =>
          website.text.toLowerCase() === this.productWebsiteText.toLowerCase()
      );
      if (inExist.length > 0) {
        this.logger.errMsg = "Website already exist. Add a different website";
        return (this.logger.error = true);
      }
      this.productWebsites.push(payload);
      this.$refs["productWebsiteModal"].hide();
      (this.productWebsiteText = ""),
        (this.productWebsiteValue = ""),
        (this.logger = {
          error: false,
          errMsg: "",
        });
    },
    handleRemoveWebsite(website) {
      this.productWebsites = this.productWebsites.filter(
        (item) => item.text != website.text
      );
    },
    editNote(note) {
      this.editableNote = note;
      this.$refs["noteModal"].show();
    },
    handelSaveNote() {
      let foundIndex = this.notes.findIndex(
        (x) => x.id == this.editableNote.id
      );
      this.notes[foundIndex] = this.editableNote;
      this.$refs["noteModal"].hide();
      this.editableNote = {};
    },
    handleUpdateChanges1() {
      let payload = {
        token: localStorage.getItem("adminAccessToken"),
        productwebsites: this.productWebsites,
        shippingmethods: this.shippingmethods,
        notes: this.notes,
        socials: this.socials,
      };
      this.$store
        .dispatch("updateGeneralSettings1", payload)
        .then(() => {
          this.makeToast("success", "Saved Successfully!", true);
          this.$store.commit("RESET");
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", error.response.data.message, true);
        });
    },
    handleSaveRates(e) {
      e.preventDefault();
      console.log(this.$refs.ratesForm.d_to_n.value);
      let payload = {
        token: localStorage.getItem("adminAccessToken"),
        rates: [
          { d_to_n: this.$refs.ratesForm.d_to_n.value },
          { d_to_y: this.$refs.ratesForm.d_to_y.value },
          { d_to_g: this.$refs.ratesForm.d_to_g.value },
          { n_to_g: this.$refs.ratesForm.n_to_g.value },
          { n_to_y: this.$refs.ratesForm.n_to_y.value },
          { y_to_g: this.$refs.ratesForm.y_to_g.value },
        ],
        commission: {
          shipping: this.$refs.commissionForm.shipping.value,
          procurementfee: this.$refs.commissionForm.procurementfee.value,
          kg: this.$refs.commissionForm.kg.value,
        },
      };
      this.$store
        .dispatch("updateGeneralSettings2", payload)
        .then(() => {
          this.makeToast("success", "Saved Successfully!", true);
          this.$store.commit("RESET");
          this.rates = payload.rates;
          this.commission = payload.commission;
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", error.response.data.message, true);
        });
    },
    makeToast(variant = null, msg, append = false) {
      let color = "";
      switch (variant) {
        case "success":
          color = "#a0e689";
          break;
        case "danger":
          color = "#ff5555";
          break;
        case "warning":
          color = "#f3c744";
          break;

        default:
          color = "#649aff";
          break;
      }
      // Create the title
      const h = this.$createElement;
      const template = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline"] },
        [
          h("b-img", {
            class: "mr-2",
            style: `background-color: ${color}; width: 12px; height: 12px;`,
          }),
          h("strong", { class: "mr-auto" }, "Notice!"),
          h(
            "small",
            { class: "text-muted mr-2" },
            `${new Date().getSeconds()} seconds ago`
          ),
        ]
      );
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: template,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>

<style>
.has-clear-right .form-control {
  min-width: 200px;
}
.divHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #eee !important;
}
.error {
  color: #f16383;
}
.message {
  background: #eef3fc !important;
}
.message-body {
  color: #3273dc !important;
}
.message-header {
  background: transparent !important;
  color: #3273dc !important;
}
.badge-secondary {
  color: #fff !important;
  background-color: #3273dc !important;
}
.content blockquote {
  background-color: transparent !important;
}
.btn-outline-secondary {
  color: #000 !important;
  border: 2px solid #000 !important;
}
</style>