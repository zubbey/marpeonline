<template >
  <div>
    <Header />
    <div class="container">
      <div class="py-5 text-center">
        <h2>Checkout form</h2>
        <p
          class="lead"
        >Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
      <!-- col-md-4 order-md-2 mb-4 -->
      <b-row cols="1" cols-lg="2">
        <b-col cols-sm="1" cols-md="4" order-md="2" class="mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">{{ this.cart.length }}</span>
          </h4>
          <ul v-for="(item, index) in cart" :key="index" class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div class="pr-4">
                <img :src="item.product.thumbnail" width="100" class="mb-4" />
              </div>
              <div>
                <h6 class="my-0">{{ item.product.name }}</h6>
                <h6 class="bold">Qty: {{ item.qty }}</h6>
                <span class="text-muted">
                  Price:
                  <strong>{{ item.product.price | toCurrency }}</strong>
                </span>
              </div>
            </li>
          </ul>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{{ totalItemPrice | toCurrency }}</strong>
            </li>
          </ul>
        </b-col>
        <!-- col-md-8 order-md-1 -->
        <b-col cols-sm="1" cols-md="8" order-md="1">
          <h4 class="mb-3">Billing address</h4>
          <b-alert show variant="danger" v-if="log.msgError && !log.message == ''">{{ log.message }}</b-alert>

          <mdb-container class="mt-5">
            <form class="needs-validation" novalidate @submit="checkForm">
              <div class="form-row">
                <div class="col mb-3">
                  <label for="validationCustom01">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    v-model="form.firstname"
                    required
                  />
                  <div class="invalid-feedback">Please provide your firstname.</div>
                </div>
                <div class="col mb-3">
                  <label for="validationCustom02">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom02"
                    v-model="form.lastname"
                    required
                  />
                  <div class="invalid-feedback">Please provide your lastname.</div>
                </div>
              </div>
              <div class="form-group">
                <label for="validationCustom03">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="validationCustom03"
                  v-model="form.email"
                  required
                />
                <div
                  class="invalid-feedback"
                >Please provide a valid email address for shipping update.</div>
              </div>
              <div class="form-group">
                <label for="validationCustom04">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom04"
                  v-model="form.phone"
                  required
                />
                <div class="invalid-feedback">Please provide your phone number for shipping update.</div>
              </div>
              <div class="form-group">
                <label for="validationCustom05">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom05"
                  v-model="form.address"
                  required
                />
                <div class="invalid-feedback">Please provide your Address for shipping update.</div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <b-form-group id="country" label="Country" label-for="country">
                    <b-form-select id="country" v-model="form.country" :options="country" required></b-form-select>
                    <div class="invalid-feedback">Please select a valid country</div>
                  </b-form-group>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="validationCustom06">City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom06"
                    v-model="form.city"
                    required
                  />
                  <div class="invalid-feedback">Please provide a valid state.</div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="validationCustom07">Zip</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom07"
                    v-model="form.zip"
                    required
                  />
                  <div class="invalid-feedback">Please provide a valid zip.</div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-check pl-0">
                  <input class="form-check-input" type="checkbox" value id="invalidCheck" required />
                  <label class="form-check-label" for="invalidCheck">Checkout with Paystack</label>
                  <div class="invalid-feedback">You must select your payment method.</div>
                </div>
              </div>
              <mdb-btn type="submit">
                <b-spinner small type="grow" v-if="log.loading"></b-spinner>Continue
                <b-icon icon="chevron-right"></b-icon>
              </mdb-btn>
            </form>
          </mdb-container>
          <!-- <form class="needs-validation" novalidate>
            <b-row>
              <b-col>
                <b-form-group>
                  <label for="inputFname">First name</label>
                  <b-form-input
                    type="text"
                    id="inputFname"
                    :state="valid"
                    v-model="form.firstname"
                  />
                  <b-form-invalid-feedback
                    v-if="error == true"
                    :state="validation.fname"
                  >Firstname is Required.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <label for="inputLname">Last name</label>
                  <b-form-input type="text" id="inputLname" :state="valid" v-model="form.lastname" />
                  <b-form-invalid-feedback
                    v-if="error == true"
                    :state="validation.lname"
                  >Lastname is Required.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group>
              <label for="email">Email</label>
              <b-form-input type="email" id="email" :state="valid" v-model="form.email" />
              <b-form-invalid-feedback
                v-if="error == true"
                :state="validation.email"
              >Email address is required for shipping updates.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
              <label for="phone">Phone Number</label>
              <b-form-input type="text" id="phone" :state="valid" v-model="form.phone" />
              <b-form-invalid-feedback
                v-if="error == true"
                :state="validation.phone"
              >Phone number is required for shipping updates.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
              <label for="address">Address</label>
              <b-form-input type="text" id="address" :state="valid" v-model="form.address" />
              <b-form-invalid-feedback
                v-if="error == true"
                :state="validation.address"
              >Address is required for shipping updates.</b-form-invalid-feedback>
            </b-form-group>

            <b-row>
              <b-col cols-md="6" class="mb-3">
                <b-form-group id="country" label="Your Country" label-for="country">
                  <b-form-select
                    id="country"
                    v-model="form.country"
                    :options="country"
                    :state="valid"
                  >
                    <b-form-invalid-feedback
                      v-if="error == true"
                      :state="validation.country"
                    >Country is required for shipping updates.</b-form-invalid-feedback>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols-md="3" class="mb-3">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" id="city" :state="valid" v-model="form.city" />
                  <b-form-invalid-feedback
                    v-if="error == true"
                    :state="validation.city"
                  >City is required for shipping updates.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols-md="3" class="mb-3">
                <b-form-group>
                  <label for="zip">Zip</label>
                  <b-form-input type="text" id="zip" :state="valid" v-model="form.zip" />
                  <b-form-invalid-feedback
                    v-if="error == true"
                    :state="validation.zip"
                  >Zip is required.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <hr class="mb-4" />
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="same-address" />
              <label
                class="custom-control-label"
                for="same-address"
              >Shipping address is the same as my billing address</label>
            </div>
            <hr class="mb-4" />

            <h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
              <b-form-invalid-feedback
                v-if="error == true"
                :state="form.paystack"
              >Please select your payment method.</b-form-invalid-feedback>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  v-model="form.paystack"
                  :value="!form.paystack"
                  :unchecked-value="form.paystack"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="customRadio1">Checkout with Paystack</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  v-model="form.wallet"
                  :value="!form.wallet"
                  :unchecked-value="form.wallet"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="customRadio2">
                  Checkout with Wallet
                  <b-badge variant="warning">Coming soon!</b-badge>
                </label>
              </div>
            </div>

            <hr class="mb-4" />
            <b-button variant="success" type="submit" @click.prevent="submit">
              <b-spinner small type="grow" v-if="log.loading"></b-spinner>Continue
              <b-icon icon="chevron-right"></b-icon>
            </b-button>
          </form>-->
        </b-col>
      </b-row>

      <b-modal
        id="modal-prevent-closing"
        ref="passwordModel"
        title="Complete your account"
        ok-only
        no-stacking
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="valid"
            label="Password"
            label-for="password"
            invalid-feedback="Password is required"
          >
            <b-form-input
              id="password"
              type="password"
              v-model="form.password"
              :state="valid"
              required
            ></b-form-input>
            <small class="text-warning">password must be atleast 6 characters long!</small>
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/Components/Header.vue";
import Footer from "@/Components/Footer.vue";
import { mdbContainer, mdbBtn } from "mdbvue";

