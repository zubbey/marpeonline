<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <b-row>
        <b-col class="container card mx-3">
          <div class="divHeader">
            <h3 class="h3">All Marpe users</h3>
            <mdb-btn color="primary" @click.native="modal = true">
              <b-icon icon="plus"></b-icon>Add user
            </mdb-btn>
          </div>
          <mdb-input class="mt-0" v-model="search" label="Search by Email address" />
          <mdb-datatable-2 v-model="userdata" :searching="{value: search, field: 'email'}" />
        </b-col>
      </b-row>

      <mdb-modal size="md" :show="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title>Add user</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form ref="registerUser" class="form-signin" @submit.prevent="signup">
            <b-form-group>
              <b-row>
                <b-col>
                  <div class="form-label-group">
                    <b-form-input
                      type="text"
                      id="inputFname"
                      :state="valid"
                      v-model="firstname"
                    />
                    <label for="inputFname">First name</label>
                    <b-form-invalid-feedback
                      v-if="error == true"
                      :state="validation.fname"
                    >First Name is Required.</b-form-invalid-feedback>
                  </div>
                </b-col>

                <div class="col">
                  <div class="form-label-group">
                    <b-form-input
                      type="text"
                      id="inputLname"
                      :state="valid"
                      v-model="lastname"
                    />
                    <label for="inputLname">Last name</label>
                    <b-form-invalid-feedback
                      v-if="error == true"
                      :state="validation.lname"
                    >Last Name is Required.</b-form-invalid-feedback>
                  </div>
                </div>
              </b-row>
            </b-form-group>

            <div class="form-label-group">
              <b-form-input
                type="text"
                id="inputEmail"
                :state="valid"
                v-model="email"
              />
              <label for="inputEmail">Email address</label>
              <b-form-invalid-feedback
                :state="validation.email"
                v-if="error === true"
              >Email Address is Required.</b-form-invalid-feedback>
            </div>

            <div class="form-label-group">
              <b-form-input
                type="text"
                id="inputNumber"
                :state="valid"
                v-model="phone"
              />
              <label for="inputNumber">Mobile number</label>
              <b-form-invalid-feedback
                :state="validation.phone"
                v-if="error === true"
              >Phone Number is Required.</b-form-invalid-feedback>
            </div>

            <div class="form-label-group">
              <b-form-input
                type="password"
                id="inputPassword"
                :state="valid"
                v-model="password"
              />
              <label for="inputPassword">Password</label>
              <b-form-invalid-feedback
                :state="validation.password"
                v-if="error === true"
              >Password must be atleast 6 characters long.</b-form-invalid-feedback>
            </div>

            <div class="form-label-group">
              <b-form-input
                type="password"
                id="inputCPassword"
                :state="valid"
                v-model="comfirm_password"
              />
              <label for="inputCPassword">Comfirm Password</label>
              <b-form-invalid-feedback
                :state="validation.cpassword"
                v-if="error === true"
              >Both password did not match.</b-form-invalid-feedback>
            </div>

            <b-button
              block
              variant="primary"
              type="submit"
              v-if="!log.loading"
              :disabled=" password.length < 6"
            >Sign up</b-button>
            <b-button block variant="primary" v-else disabled>
              <b-spinner small type="grow"></b-spinner>Please Wait
            </b-button>
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

import { mapState, mapGetters, mapActions } from "vuex";
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
          href: "/admin/" + this.id + "/users",
        },
      ],
      modal: false,
      search: "",
      columns: [
        {
          label: "Firstname",
          field: "firstname",
          sort: true,
        },
        {
          label: "Lastname",
          field: "lastname",
          sort: true,
        },
        {
          label: "Email",
          field: "email",
          sort: true,
        },
        {
          label: "Phone",
          field: "phone",
          sort: true,
        },
        {
          label: "Country",
          field: "country",
          sort: true,
        },
        {
          label: "City",
          field: "city",
          sort: false,
        },
        {
          label: "Address",
          field: "address",
          sort: false,
        },
        {
          label: "Zip",
          field: "zip",
          sort: false,
        },
        {
          label: "Code",
          field: "referralcode",
          sort: false,
        },
        {
          label: "Created",
          field: "created",
          sort: false,
          format: (value) => new Date(value).toDateString(),
        },
      ],
      error: null,
      valid: null,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      comfirm_password: "",
    };
  },
  computed: {
    ...mapState(["user", "adminData", "log", "cart", "toast"]),
    ...mapGetters(["fullname"]),
    userdata() {
      let rows = [];
      if (this.adminData.users.length > 0) {
        rows = this.adminData.users;
      }

      const data = Object.assign({}, { rows: rows }, { columns: this.columns });
      return data;
    },

    validation() {
      return {
        fname: this.firstname.length > 0,
        lname: this.lastname.length > 0,
        email: this.email.length > 0,
        phone: this.phone.length > 0,
        password: this.password.length > 5,
        cpassword: this.comfirm_password === this.password,
      };
    },
  },
  methods: {
    ...mapActions(["getAllData"]),
    signup() {
      if (
        !this.validation.fname &&
        !this.validation.lname &&
        !this.validation.email &&
        !this.validation.phone
      ) {
        this.error = true;
        return;
      } else if (!this.validation.password) {
        this.error = true;
        return;
      } else if (!this.validation.cpassword) {
        this.error = true;
        return;
      } else {
        this.valid = true;
        this.error = false;
      }
      this.$store
        .dispatch("registerUser", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          password: this.password,
        })
        .then(() => {
          this.$store.commit("USER_CREATED");
          this.modal = false;

          let newUser = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            created: new Date()
          };

          this.adminData.users.push(newUser);
          this.$refs.registerUser.reset();
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", this.toast.message, true);
        });
    },
        // toast
    makeToast(variant = null, msg, append = false) {
      let color = '';
      switch (variant) {
        case 'success':
          color = '#a0e689';
          break;
        case 'danger':
          color = '#ff5555';
          break;
        case 'warning':
          color = '#f3c744';
          break;

        default:
          color = '#649aff';
          break;
      }
      // Create the title
      const h = this.$createElement;
      const template = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline'] },
        [
          h('b-img', { class: 'mr-2', style: `background-color: ${color}; width: 12px; height: 12px;`}),
          h('strong', { class: 'mr-auto' }, 'Notice!'),
          h('small', { class: 'text-muted mr-2' }, `${new Date().getSeconds()} seconds ago`)
        ]
      )
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: template,
        variant: variant,
        solid: true,
        toaster: 'b-toaster-top-right',
        autoHideDelay: 8000,
        appendToast: append,
      });
    }
  }
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