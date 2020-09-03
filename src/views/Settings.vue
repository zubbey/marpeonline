<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />
    </b-container>

    <b-container>
      <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2" class="mb-5">
        <b-col class="mb-3">
          <b-card class="text-left">
            <template v-slot:header class="align-items-center">
              <b-avatar size="72px"></b-avatar>
              <h3 class="mb-0 ml-2">
                <b>{{ capitalize(fullname) }}</b>
                <br />
                <small>Joined: {{ registerd }}</small>
              </h3>
            </template>

            <b-list-group flush>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Email:
                <span>{{ user.email }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Phone:
                <span>{{ user.phone }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Address:
                <span>{{ user.address }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                City:
                <span>{{ user.city }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Country:
                <span>{{ user.country }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Zip Code:
                <span>{{ user.zip }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Shipping Address:
                <span>{{ user.shippingaddress }}</span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>

        <!-- for profile updates -->
        <b-col>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Change Password" active>
                <b-card-text>
                  <b-form @submit.prevent="changePassword" v-if="show">
                    <b-form-group id="oldPassword" label="Old Password:" label-for="oldPassword">
                      <b-form-input
                        id="oldPassword"
                        :state="valid"
                        v-model="oldpassword"
                        type="password"
                        placeholder="Enter your old Password"
                      ></b-form-input>
                      <div class="invalid-feedback d-block" v-if="log.msgError">{{ log.message }}</div>
                    </b-form-group>

                    <b-form-group id="newPassword" label="New Password:" label-for="newPassword">
                      <b-form-input
                        id="newPassword"
                        :state="valid"
                        v-model="newpassword"
                        type="password"
                        placeholder="Enter a New Password"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        :state="validation.n"
                        v-if="error === true"
                      >Password must be atleast 6 characters long.</b-form-invalid-feedback>
                      <b-form-valid-feedback
                        v-if="error === false"
                        :state="validation.n"
                      >you're doing well!.</b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group
                      id="confirmPassword"
                      label="Comfirm Password:"
                      label-for="confirmPassword"
                    >
                      <b-form-input
                        id="confirmPassword"
                        :state="valid"
                        v-model="confirmpassword"
                        type="password"
                        placeholder="Confirm New Password"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        v-if="error === true"
                        :state="valid"
                      >Both password did not match.</b-form-invalid-feedback>
                      <b-form-valid-feedback
                        v-if="error === false"
                        :state="validation.c"
                      >Looks Good.</b-form-valid-feedback>
                    </b-form-group>

                    <b-button type="submit" variant="primary">
                      <b-spinner small type="grow" v-if="log.loading"></b-spinner>Save Changes
                    </b-button>
                  </b-form>
                </b-card-text>
              </b-tab>

              <b-tab title="Update Address">
                <b-form @submit.prevent="saveAddress" v-if="show">
                  <div v-if="log.msgError" class="alert alert-danger" role="alert">{{ log.message }}</div>
                  <div
                    v-if="log.msgSuccess"
                    class="alert alert-success"
                    role="alert"
                  >{{ log.message }}</div>
                  <b-form-group id="address" label="Address:" label-for="city">
                    <b-form-input
                      id="address"
                      v-model="form.address"
                      type="text"
                      placeholder="Enter your address"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="city" label="Your City:" label-for="city">
                    <b-form-input
                      id="city"
                      v-model="form.city"
                      type="text"
                      placeholder="Enter your city"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="country" label="Your Country:" label-for="country">
                    <b-form-select id="country" v-model="form.country" :options="country" required></b-form-select>
                  </b-form-group>

                  <b-form-group id="zip" label="Your Zip Code:" label-for="zip">
                    <b-form-input
                      id="zip"
                      v-model="form.zip"
                      type="text"
                      placeholder="Enter your city Zip Code"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="shippingaddress"
                    label="Your Shipping Address:"
                    label-for="shippingaddress"
                  >
                    <b-form-input
                      id="shippingaddress"
                      v-model="form.shippingaddress"
                      type="text"
                      placeholder="Enter your shipping Addresss"
                    ></b-form-input>
                  </b-form-group>

                  <b-button type="submit" variant="primary">
                    <b-spinner small type="grow" v-if="log.loading"></b-spinner>Save Changes
                  </b-button>
                </b-form>
              </b-tab>
              <b-tab title="Update Avater">
                <b-card-text>Coming soon!</b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "settings",
  components: {
    Breadcrumb,
    Footer,
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          href: "/user/" + this.id + "/",
        },
        {
          text: "Account Settings",
          href: "/user/" + this.id + "/settings",
        },
      ],
      error: null,
      valid: null,
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      form: {
        address: "",
        city: "",
        country: null,
        zip: null,
        shippingaddress: "",
      },
      country: [],
      show: true,
    };
  },
  mounted() {
    (this.form = {
      address: this.user.address,
      city: this.user.city,
      country: this.user.country,
      zip: this.user.zip,
      shippingaddress: this.user.shippingaddress,
    }),
      this.$store
        .dispatch("getCountries")
        .then((data) => {
          data.forEach((country) => {
            this.country.push(country.name);
          });
        })
        .catch((error) => {
          console.log(error);
        });
  },
  computed: {
    ...mapState(["user", "log", "cart"]),
    ...mapGetters(["fullname", "registerd"]),
    validation() {
      return {
        n: this.newpassword.length > 5,
        c:
          this.confirmpassword === this.newpassword &&
          !this.confirmpassword == "",
      };
    },
  },
  methods: {
    changePassword() {
      let token = localStorage.getItem("accessToken");
      let password = this.newpassword;
      let oldpassword = this.oldpassword;

      if (!this.validation.n || !this.validation.c) {
        this.error = true;
        this.valid = false;
        return;
      }
      this.valid = true;
      this.error = false;
      this.$store
        .dispatch("updatePassword", { token, password, oldpassword })
        .then(() => {
          let msg = "Saved! you're doing well";
          this.$store.commit("SAVED", msg);
        })
        .then(() =>
          setTimeout(() => {
            localStorage.removeItem("isAuthorized");
            localStorage.removeItem("accessToken");
            window.location.reload();
          }, 3000)
        )
        .catch((error) => {
          this.valid = false;
          this.$store.commit("logServerErr", error.response.data.message);
        });
    },
    saveAddress() {
      let token = localStorage.getItem("accessToken");

      this.$store
        .dispatch("updateAddress", { token, payload: this.form })
        .then(() => {
          let msg = "Saved! you're doing well";
          this.$store.commit("SAVED", msg);
        })
        .then(() => {
          this.$store
            .dispatch("Authenticate_User", token)
            .then((data) => {
              const payload = { message: "", user: data[0] };
              this.$store.commit("SUCCESS", payload);
            })
            .then(() =>
              setTimeout(() => {
                this.$store.commit("RESET");
              }, 3000)
            )
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
        });
    },
    capitalize(str, lower = false) {
      if (typeof str !== "string") return "";
      return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    }
  },
};
</script>

<style>
</style>