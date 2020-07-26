<template>
<div>
  <body class="fixed-nav sticky-footer" id="page-top">
    <Userheader :user="user" :log="log" :cart="cart" />
    <router-view />
  </body>
</div>
</template>

<script>
import { mapState } from "vuex";
import Userheader from "@/Components/Userheader.vue";
export default {
  props: ["id"],
  components: {
    Userheader
  },
  created() {
    if(this.id !== this.user.slug){
      this.$router.push('/?redirect=403')
    }
  },
  computed: {
    ...mapState(["user", "log", "cart"])
  },
  methods: {
    isEmpty(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
  }
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  overflow-x: hidden;
  font-size: 0.85rem;
}

body.sticky-footer {
  margin-bottom: 56px;
}

body.sticky-footer .content-wrapper {
  min-height: calc(100vh - 56px - 56px);
}

body.fixed-nav {
  padding-top: 56px;
}
.text-primary {
  color: #ea5376 !important;
}
.dropdown-item.active,
.dropdown-item:active {
  background-color: #f9fafb !important;
}
a {
  color: #3b3f43 !important;
}
a:hover {
  text-decoration: none !important;
}
* {
  font-size: 0.98rem;
}
li.breadcrumb-item a {
  font-size: 0.8em !important;
}
li.breadcrumb-item .active::before {
  font-size: 0.8em !important;
}
.breadcrumb-item.active {
  color: #ea5376 !important;
}
.btn {
  margin: 0 !important;
  box-shadow: none !important;
}
.btn-primary.focus,
.btn-outline:focus,
.btn-primary:focus {
  box-shadow: none;
  transform: scale(0.9);
}
.badge {
  box-shadow: none !important;
}
.badge-primary {
  background-color: #ea5376 !important;
}
.text-primary {
  color: #ea5376 !important;
}
.router-link-active {
  border-radius: 6px;
  background: #ededed;
}
.router-link-active span {
  color: #ea5376;
  font-weight: 600;
}
.router-link-active .fa-fw {
  color: #fff;
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
  font-size: 0.9rem;
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
.page-item.active .page-link {
  background-color: #ea5376 !important;
  border: none !important;
}
.alert-info {
  color: #2088ab !important;
  background-color: rgba(209, 236, 241, 0.15) !important;
  border: none !important;
}
.card {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  border: none;
}
.card-header {
  background-color: #FFF !important;
  border-bottom: 1px solid #f9fafb !important;
}
.card-footer{
  background-color: #FFF !important;
}
.navbar {
  background: #fff;
  box-shadow: 0 1px 20px 1px #dcdcdc !important;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  border: none;
}
.table thead th {
  border-bottom: 2px solid #f9fafb !important;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid #f9fafb !important;
}

.content-wrapper {
  min-height: calc(100vh - 56px);
  padding-top: 1rem;
}

.scroll-to-top {
  position: fixed;
  right: 15px;
  bottom: 3px;
  display: none;
  width: 50px;
  height: 50px;
  text-align: center;
  color: white;
  background: rgba(52, 58, 64, 0.5);
  line-height: 45px;
}

.scroll-to-top:focus,
.scroll-to-top:hover {
  color: white;
}

.scroll-to-top:hover {
  background: #343a40;
}

.scroll-to-top i {
  font-weight: 800;
}

.smaller {
  font-size: 0.7rem;
}

.o-hidden {
  overflow: hidden !important;
}

.z-0 {
  z-index: 0;
}

.z-1 {
  z-index: 1;
}
.input-group-lg > .custom-select,
.input-group-lg > .form-control,
.input-group-lg > .input-group-append > .btn,
.input-group-lg > .input-group-append > .input-group-text,
.input-group-lg > .input-group-prepend > .btn,
.input-group-lg > .input-group-prepend > .input-group-text {
  border-radius: 10rem;
}
#mainNav .navbar-collapse .navbar-sidenav > .nav-item > .nav-link {
  padding: 0.85em 8px !important;
}
#mainNav .navbar-collapse {
  overflow: auto;
  max-height: 75vh;
}
#mainNav .navbar-collapse .navbar-nav .nav-item .nav-link:focus,
#mainNav .navbar-collapse .navbar-nav .nav-item .nav-link:hover,
#mainNav .navbar-collapse .navbar-nav .nav-item .nav-link:visited {
  padding-left: 1em !important;
  transition: all 0.3s ease-out;
}
#mainNav .navbar-collapse .navbar-nav .nav-item .nav-link {
  cursor: pointer;
  transition: all 0.3s ease-out;
}

#mainNav .navbar-collapse .navbar-sidenav .nav-link-collapse:after {
  float: right;
  content: "\f107";
  font-family: "FontAwesome";
}

#mainNav .navbar-collapse .navbar-sidenav .nav-link-collapse.collapsed:after {
  content: "\f105";
}

#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level,
#mainNav .navbar-collapse .navbar-sidenav .sidenav-third-level {
  padding-left: 0;
}

#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level > li > a,
#mainNav .navbar-collapse .navbar-sidenav .sidenav-third-level > li > a {
  display: block;
  padding: 0.5em 0;
}

