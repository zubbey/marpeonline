<template >
  <div :key="reload" class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <b-row>
        <b-col class="container card mx-3 px-3">
          <div class="divHeader">
            <h3 class="h3">All Categories</h3>
            <mdb-btn color="primary" @click.native="modal = true">
              <b-icon icon="plus"></b-icon>Add category
            </mdb-btn>
          </div>
          <mdb-input class="mt-0" v-model="search" label="Search by Name" />
          <mdb-datatable-2
            v-model="data"
            :searching="{value: search, field: 'categoryName'}"
            selectable
            @selected="selected = $event"
          />
        </b-col>
      </b-row>

      <mdb-modal size="md" :show="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title>Add Category</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form ref="categoryform" class="form-signin" @submit.prevent="create">
            <b-form-group>
              <div class="form-label-group">
                <b-form-input type="text" id="inputFname" :state="valid" v-model="categoryName" />
                <label for="inputFname">Category Name</label>
                <b-form-invalid-feedback
                  v-if="error == true"
                  :state="validation.categoryName"
                >Please Enter Category Name.</b-form-invalid-feedback>
                <b-form-invalid-feedback
                  v-if="error == true"
                  :state="!validation.exist.length > 0"
                >Category already existing! Create another.</b-form-invalid-feedback>
              </div>
            </b-form-group>

            <b-button block variant="primary" v-if="log.loading" disabled>
              <b-spinner small type="grow"></b-spinner>Please Wait
            </b-button>
            <b-button
              block
              variant="primary"
              type="submit"
              v-else-if="categoryName.length > 3"
            >Create</b-button>
          </form>
        </mdb-modal-body>
      </mdb-modal>
    </b-container>

    <Footer />
  </div>
</template>

<script>
import {
  mdbDatatable2,
  mdbInput,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
} from "mdbvue";
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";

import { mapState, mapGetters } from "vuex";
export default {
  name: "users",
  props: ["id"],
  components: {
    mdbDatatable2,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    Breadcrumb,
    Footer,
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview",
        },
        {
          text: "Users",
          href: "/admin/" + this.id + "/categories",
        },
      ],
      reload: 1,
      modal: false,
      search: "",
      selected: null,
      data: {
          columns: [
          {
            label: "Category Name",
            field: "categoryName",
            sort: true,
          },
          {
            label: "Slug",
            field: "slug",
            sort: true,
          },
          {
            label: "items",
            field: "items",
            sort: true,
          },
          {
            label: "Created",
            field: "created",
            sort: false,
            format: (value) => new Date(value).toDateString(),
          },
        ],
        rows: []
      },
      error: null,
      valid: null,
      categoryName: "",
      categories: []
    };
  },
  created(){
    if(this.adminData.category.length > 0){
      this.data.rows = this.adminData.category
    }
  },
  watch: {
    selected(newEvent) {
      if (newEvent !== null) {
        this.deleteCategory(newEvent)
      }
    },
  },
  computed: {
    ...mapState(["user", "adminData", "log", "cart", "toast"]),
    ...mapGetters(["fullname"]),

    validation() {
      return {
        categoryName: this.categoryName.length > 0,
        exist: this.adminData.category.filter(
          (c) => c.categoryName === this.categoryName
        ),
      };
    },
  },
  methods: {
    create() {
      if (!this.validation.categoryName) {
        this.error = true;
        return;
      } else if (this.validation.exist.length > 0) {
        console.log("already existing!");
        this.error = true;
        return;
      }
      const payload = {
        token: localStorage.getItem("adminAccessToken"),
        categoryName: this.categoryName,
      };
      this.$store
        .dispatch("createCategory", payload)
        .then((data) => {
          this.$store.commit("NEW_CATEGORY_CREATED", data);
          // this.data.rows.unshift(data);
          this.reload += 1;
          this.$refs.categoryform.reset();
          this.modal = false;
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", this.toast.message, true);
        });
    },
    deleteCategory(category){
      this.$bvModal
          .msgBoxConfirm(
            `Are you sure you want to delete the selected category`,
            {
              title: "Please Confirm",
              size: "sm",
              buttonSize: "sm",
              okVariant: "primary",
              cancelVariant: "outline",
              okTitle: "Yes delete",
              cancelTitle: "No wait",
              footerClass: "p-2",
              hideHeaderClose: false,
              centered: true,
            }
          )
          .then((value) => {
            if (value === true) {
              const payload = {
                token: localStorage.getItem("adminAccessToken"),
                id: category._id,
              };
              this.$store
                .dispatch("deleteCategory", payload)
                .then(data => {
                  console.log(data);
                  this.makeToast("warning", `${category.categoryName} was deleted!`, true);
                  this.selected = null;
                  this.reload += 1;
                  this.data.rows = this.adminData.category.filter(cat => cat._id !== payload.id)
                })
                .catch((error) => {
                  this.$store.commit(
                    "logServerErr",
                    error.response.data.message
                  );
                  this.makeToast("danger", this.toast.message, true);
                });
            } else {
              this.selected = null;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    // toast
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
        toaster: "b-toaster-top-right",
        autoHideDelay: 8000,
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
</style>