import { mapState, mapGetters } from "vuex";

export default {
  props: ["id"],
  name: "Product",
  components: {
    mdbContainer,
    mdbBtn,
    Header,
    Footer
  },
  data() {
    return {
      error: null,
      valid: null,
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        zip: null,
        password: "",
        paystack: false,
        wallet: false
      },
      country: [{ text: "Select Country", value: null }]
    };
  },
  mounted() {
    if (this.log.isUserActive === true) {
      this.form = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        city: this.user.city,
        country: this.user.country,
        zip: this.user.zip
      };
    }
    this.$store
      .dispatch("getCountries")
      .then(data => {
        data.forEach(country => {
          this.country.push(country.name);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    ...mapState(["log", "cart", "user", "currency"]),
    ...mapGetters(["totalItemPrice"])
  },
  methods: {
    validate() {
      const form = [...arguments];
      const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      for (let index in form) {
        let field = form[index];
        if (field === "email" && !emailRegexp.test(this.form[field])) {
          return false;
        } else if (this.form[field] === "") {
          return false;
        }
      }
      return true;
    },
    checkForm(event) {
      event.preventDefault();
      event.target.classList.add("was-validated");
      if (this.validate("email", "firstname", "lastname", "phone")) {
        let data = {
          cart: this.cart,
          user: this.form,
          amount: this.totalItemPrice,
          date: new Date()
        };
        if (this.log.isUserActive === false) {
          this.$refs["passwordModel"].show();
        } else {
          //place order
          this.$store
            .dispatch("placeOrder", data)
            .then(() => {
              // update user info
              let token = localStorage.getItem("accessToken");

              this.$store
                .dispatch("updateUserInfo", {
                  token,
                  payload: {
                    firstname: this.form.firstname,
                    lastname: this.form.lastname,
                    email: this.form.email,
                    phone: this.form.phone,
                    address: this.form.address,
                    city: this.form.city,
                    country: this.form.country,
                    zip: this.form.zip
                  }
                })
                .then(() => {
                  let msg = "Saved! you're doing well";
                  this.$store.commit("SAVED", msg);
                })
                .then(() => {
                  this.$store
                    .dispatch("Authenticate_User", token)
                    .then(data => {
                      const payload = { message: "", user: data[0] };
                      this.$store.commit("SUCCESS", payload);
                    })
                    .then(() =>
                      setTimeout(() => {
                        this.$store.commit("RESET");
                      }, 3000)
                    )
                    .catch(error => console.log(error));
                })
                .then(() => {
                  //remove cart
                  this.$store
                    .dispatch("emptyCart", this.$store.state.user._id)
                    .then(() => this.$store.commit("EMPTY_CART"));
                })
                .then(() => {
                  // get user orders
                  this.$store
                    .dispatch("getOrders", token)
                    .then(data => {
                      this.$store.commit("SET_ORDERS", data);
                    });
                })
                .then(() => {
                  // redirect
                  this.$router.push(
                    `/user/${this.$store.state.user.slug}/orders`
                  );
                })
                .catch(error => {
                  this.$store.commit(
                    "logServerErr",
                    error.response.data.message
                  );
                });
            });
        }
      } else {
        console.log("invalid!");
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      if (this.form.password.length > 5) {
        this.valid = valid;
        return valid;
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // first register this user if not already registered
      let data = {
        cart: this.cart,
        user: this.form,
        amount: this.totalItemPrice,
        date: new Date()
      };

      this.$store
        .dispatch("registerUser", {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password
        })
        .then(success => {
          this.$store.commit("SUCCESS", success);
        })
        .then(() => (this.modalShow = true))
        .then(() => [
          // place the order
          this.$store.dispatch("placeOrder", data)
        ])
        .then(() => {
          // login and redirect user to order
          this.$store
            .dispatch("loginUser", {
              email: this.form.email,
              password: this.form.password
            })
            .then(success => {
              localStorage.setItem("accessToken", success.accessToken);

              this.$store
                .dispatch("Authenticate_User", success.accessToken)
                .then(data => {
                  const payload = {
                    message: "Login was successfully",
                    user: data[0]
                  };
                  this.$store.commit("SUCCESS", payload);
                  localStorage.setItem("isAuthorized", true);
                })
                .then(() => {
                  // get user orders
                  this.$store
                    .dispatch("getOrders", success.accessToken)
                    .then(data => {
                      this.$store.commit("SET_ORDERS", data);
                    });
                })
                .then(() => {
                  this.$store
                    .dispatch("emptyCart", localStorage.getItem("guest_id"))
                    .then(() => this.$store.commit("EMPTY_CART"));
                })
                .then(() => {
                  this.$store.commit("RESET");
                  this.$router.push(
                    `/user/${this.$store.state.user.slug}/orders`
                  );
                })
                .catch(error =>
                  this.$store.commit(
                    "logServerErr",
                    error.response.data.message
                  )
                );
            })
            .catch(error =>
              this.$store.commit("logServerErr", error.response.data.message)
            );
        })
        .catch(error =>
          this.$store.commit("logServerErr", error.response.data.message)
        );

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style scoped>
hr {
  width: 50px;
  border-bottom: 1px solid black;
}
.related-item {
  padding-left: 8rem;
  padding-right: 8rem;
  height: auto;
  text-align: center;
}
.form-control:focus {
  border-color: #ea5376 !important;
  box-shadow: none !important;
}
.custom-select:focus {
  border-color: #ea5376 !important;
  box-shadow: none !important;
}
.form-control {
  font-size: 0.9rem !important;
}
.outline,
.btn-outline {
  padding: 10px !important;
  border-radius: 6px !important;
  color: #ea5376;
  border: 1px solid #ea5376 !important;
}
.btn-outline:hover {
  color: #ea5376;
  border: 1px solid #ea5376 !important;
  background: rgba(234, 83, 118, 0.11) !important;
}
.btn-primary {
  padding: 10px !important;
  border-radius: 6px !important;
  background-color: #ea5376 !important;
  border: none !important;
}
.btn-primary:hover,
.primary:hover {
  box-shadow: 0 8px 25px -8px #ea5376 !important;
}
.btn-primary.focus,
.btn-primary:focus {
  box-shadow: 0 8px 25px -8px #ea5376 !important;
}
</style>
