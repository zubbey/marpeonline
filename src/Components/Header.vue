<template>
  <div class="container-flex">
    <nav class="navbar navbar-light">
      <div class="dropdown d-xl-none d-lg-none mr-auto">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/menu.png"
          style="width: 25px"
          data-toggle="dropdown"
          data-target="#navd"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div class="dropdown-menu hb" aria-labelledby="navd">
          <router-link class="dropdown-item" to="/">Home</router-link>
          <router-link class="dropdown-item" to="/service_fee">Service fee</router-link>
          <router-link class="dropdown-item" to="/cost_convert">Cost converter</router-link>
          <router-link class="dropdown-item" to="/track_items">Track items</router-link>
          <router-link class="dropdown-item" to="/contact">Contact us</router-link>
          <router-link class="dropdown-item" to="/faqs">Faqs</router-link>
        </div>
      </div>
      <!--Logo-->
      <router-link to="/" class="navbar-brand py-0">
        <img src="@/assets/logo.png" height="50" />
      </router-link>
      <!--Header navigation-->
      <span class="navbar-item bc d-none d-xl-block d-lg-block py-0">
        <router-link class="pl-5" to="/">Home</router-link>
        <router-link class="px-4" to="/service_fee">Service fee</router-link>
        <router-link class="px-3" to="/cost_convert">Cost converter</router-link>
        <router-link class="px-3" to="/track_items">Track items</router-link>
        <router-link class="px-3" to="/contact">Contact us</router-link>
        <router-link class="px-3" to="/faqs">Faqs</router-link>
      </span>

      <p class="navbar-item ml-auto"></p>
      <div class="searc d-none d-xl-block d-lg-block pr-3">
        <input type="search" class="search" />
      </div>
      <div v-if="!log.isUserActive" class="user">
        <div class="nav-item dropdown">
          <div
            class="dropdown-toggle"
            style="cursor: pointer;"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <b-icon icon="person"></b-icon> Account
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            style="background-color: transparent; border: none"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <div class="card bg-white">
              <div class="card-text text-center pt-3">Welcome to Marpe online</div>
              <div class="card-body d-flix" style="justify-content: space-between">
                <router-link to="/login">
                  <button type="button" class="btn btn-outline-secondary btn-block btn-sm">Login</button>
                </router-link>
                <router-link to="/register">
                  <button type="button" class="btn btn-primary btn-block btn-sm m-0">Create Account</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="log.isUserActive" class="user">
        <div class="nav-item dropdown">
          <div
            class="dropdown-toggle"
            style="cursor: pointer;"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <b-icon icon="person"></b-icon>
            {{ user.firstname }}
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            style="background-color: transparent; border: none"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <div class="card bg-white p-3">
              <router-link :to="`user/${user.slug}/overview`">
                <button type="button" class="btn btn-outline-secondary btn-block btn-sm">
                  <b-icon icon="grid1x2"></b-icon> Dashboard
                </button>
              </router-link>
              <button type="button" class="btn btn-outline-secondary btn-block btn-sm">
                <b-icon icon="heart"></b-icon> My Wishlist
              </button>
              <button
                type="submit"
                class="btn btn-outline-secondary btn-block btn-sm"
                @click="logout"
              >Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div class="bag" @click="openCart">
      <div class="pb-1">
        <b-icon icon="cart3" font-scale="2"></b-icon>
      </div>
        <span class="mb-3" v-if="this.cartItemCount > 0">{{ cartItemCount }}</span>
      </div>
    </nav>

    <!--Cart Component-->
    <Cart ref="cartMove" />
  </div>
</template>

<script>
// import * as $ from "jquery";

import Cart from "@/Components/Cart.vue";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: {
    Cart
  },
  data() {
    return {
      comfirmPassword: ""
    };
  },
  mounted() {},
  computed: {
    ...mapState(["user", "log"]),

    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  methods: {
    openCart() {
      this.$refs.cartMove.cartON();
    },

    logout() {
      this.$store.dispatch("logoutUser").then(() => {
        localStorage.removeItem("isAuthorized");
      });
    }
  }
};
</script>

<style>
.body {
  background: #f9f9f9 !important;
}
a {
  color: #ea5376 !important;
}
a:hover {
  text-decoration: none !important;
  color: #b83658 !important;
}
.btn-primary.focus, .btn-primary:focus{
  box-shadow: none;
  transform: scale(0.9);
}
.navbar-item.bc a {
    font-size: 15px;
    text-decoration: none !important;
    color: black !important;
}
.outline, .btn-outline{
  padding: 10px !important;
  border-radius: 6px !important;
  color: #ea5376;
  border:1px solid #ea5376 !important;
}
.btn-outline:hover{
  color: #ea5376;
  border:1px solid #ea5376 !important;
  background: rgba(234, 83, 118, 0.11) !important;
}
.btn-primary{
  padding: 10px !important;
  border-radius: 6px !important;
  background-color: #ea5376 !important;
  border: none !important;
}
.btn-primary:hover, .primary:hover{
  box-shadow: 0 8px 25px -8px #ea5376 !important;
}
.btn-primary:focus, .primary:focus{
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
  box-shadow: 0 1px 20px 1px #ea5376 !important;
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
  box-shadow: 0 1px 20px 1px #dcdcdc !important;
  background-color: #fff;
}
.navbar .dropdown-menu {
    position: absolute !important;
    margin-top: 2rem;
}
.navbar .dropdown-menu a{
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
.search {
  outline: none;
  border: 1px #f8f8f8;
  background: #ededed url("../assets/search.png") no-repeat 5px center;
  padding: 5px 8px 0px 26px;
  width: 10px;
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  margin-right: 10px;
}

.search:focus {
  width: 100%;
  min-width: 50px;
  border: solid 1px #ccc;
  background-color: #fff;
  border-color: #98ccfd;
  -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  backface-visibility: hidden;
  perspective: 1000;
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
