<template>
  <div class="container-flex">
    <div class="utility-nav d-none d-md-block">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <p class="small">
              <b-icon icon="envelope"></b-icon>support@marpe.online |
              <b-icon icon="phone"></b-icon>+234 812 377 1335
            </p>
          </div>

          <div class="col-12 col-md-6 text-right">
            <p class="small">Free shipping on total of {{ 1000 | toCurrency }} of all products</p>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="@/assets/logo.png" width="auto" height="50" />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          :class="mobileMenu ? 'is-active' : ''"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="mobileMenu = !mobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="mobileMenu ? 'is-active' : ''">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/category">Products</router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Links</a>

            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/servicefee">Service fee</router-link>
              <router-link class="navbar-item" to="/costcalculator">Cost converter</router-link>
              <router-link class="navbar-item" to="/exchangerate">Exchange rate</router-link>
              <router-link class="navbar-item" to="/trackitems">Track items</router-link>
              <a
                class="navbar-item"
                href="https://procurement.marpe.online/blog"
                target="_blank"
              >Blog</a>
              <router-link class="navbar-item" to="/about">About us</router-link>
              <router-link class="navbar-item" to="/contact">Contact us</router-link>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{currencyType.name}}</a>

            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                v-for="(currency, index) in getDollarNaira"
                :key="index"
                @click="changeCurrency(currency.currency)"
              >{{ currency.name }}</a>
            </div>
          </div>

          <div class="navbar-item" v-if="!log.isUserActive">
            <div class="buttons">
              <router-link class="button is-primary text-white" to="/register">
                <b>Sign up</b>
              </router-link>
              <router-link class="button is-light" to="/login">Log in</router-link>
            </div>
          </div>

          <div class="navbar-item" v-else>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                <b-icon icon="person"></b-icon>
                {{ user.firstname }}
              </a>

              <div class="navbar-dropdown">
                <router-link :to="`/user/${user.slug}/overview?welcome=true`" class="navbar-item">
                  <b-icon icon="grid1x2"></b-icon> Dashboard
                </router-link>
                <router-link :to="`/user/${user.slug}/wishlist`" class="navbar-item">
                  <b-icon icon="heart"></b-icon> My Wishlist
                </router-link>
                <div class="navbar-item logout" @click="logout">
                  <b-icon icon="power"></b-icon> Logout
                </div>
              </div>
            </div>
          </div>

          <div class="bag navbar-item" @click="openCart">
            <div class="pb-1">
              <b-icon icon="cart3" font-scale="2"></b-icon>
            </div>
            <span class="mb-3" v-if="cart.length > 0">{{ cart.length }}</span>
          </div>
        </div>
      </div>
    </nav>

    <!--Cart Component-->
    <sideCart ref="cartMove" />
  </div>
</template>

<script>
// import * as $ from "jquery";

import sideCart from "@/Components/Cart.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    sideCart,
  },
  data() {
    return {
      mobileMenu: false,
      comfirmPassword: "",
    };
  },
  computed: {
    ...mapState(["user", "cart", "log", "settings", "currencyType"]),
    ...mapGetters(["getDollarNaira"]),
  },
  methods: {
    changeCurrency(newCurrency) {
      let currentCurrency = this.currencyType.currency;
      this.$store
        .dispatch("changeCurrency", { newCurrency, currentCurrency })
        .then((data) => this.$store.commit("CHANGE_CURRENCY", data))
        .catch((error) => console.log(error));
    },
    openCart() {
      this.$refs.cartMove.cartON();
    },

    logout() {
      this.$store.dispatch("logoutUser").then(() => {
        localStorage.removeItem("isAuthorized");
        location.reload();
      });
    },
  },
};
</script>

<style>
.body {
  background: #f9f9f9 !important;
}
.dropdown,
.dropleft,
.dropright,
.dropup {
  list-style: none !important;
}
a:hover {
  text-decoration: none !important;
  color: #b83658 !important;
}
.btn-primary.focus,
.btn-primary:focus {
  box-shadow: none;
  transform: scale(0.9);
}
.navbar-brand, .navbar-tabs{
  width: 100% !important;
}
.navbar-menu.is-active{
  width: 100% !important;
}
.navbar-item.bc a {
  font-size: 15px;
  text-decoration: none !important;
  color: black !important;
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
.button.is-primary {
  background-color: #ea5376 !important;
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
.btn-primary:focus,
.primary:focus {
  box-shadow: 0 1px 20px 1px #ea5376 !important;
}
.btn-outline-dark {
  color: #ea5376;
  border-color: #ea5376;
  border: solid 1px !important;
}
.btn-outline-dark:hover {
  color: #b17c7c !important;
  background-color: transparent;
}
.form-control:focus {
  border-color: #ea5376 !important;
  box-shadow: none !important;
}
.alert {
  padding: 0.3rem 0.8rem !important;
  border: none !important;
  border-radius: 0.6rem !important;
  font-size: small;
}
nav {
  z-index: 100;
}
.navbar {
  box-shadow: 0 1px 1px 1px #dcdcdc !important;
  background-color: #fff;
  z-index: 2000 !important;
}
.logout{
  cursor: pointer;
}
.navbar .dropdown-menu {
  position: absolute !important;
  margin-top: 2rem;
}
.navbar .dropdown-menu a {
  padding: 0 !important;
}
.btn-light.dropdown-toggle {
  background-color: white !important;
}
.close {
  position: relative;
  bottom: 20px;
  left: 10px;
  font-size: 31px;
  color: #000;
}
.navbar-item.bc a {
  font-size: 14px;
  text-decoration: none;
  color: black;
}

.navbar-item.bc a:hover,
.navbar-item.bc a:active {
  color: #ea5376;
}

.btn-sm {
  border-radius: 8px;
}
form .btn-xl.btn-success.mt-3 {
  position: relative;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  width: 100%;
  height: 50px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bag span {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  position: absolute;
  font-size: 15px;
  line-height: 1;
  padding: 2px 3px 3px 3px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  margin-left: -9px;
  bottom: 1rem;
}

.bag img {
  cursor: pointer;
  width: 30px;
  height: auto;
}

.user {
  margin-right: 20px;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>
