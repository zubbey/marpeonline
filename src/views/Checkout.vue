<template >
  <div>
    <Header />
    <div class="container">
      <b-row class="bg-white p-4 rounded my-4">
        <div class="text-center">
          <h2>
            <strong>Checkout</strong>
          </h2>
        </div>
      </b-row>
      <!-- col-md-4 order-md-2 mb-4 -->
      <b-row cols="1" cols-lg="2" class="bg-white p-4 mb-5 rounded">
        <b-col cols-sm="1" cols-md="4" order-md="2" class="mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">your cart</span>
            <span class="badge badge-secondary badge-pill">{{ this.cart.length }}</span>
          </h4>
          <ul v-for="(item, index) in cart" :key="index" class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div class="pr-4">
                <img :src="item.product.thumbnail" width="100" class="mb-4" />
              </div>
              <div>
                <h6 class="my-0">{{ item.product.name }}</h6>
                <p class="mt-2">Qty: {{ item.qty }}</p>
              </div>
              <div>
                <h6 class="my-0">
                  <strong>{{ item.product.price | toCurrency }}</strong>
                </h6>
              </div>
            </li>
          </ul>

          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
              <span>Shipping Fee</span>
              <strong>{{fee}}%</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{{ percentage(totalItemPrice, fee) | toCurrency }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Delivery Method</span>
              <b-form-select v-model="delivery" :options="options"></b-form-select>
            </li>
          </ul>
        </b-col>
        <!-- col-md-8 order-md-1 -->
        <b-col v-if="!newUser && !log.isUserActive" cols-sm="1" cols-md="8" order-md="1">
          <h4 class="mb-3">Sign into your account</h4>
          <p class="muted">Or click continue to create account</p>
          <b-button @click="sendToLogin" variant="primary">
            Sign in
            <b-icon icon="chevron-right"></b-icon>
          </b-button>Or
          <b-button @click="newUser = true" variant="outline">
            Continue
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
        </b-col>
        <b-col v-if="newUser || log.isUserActive" cols-sm="1" cols-md="8" order-md="1">
          <h4 class="mb-3">Billing address</h4>
          <b-alert show variant="danger" v-if="log.msgError && !log.message == ''">{{ log.message }}</b-alert>

          <mdb-container class="mt-5">
            <form class="needs-validation" novalidate @submit="checkForm">
              <div class="form-row">
                <div class="col mb-3">
                  <label for="firstname">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    v-model="form.firstname"
                    required
                  />
                  <div class="invalid-feedback">Please provide your firstname.</div>
                </div>
                <div class="col mb-3">
                  <label for="lastname">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    v-model="form.lastname"
                    required
                  />
                  <div class="invalid-feedback">Please provide your lastname.</div>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="form.email" required />
                <div
                  class="invalid-feedback"
                >Please provide a valid email address for shipping update.</div>
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" id="phone" v-model="form.phone" required />
                <div class="invalid-feedback">Please provide your phone number for shipping update.</div>
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="form.address"
                  required
                />
                <div class="invalid-feedback">Please provide your Home Address.</div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <b-form-group id="country" label="Country" label-for="country">
                    <b-form-select id="country" v-model="form.country" :options="country" required></b-form-select>
                    <div class="invalid-feedback">Please select a valid country</div>
                  </b-form-group>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="city">City</label>
                  <input type="text" class="form-control" id="city" v-model="form.city" required />
                  <div class="invalid-feedback">Please provide a valid state.</div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="zip">Zip</label>
                  <input type="text" class="form-control" id="zip" v-model="form.zip" required />
                  <div class="invalid-feedback">Please provide a valid zip.</div>
                </div>
              </div>
              <div class="form-group">
                <label for="shippingaddress">Shipping Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="shippingaddress"
                  v-model="form.shippingaddress"
                  required
                />
                <div class="invalid-feedback">Please provide your shipping address update.</div>
              </div>
              <div class="form-group">
                <div class="form-check pl-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value
                    id="paystack"
                    checked
                    disabled
                    required
                  />
                  <label class="form-check-label" for="invalidCheck">Checkout with Paystack</label>
                  <div class="invalid-feedback">You must select your payment method.</div>
                </div>
              </div>
              <mdb-btn type="submit" color="primary">
                <b-spinner small v-if="log.loading"></b-spinner>Continue
                <b-icon icon="chevron-right"></b-icon>
              </mdb-btn>
            </form>
          </mdb-container>
        </b-col>
      </b-row>

      <b-modal
        style="padding: 0;"
        id="modal-prevent-closing"
        ref="paymentModal"
        hide-header
        hide-footer
        no-stacking
        ok-disabled
        size="md"
      >
        <object type="text/html" :data="authorization_url" style="width:100%; height:500px;"></object>
      </b-modal>

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
    Footer,
  },
  data() {
    return {
      error: null,
      valid: null,
      fee: null,
      newUser: false,
      authorization_url: null,
      reference: null,
      checkTransaction: null,
      toastCount: 0,
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        shippingaddress: "",
        city: "",
        country: "",
        zip: null,
        password: "",
        paystack: false,
        wallet: false,
      },
      country: [{ text: "Select Country", value: null }],
      delivery: null,
      currency: "",
      options: [],
    };
  },
  created() {
    this.$store.watch(
      (state) => {
        console.clear(state);
        return this.$store.state.transaction; // could also put a Getter here
      },
      (newTrans, oldTrans) => {
        console.clear(oldTrans);
        //something changed do something
        if (newTrans === "success") {
          this.stopTransactionCheck();
          if (this.$store.state.log.isUserActive === true) {
            this.updateUserData();
          } else {
            this.loginNewUser();
          }
          this.makeToast("success", "Transaction was success", true);
          this.$refs["paymentModal"].hide();
        } else if (newTrans === "failed") {
          this.stopTransactionCheck();
          this.makeToast(
            "danger",
            "Transaction Failed, Please try again",
            true
          );
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "Insufficient Funds") {
          this.stopTransactionCheck();
          this.makeToast(
            "warning",
            "Insufficient Funds, Please try again",
            true
          );
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "warning") {
          this.makeToast(
            "warning",
            this.log.message,
            true
          );
        }
      }
    );

    this.fee = this.settings.commitions.shipping;
    this.options = this.settings.shippingmethods;
    this.delivery = this.settings.shippingmethods[0];
    if (
      this.currencyType.currency == "NGN" ||
      this.currencyType.currency == "USD"
    ) {
      this.currency = this.currencyType.currency;
    }

    if (this.log.isUserActive === true) {
      this.form = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        shippingaddress: this.user.shippingaddress,
        city: this.user.city,
        country: this.user.country,
        zip: this.user.zip,
      };
    }
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
    ...mapState(["settings", "log", "cart", "user", "currencyType"]),
    ...mapGetters(["totalItemPrice"]),
  },
  methods: {
    sendToLogin() {
      this.$router.push("/login?redirect=checkout");
    },
    validate() {
      const form = [...arguments];
      const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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
      if (
        this.validate(
          "email",
          "firstname",
          "lastname",
          "phone",
          "shippingaddress"
        )
      ) {
        let data = {
          cart: this.cart,
          user: this.form,
          currency: this.currency,
          reference: this.reference,
          deliverymethod: this.delivery,
          total: this.percentage(this.totalItemPrice, this.fee),
          date: new Date(),
        };
        if (this.log.isUserActive === false) {
          this.$refs["passwordModel"].show();
        } else {
          //place order
          this.$store
            .dispatch("initTransaction", data)
            .then((response) => {
              this.authorization_url = response.data.authorization_url;
              this.reference = response.data.reference;
            })
            .then(() => this.$refs["paymentModal"].show())
            .then(() => {
              let payload = {
                cart: this.cart,
                user: this.form,
                currency: this.currency,
                deliverymethod: this.delivery,
                total: this.percentage(this.totalItemPrice, this.fee),
                reference: this.reference,
                date: new Date(),
              };
              this.checkTransaction = setInterval(() => {
                this.$store.dispatch("verifyPayment", payload).then((data) => {
                  if (data.data.status === "status") {
                    console.log("success");
                    this.stopTransactionCheck();
                  } else {
                    console.log("not verifed!");
                  }
                });
              }, 5000);
            })
            .catch((error) =>
              this.$store.commit("logServerErr", error.response.data.message)
            );
        }
      } else {
        console.log("invalid!");
      }
    },
    stopTransactionCheck() {
      clearInterval(this.checkTransaction);
    },

    updateUserData() {
      let token = localStorage.getItem("accessToken");
      let data = {
          cart: this.cart,
          user: this.form,
          currency: this.currency,
          reference: this.reference,
          deliverymethod: this.delivery,
          total: this.percentage(this.totalItemPrice, this.fee),
          date: new Date(),
        };
      // save order
      this.$store.dispatch("placeDomesticOrder", data)
      .then(() => this.$store.commit("RESET"))
      .catch(error => this.$store.commit("logServerErr", error.response.data.message));

      // update User data
      this.$store
        .dispatch("updateUserInfo", {
          token,
          payload: {
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            email: this.form.email,
            phone: this.form.phone,
            address: this.form.address,
            shippingaddress: this.form.shippingaddress,
            city: this.form.city,
            country: this.form.country,
            zip: this.form.zip,
          },
        })
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
            .then((data) => {
              this.$store.commit("SET_ORDERS", data);
            })
            .catch((error) => console.log(error));
          // redirect
          this.$router.push(
            `/user/${this.$store.state.user.slug}/orders/domestic?listorders=true`
          );
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
        });
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
        currency: this.currency,
        reference: this.reference,
        deliverymethod: this.delivery,
        total: this.percentage(this.totalItemPrice, this.fee),
        date: new Date(),
      };

      this.$store
        .dispatch("registerUser", {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
        })
        .then((success) => {
          this.$store.commit("SUCCESS", success);
          this.$store
            .dispatch("loginUser", {
              email: this.form.email,
              password: this.form.password,
            })
            .then((success) => {
              localStorage.setItem("accessToken", success.accessToken);

              this.$store
                .dispatch("Authenticate_User", success.accessToken)
                .then((data) => {
                  const payload = {
                    message: "Login was successfully",
                    user: data[0],
                  };
                  this.$store.commit("SUCCESS", payload);
                  localStorage.setItem("isAuthorized", true);
                });
            });
        })
        .then(() => (this.modalShow = true))
        .then(() => {
          //place order
          this.$store
            .dispatch("initTransaction", data)
            .then((response) => {
              this.authorization_url = response.data.authorization_url;
              this.reference = response.data.reference;
            })
            .then(() => this.$refs["paymentModal"].show())
            .then(() => {
              let payload = {
                cart: this.cart,
                user: this.form,
                currency: this.currency,
                deliverymethod: this.delivery,
                total: this.percentage(this.totalItemPrice, this.fee),
                reference: this.reference,
                date: new Date(),
              };
              this.checkTransaction = setInterval(() => {
                this.$store.dispatch("verifyPayment", payload).then((data) => {
                  if (data.data.status === "status") {
                    console.log("success");
                    this.stopTransactionCheck();
                  } else {
                    console.log("not verifed!");
                  }
                });
              }, 5000);
            })
            .catch((error) =>
              this.$store.commit("logServerErr", error.response.data.message)
            );
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        );

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    loginNewUser() {
      this.$store
        .dispatch("emptyCart", localStorage.getItem("guest_id"))
        .then(() => this.$store.commit("EMPTY_CART"))
        .then(() => {
          this.$store.commit("RESET");
          this.$router.push(
            `/user/${this.$store.state.user.slug}/orders/domestic?listorders=true`
          );
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        );
    },
    percentage(num, per) {
      let percent = (num / 100) * per;
      return parseInt(percent) + parseInt(num);
    },
    makeToast(variant = null, msg, append = false) {
      this.toastCount++;
      this.$bvToast.toast(`${msg}`, {
        title: "Transaction Status",
        variant: variant,
        solid: true,
        autoHideDelay: 6000,
        appendToast: append,
      });
    }
  },
};
</script>

<style scoped>
.btn {
  margin: 0 !important;
}
.rounded {
  border-radius: 0.55rem !important;
}
.list-group-item {
  border: none !important;
}
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