#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level > li > a:focus,
#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level > li > a:hover,
#mainNav .navbar-collapse .navbar-sidenav .sidenav-third-level > li > a:focus,
#mainNav .navbar-collapse .navbar-sidenav .sidenav-third-level > li > a:hover {
  text-decoration: none;
  padding-left: 0.8em;
  transition: all 0.3s ease-out;
}

#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level > li > a {
  padding-left: 0.8em;
  transition: all 0.3s ease-in;
}

#mainNav .navbar-collapse .navbar-sidenav .sidenav-third-level > li > a {
  padding-left: 2em;
}

#mainNav .navbar-collapse .sidenav-toggler {
  display: none;
}

#mainNav .navbar-collapse .navbar-nav > .nav-item.dropdown > .nav-link {
  position: relative;
  min-width: 45px;
}

#mainNav .navbar-collapse .navbar-nav > .nav-item.dropdown > .nav-link:after {
  float: right;
  width: auto;
  content: "\f105";
  border: none;
  font-family: "FontAwesome";
}

#mainNav
  .navbar-collapse
  .navbar-nav
  > .nav-item.dropdown
  > .nav-link
  .indicator {
  position: absolute;
  top: 5px;
  left: 21px;
  font-size: 10px;
}

#mainNav
  .navbar-collapse
  .navbar-nav
  > .nav-item.dropdown.show
  > .nav-link:after {
  content: "\f107";
}

#mainNav
  .navbar-collapse
  .navbar-nav
  > .nav-item.dropdown
  .dropdown-menu
  > .dropdown-item
  > .dropdown-message {
  overflow: hidden;
  max-width: none;
  text-overflow: ellipsis;
}

@media (min-width: 992px) {
  #mainNav .navbar-brand {
    width: 250px;
  }
  #mainNav .navbar-collapse {
    overflow: visible;
    max-height: none;
  }
  #mainNav .navbar-collapse .navbar-sidenav {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: 70px;
  }
  #mainNav .navbar-collapse .navbar-sidenav > .nav-item {
    width: 250px;
    padding: 0;
  }
  #mainNav .navbar-collapse .navbar-sidenav > .nav-item > .nav-link {
    padding: 0.85em;
  }
  #mainNav .navbar-collapse .navbar-sidenav > .nav-item .sidenav-second-level,
  #mainNav .navbar-collapse .navbar-sidenav > .nav-item .sidenav-third-level {
    padding-left: 0;
    list-style: none;
  }
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-second-level
    > li,
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-third-level
    > li {
    width: 250px;
  }
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-second-level
    > li
    > a,
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-third-level
    > li
    > a {
    padding: 0.7em;
  }
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-second-level
    > li
    > a {
    padding-left: 2.75em;
  }
  #mainNav
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-third-level
    > li
    > a {
    padding-left: 3.75em;
  }
  #mainNav .navbar-collapse .navbar-nav > .nav-item.dropdown > .nav-link {
    min-width: 0;
  }
  #mainNav .navbar-collapse .navbar-nav > .nav-item.dropdown > .nav-link:after {
    width: 24px;
    text-align: center;
  }
  #mainNav
    .navbar-collapse
    .navbar-nav
    > .nav-item.dropdown
    .dropdown-menu
    > .dropdown-item
    > .dropdown-message {
    max-width: 300px;
  }
}

#mainNav.fixed-top .sidenav-toggler {
  display: none;
}

@media (min-width: 992px) {
  #mainNav.fixed-top .navbar-sidenav {
    height: calc(100vh - 112px);
  }
  #mainNav.fixed-top .sidenav-toggler {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: calc(100vh - 56px);
  }
  #mainNav.fixed-top .sidenav-toggler > .nav-item {
    width: 250px;
    padding: 0;
  }
  #mainNav.fixed-top .sidenav-toggler > .nav-item > .nav-link {
    padding: 1em;
  }
}

#mainNav.fixed-top.navbar-dark .sidenav-toggler {
  background-color: #212529;
}

#mainNav.fixed-top.navbar-dark .sidenav-toggler a i {
  color: #adb5bd;
}

#mainNav.fixed-top.navbar-light .sidenav-toggler {
  background-color: #dee2e6;
}

#mainNav.fixed-top.navbar-light .sidenav-toggler a i {
  color: rgba(0, 0, 0, 0.5);
}

body.sidenav-toggled #mainNav.fixed-top .sidenav-toggler {
  overflow-x: hidden;
  width: 55px;
}

body.sidenav-toggled #mainNav.fixed-top .sidenav-toggler .nav-item,
body.sidenav-toggled #mainNav.fixed-top .sidenav-toggler .nav-link {
  width: 55px !important;
}

body.sidenav-toggled #mainNav.fixed-top #sidenavToggler i {
  -webkit-transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}

#mainNav.static-top .sidenav-toggler {
  display: none;
}

@media (min-width: 992px) {
  #mainNav.static-top .sidenav-toggler {
    display: flex;
  }
}

body.sidenav-toggled #mainNav.static-top #sidenavToggler i {
  -webkit-transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}

