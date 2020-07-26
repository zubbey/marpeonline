<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top" id="mainNav">
      <a href="/">
        <img src="@/assets/logo.png" height="50" />
      </a>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <router-link :to="`/admin/${user.slug}/overview`" class="nav-link">
                <b-icon icon="grid1x2"></b-icon><span class="nav-link-text"> Overview</span>
          </router-link>
          </li>

          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Referral">
          <router-link :to="`/admin/${user.slug}/users`" class="nav-link">
              <b-icon icon="person-plus"></b-icon><span class="nav-link-text"> User Management</span>
          </router-link>
          </li>

          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Referral">
          <router-link :to="`/admin/${user.slug}/products`" class="nav-link">
              <b-icon icon="person-plus"></b-icon><span class="nav-link-text"> Products</span>
          </router-link>
          </li>

          <router-link :to="`/admin/${user.slug}/orders`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Orders">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseComponents"
              data-parent="#exampleAccordion"
            >
              <b-icon icon="cart3"></b-icon><span class="nav-link-text"> Order Management</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseComponents">
              <li class="nav-link">
                <a href="#">Request Management</a>
              </li>
              <li class="nav-link">
                <a href="#">Only Purchase Order</a>
              </li>
              <li class="nav-link">
                <a href="#">Only Shipping Order</a>
              </li>
              <li class="nav-link">
                <a href="#">Purchase And Shipping</a>
              </li>
              <li class="nav-link">
                <a href="#">Shipping Checkout</a>
              </li>
            </ul>
          </li>
          </router-link>
          
          <router-link :to="`/admin/${user.slug}/settings`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Account Settings">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseMulti"
              data-parent="#exampleAccordion"
            >
              <b-icon icon="gear"></b-icon><span class="nav-link-text"> Account Setting</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseMulti">
              <li class="nav-link">
                <a href="#">Create/view ticket</a>
              </li>
              <li class="nav-link">
                <a href="#">Email us</a>
              </li>
              <li class="nav-link">
                <a href="#">My china address</a>
              </li>
              <li class="nav-link">
                <a href="#">Rate Marpe Services</a>
              </li>
              <li class="nav-link">
                <a href="#">Shipping Address book</a>
              </li>
              <li class="nav-link">
                <a href="#">View Profile</a>
              </li>
            </ul>
          </li>
          </router-link>
          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Logout">
            <a class="nav-link" @click.prevent="logout">
              <b-icon icon="power"></b-icon><span class="nav-link-text"> Logout</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav sidenav-toggler">
          <li class="nav-item py-1">
            <a class="nav-link text-center" id="sidenavToggler">
              <i class="fa fa-fw fa-angle-left"></i>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <!-- Shopping cart -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle mr-lg-2"
              id="alertsDropdown"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <b-icon icon="bell"></b-icon>
              <span class="d-lg-none">
                Notification
                <span class="badge badge-pill badge-primary">6 New</span>
              </span>
              <span class="indicator text-primary d-none d-lg-block">
                <i class="fa fa-fw fa-circle"></i>
              </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="alertsDropdown">
              <h6 class="dropdown-header">New Notification:</h6>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                <span class="text-success">
                  <strong>
                    <i class="fa fa-long-arrow-up fa-fw"></i>Status Update
                  </strong>
                </span>
                <span class="small float-right text-muted">11:21 AM</span>
                <div
                  class="dropdown-message small"
                >This is an automated server response message. All systems are online.</div>
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item small" href="#">View all Notification</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" ><b-icon icon="person"></b-icon><strong> {{ fullname ? user.email : '' }}</strong></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout">
              <b-icon icon="power"></b-icon>Logout
            </a>
          </li>

          <!--FOR MODAL data-toggle="modal" data-target="#exampleModal" -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id", "user", "log", "cart"],
  computed: {
    ...mapGetters(["fullname"])
  },
  mounted(){
  },
  methods: {
    ...mapActions(["removeCartItem"]),

    logout() {
      this.$store.dispatch("logoutUser").then(() => {
          localStorage.removeItem('isAuthorized');
          localStorage.removeItem('accessToken');
          window.location.reload();
        // this.$router.push("/");
      });
    }
  }
};
</script>

<style scope>
ul#exampleAccordion {
    overflow: scroll;
}
.badge-dark {
    color: #3b3f43;
    background-color: #343a401f;
}
#mainNav .navbar-collapse .navbar-sidenav .sidenav-second-level > li > a{
  color: #ffe7e7 !important;
}
.navbar .dropdown-menu {
    position: absolute !important;
}
</style>