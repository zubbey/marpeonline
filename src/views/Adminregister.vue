<template>
  <div>
    <form class="form-signin" @submit.prevent="signup">
      <div class="text-center mb-4">
        <img class="mb-4" src="@/assets/logo.png" alt width="150" />
        <h1 class="h3 mb-3 font-weight-normal">Create new Admin</h1>
        <b-alert show variant="danger" v-if="log.msgError && !log.message == ''">{{ log.message }}</b-alert>
      </div>

      <div class="form-label-group">
        <b-form-input
          type="text"
          id="username"
          placeholder="username"
          autocomplete="off"
          :state="valid"
          v-model="username"
        />
        <label for="username">Username</label>
        <b-form-invalid-feedback
          v-if="error == true"
          :state="validation.username">Username is Required.</b-form-invalid-feedback>
      </div>

      <div class="form-label-group">
        <b-form-input
          type="text"
          id="inputEmail"
          placeholder="Email address"
          autocomplete="off"
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
          type="password"
          id="inputPassword"
          placeholder="Password"
          autocomplete="off"
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
          autocomplete="off"
          :state="valid"
          v-model="comfirm_password"
        />
        <label for="inputCPassword">Comfirm Password</label>
        <b-form-invalid-feedback
          :state="validation.cpassword"
          v-if="error === true"
        >Both password did not match.</b-form-invalid-feedback>
      </div>

      <b-button block variant="primary" type="submit">
        <b-spinner small type="grow" v-if="log.loading"></b-spinner>Sign up
      </b-button>
      <p class="mt-5 mb-3 text-muted text-center">
        <small>Copyright © Marpe Online Procument {{ date }}</small>
      </p>
    </form>
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
      username: "",
      email: "",
      password: "",
      comfirm_password: "",
      date: null
    };
  },
  created() {
    this.date = this.getYear;
  },
  computed: {
    ...mapState(["log"]),

    validation() {
      return {
        username: this.username.length > 0,
        email: this.email.length > 0,
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
    
      if (!this.validation.username && !this.validation.email) {
        this.error = true;
        return;

      } else if(!this.validation.password){
        this.error = true;
        return;
      }else if(!this.validation.cpassword){
        this.error = true;
        return;
      }
        this.$store
          .dispatch("registerAdmin", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(success => {
            localStorage.setItem("accessToken", success.accessToken);
            this.$store.commit("SUCCESS", success);
          })
          .catch(error =>
            this.$store.commit("logServerErr", error.response.data.message)
          );
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