.content-wrapper {
  overflow-x: hidden;
  background: #f9f9f9;
}

@media (min-width: 992px) {
  .content-wrapper {
    margin-left: 250px;
  }
}

#sidenavToggler i {
  font-weight: 800;
}

.navbar-sidenav-tooltip.show {
  display: none;
}

@media (min-width: 992px) {
  body.sidenav-toggled .content-wrapper {
    margin-left: 55px;
  }
}

body.sidenav-toggled .navbar-sidenav {
  width: 55px;
}

body.sidenav-toggled .navbar-sidenav .nav-link-text {
  display: none;
}

body.sidenav-toggled .navbar-sidenav .nav-item,
body.sidenav-toggled .navbar-sidenav .nav-link {
  width: 55px !important;
}

body.sidenav-toggled .navbar-sidenav .nav-item:after,
body.sidenav-toggled .navbar-sidenav .nav-link:after {
  display: none;
}

body.sidenav-toggled .navbar-sidenav .nav-item {
  white-space: nowrap;
}

body.sidenav-toggled .navbar-sidenav-tooltip.show {
  display: flex;
}

#mainNav.navbar-dark .navbar-collapse .navbar-sidenav .nav-link-collapse:after {
  color: #868e96;
}

#mainNav.navbar-dark .navbar-collapse .navbar-sidenav > .nav-item > .nav-link {
  color: #868e96;
}

#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  > .nav-link:hover {
  color: #adb5bd;
}

#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a,
#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a {
  color: #868e96;
}

#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a:focus,
#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a:hover,
#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a:focus,
#mainNav.navbar-dark
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a:hover {
  color: #adb5bd;
}

#mainNav.navbar-dark
  .navbar-collapse
  .navbar-nav
  > .nav-item.dropdown
  > .nav-link:after {
  color: #adb5bd;
}

@media (min-width: 992px) {
  #mainNav.navbar-dark .navbar-collapse .navbar-sidenav {
    background: #343a40;
  }
  #mainNav.navbar-dark .navbar-collapse .navbar-sidenav li.active a {
    color: white !important;
    background-color: #495057;
  }
  #mainNav.navbar-dark .navbar-collapse .navbar-sidenav li.active a:focus,
  #mainNav.navbar-dark .navbar-collapse .navbar-sidenav li.active a:hover {
    color: white;
  }
  #mainNav.navbar-dark
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-second-level,
  #mainNav.navbar-dark
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-third-level {
    background: #343a40;
  }
}

#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  .nav-link-collapse:after {
  color: rgba(0, 0, 0, 0.5);
}

#mainNav.navbar-light .navbar-collapse .navbar-sidenav > .nav-item > .nav-link {
  color: rgba(0, 0, 0, 0.5);
}

#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  > .nav-link:hover {
  color: rgba(0, 0, 0, 0.7);
}

#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a,
#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a {
  color: rgba(0, 0, 0, 0.5);
}

#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a:focus,
#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-second-level
  > li
  > a:hover,
#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a:focus,
#mainNav.navbar-light
  .navbar-collapse
  .navbar-sidenav
  > .nav-item
  .sidenav-third-level
  > li
  > a:hover {
  color: rgba(0, 0, 0, 0.7);
}

#mainNav.navbar-light
  .navbar-collapse
  .navbar-nav
  > .nav-item.dropdown
  > .nav-link:after {
  color: rgba(0, 0, 0, 0.5);
}

@media (min-width: 992px) {
  #mainNav.navbar-light .navbar-collapse .navbar-sidenav {
    background: #f8f9fa;
  }
  #mainNav.navbar-light .navbar-collapse .navbar-sidenav li.active a {
    color: #000 !important;
    background-color: #e9ecef;
  }
  #mainNav.navbar-light .navbar-collapse .navbar-sidenav li.active a:focus,
  #mainNav.navbar-light .navbar-collapse .navbar-sidenav li.active a:hover {
    color: #000;
  }
  #mainNav.navbar-light
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-second-level,
  #mainNav.navbar-light
    .navbar-collapse
    .navbar-sidenav
    > .nav-item
    .sidenav-third-level {
    background: #f8f9fa;
  }
}

.card-body-icon {
  position: absolute;
  z-index: 0;
  top: -25px;
  right: -25px;
  font-size: 5rem;
  -webkit-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  transform: rotate(15deg);
}

@media (min-width: 576px) {
  .card-columns {
    column-count: 1;
  }
}

@media (min-width: 768px) {
  .card-columns {
    column-count: 2;
  }
}

@media (min-width: 1200px) {
  .card-columns {
    column-count: 2;
  }
}

.card-login {
  max-width: 25rem;
}

.card-register {
  max-width: 40rem;
}

footer.sticky-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: #f9fafb;
  line-height: 55px;
}

@media (min-width: 992px) {
  footer.sticky-footer {
    width: calc(100% - 250px);
  }
}

@media (min-width: 992px) {
  body.sidenav-toggled footer.sticky-footer {
    width: calc(100% - 55px);
  }
}
</style>