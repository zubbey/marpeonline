<template>
  <div>
    <form class="form-signin" @submit.prevent="signup">
      <div class="text-center mb-4">
        <router-link to="/">
          <img class="mb-4" src="@/assets/logo.png" alt width="150" />
        </router-link>
        <h1 class="h3 mb-3 font-weight-normal">Create an Account</h1>
        <b-alert show variant="danger" v-if="log.msgError && !log.message == ''">{{ log.message }}</b-alert>
        <!-- <div v-if="log.loading" class="alert alert-warning" role="alert">{{ log.message }}</div> -->
        <p v-if="!log.loading">Get started with Marpe Online Procurement</p>
      </div>

      <b-form-group>
        <b-row>
          <b-col>
            <div class="form-label-group">
              <b-form-input
                type="text"
                id="inputFname"
                placeholder="First name"
                :state="valid"
                v-model="firstname"
              />
              <label for="inputFname">First name</label>
              <b-form-invalid-feedback
                v-if="error == true"
                :state="validation.fname">First Name is Required.</b-form-invalid-feedback>
            </div>
          </b-col>

          <div class="col">
            <div class="form-label-group">
              <b-form-input
                type="text"
                id="inputLname"
                placeholder="Last name"
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
          placeholder="Email address"
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
          placeholder="Mobile number"
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
          type="text"
          id="inputReferral"
          placeholder="Enter your Referral Code (Optional)"
          :state="valid"
          v-model="referralCode"
          autofocus
        />
        <label for="inputReferral">Referral Code (Optional)</label>
        <b-form-invalid-feedback
          :state="referralCodeError"
        >{{ referralCodeErrorMsg }}</b-form-invalid-feedback>
      </div>

      <div class="form-label-group">
        <b-form-input
          type="password"
          id="inputPassword"
          placeholder="Password"
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
          placeholder="Comfirm Password"
          :state="valid"
          v-model="comfirm_password"
        />
        <label for="inputCPassword">Comfirm Password</label>
        <b-form-invalid-feedback
          :state="validation.cpassword"
          v-if="error === true"
        >Both password did not match.</b-form-invalid-feedback>
      </div>

      <b-button block variant="primary" type="submit" v-if="!log.loading" :disabled=" password.length < 6">
        Sign up
      </b-button>
      <b-button block variant="primary" v-else disabled>
        <b-spinner small type="grow"></b-spinner>Please Wait
      </b-button>
      
      <router-link to="/login">
        <b-button block variant="outline mt-2">Aready have an account?</b-button>
      </router-link>
      <p class="mt-5 mb-3 text-muted text-center">
        <small>Copyright © Marpe Online Procument {{ date }}</small>
      </p>
    </form>

    <!-- SENT EMAIL NOTIFY -->
    <b-modal v-model="modalShow">
      <div class="text-center">
        <div>
          <!-- <b-icon icon="exclamation-circle" style="width: 120px; height: 120px;"></b-icon> -->
          <b-iconstack font-scale="5" animation="spin">
            <b-icon
              stacked
              icon="circle-fill"
              animation="spin"
              variant="success"
              scale="0.75"
            ></b-icon>
            <b-icon
              stacked
              icon="check"
              animation="fade"
              variant="light"
            ></b-icon>
          </b-iconstack>
        </div>
        <h4 class="d-block text-center mt-3">Account Created successfully!</h4>
        <br />
        <p
          class="text-muted"
        >A verification code was sent to: {{ email }}, please verify your account to continue</p>
      </div>

      <template v-slot:modal-footer>
        <small>Verify Later?</small>
        <b-button size="sm" variant="success" @click="login()">Login</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      error: null,
      valid: null,
      referralCodeError: null,
      referralCodeErrorMsg: "",
      modalShow: false,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      referralCode: "",
      password: "",
      comfirm_password: "",
      date: null
    };
  },
  created() {
    this.date = this.getYear;
  },
  computed: {
    ...mapState(["log", "toast"]),

    validation() {
      return {
        fname: this.firstname.length > 0,
        lname: this.lastname.length > 0,
        email: this.email.length > 0,
        phone: this.phone.length > 0,
        password: this.password.length > 5,
        cpassword: this.comfirm_password === this.password
      };
    },

    getYear() {
      return new Date().getFullYear();
    }
  },
  methods: {
    // register user
    signup() {
    
      if (!this.validation.fname && !this.validation.lname && !this.validation.email && !this.validation.phone) {
        this.error = true;
        return;

      } else if(!this.validation.password){
        this.error = true;
        return;
      }else if(!this.validation.cpassword){
        this.error = true;
        return;
      }else if(this.referralCode.length > 0){
        this.$store.dispatch("getAffiliate", this.referralCode)
        .then(success => {
            // if affiliate is found register as referred user (set isReferred true)
            let payload = {
              referralid: success,
              email: this.email
            };

            this.$store.dispatch("updateAffiliate", payload)
            .then(() => {
                this.$store
                .dispatch("registerUser", {
                  firstname: this.firstname,
                  lastname: this.lastname,
                  email: this.email,
                  phone: this.phone,
                  password: this.password,
                  isReffered: {
                    referred: true,
                    referralid: payload.referralid
                  }
                })
                .then(success => {
                  localStorage.setItem("accessToken", success.accessToken);
                  this.$store.commit("SUCCESS", success);
                  this.makeToast("success", this.toast.message, true);
                })
                .then(() => (this.modalShow = true))
                .catch(error => {
                  this.$store.commit("logServerErr", error.response.data.message)
                  this.makeToast("danger", this.toast.message, true);
                });
            })
            .catch(error => {
              this.$store.commit("logServerErr", error.response.data.message)
              this.makeToast("danger", this.toast.message, true);
            });
            // after successfully registeration, update affiliate[] (push user to affiliate)
        })
        .catch(error => {
            // return error msg
            this.$store.commit("logServerErr", error.response.data.message);
            this.makeToast("danger", this.toast.message, true);
            this.referralCodeErrorMsg = error.response.data.message;
            this.referralCodeError = false;
        })
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
            password: this.password
          })
          .then(success => {
            localStorage.setItem("accessToken", success.accessToken);
            this.$store.commit("SUCCESS", success);
            this.makeToast("success", this.toast.message, true);
          })
          .then(() => (this.modalShow = true))
          .catch(error => {
            this.$store.commit("logServerErr", error.response.data.message)
            this.makeToast("danger", this.toast.message, true);
          });
    },

    login() {
      this.$router.push("/login");
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

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
a {
  text-decoration: none !important;
  color: #ea5376 !important;
}
a:hover {
  color: #b83658 !important;
}
.alert {
  position: relative;
  padding: 0.2rem 1.25rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10rem;
}
.alert-danger {
  color: #a72543 !important;
  background-color: rgba(248, 215, 218, 0.5) !important;
}
.alert-success {
  color: #155724;
  background-color: rgba(212, 237, 218, 0.5) !important;
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
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: 0.75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>