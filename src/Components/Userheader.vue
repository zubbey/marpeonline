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
          <router-link :to="`/user/${user.slug}/overview`" class="nav-link">
              <b-badge variant="dark p-2 mr-2"><b-icon icon="grid1x2"></b-icon></b-badge>
              <span class="nav-link-text">Overview</span>
          </router-link>
          </li>

          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Referral">
          <router-link :to="`/user/${user.slug}/referral`" class="nav-link">
              <b-badge variant="dark p-2 mr-2"><b-icon icon="person-plus"></b-icon></b-badge>
              <span class="nav-link-text">Affiliate/Referral Program</span>
          </router-link>
          </li>

          <router-link :to="`/user/${user.slug}/wallet`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Wallet">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseComponents"
              data-parent="#exampleAccordion"
            >
              <b-badge variant="dark p-2 mr-2"><b-icon icon="wallet2"></b-icon></b-badge>
              <span class="nav-link-text"><b-badge variant="primary">New</b-badge> My Wallet</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseComponents">
              <li class="nav-link">
                <a href="#">Account Balance</a>
              </li>
              <li class="nav-link">
                <a href="#">Add Withdrawal Account</a>
              </li>
              <li class="nav-link">
                <a href="#">Request Withdrawal</a>
              </li>
            </ul>
          </li>
          </router-link>
          <router-link :to="`/user/${user.slug}/orders`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Orders">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseComponents"
              data-parent="#exampleAccordion"
            >
              <b-badge variant="dark p-2 mr-2"><b-icon icon="cart3"></b-icon></b-badge>
              <span class="nav-link-text">Order Placement</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseComponents">
              <li class="nav-link">
                <a href="#">Domestic Shipping Request</a>
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
          <router-link :to="`/user/${user.slug}/account_history`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Account History">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseExamplePages"
              data-parent="#exampleAccordion"
            >
              <b-badge variant="dark p-2 mr-2"><b-icon icon="clock-history"></b-icon></b-badge>
              <span class="nav-link-text">Account History</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseExamplePages">
              <li class="nav-link">
                <a href="#">1688 Order History</a>
              </li>
              <li class="nav-link">
                <a href="#">Account Summary</a>
              </li>
              <li class="nav-link">
                <a href="#">Order History</a>
              </li>
              <li class="nav-link">
                <a href="#">Shipping History</a>
              </li>
            </ul>
          </li>
          </router-link>
          <router-link :to="`/user/${user.slug}/settings`">
          <li class="nav-item py-2" data-toggle="tooltip" data-placement="right" title="Account Settings">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseMulti"
              data-parent="#exampleAccordion"
            >
              <b-badge variant="dark p-2 mr-2"><b-icon icon="gear"></b-icon></b-badge>
              <span class="nav-link-text">Account Setting</span>
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
              <b-badge variant="dark p-2 mr-2"><b-icon icon="power"></b-icon></b-badge>
              <span class="nav-link-text">Logout</span>
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
              <b-icon icon="cart3"></b-icon>
              <span v-if="this.cartItemCount > 0">
                Cart
                <span
                  class="badge badge-pill badge-primary"
                  v-if="this.cartItemCount > 0"
                >{{ cartItemCount }}</span>
              </span>
              <!-- if cart is empty -->
              <span v-if="this.cartItemCount == 0" class="indicator text-primaey d-none d-lg-block">
                <i class="fa fa-fw fa-circle"></i>
              </span>
            </a>
            <div class="dropdown-menu bg-white" aria-labelledby="alertsDropdown">
              <h6
                class="dropdown-header"
                v-if="this.cart.length === 0"
              >Your cart is empty, try to Add stuff.</h6>
              <div class="dropdown-divider"></div>
              <transition-group name="fade" tag="div">
                <div v-for="item in cart" :key="item._id">
                  <router-link
                    :to="{name: 'Product', params: {id: item.product.slug}}"
                    class="dropdown-item bg-white"
                    style="width: 380px"
                  >
                    <span class="text-dark">
                      <strong style="white-space: normal">
                        {{item.product.name }}
                      </strong>
                    </span>
                    <div class="d-flex justify-content-between my-2">
                      <span class="small text-primary">
                        Price:
                        <strong>{{ item.product.price | toCurrency }}</strong>
                        <div class="small text-primary">Qantity: <strong>{{ item.qty }}</strong></div>
                      </span>
                      <b-icon
                      icon="x"
                      @click.prevent="removeCartItem(item.product)"
                    >remove</b-icon>
                    </div>
                    
                    <hr />
                  </router-link>
                </div>
              </transition-group>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item small" href="#">View all Notification</a>
            </div>
          </li>

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
            <form class="form-inline my-2 my-lg-0 mr-lg-2">
              <div class="input-group">
                <input class="form-control" type="text" placeholder="Search anything..." />
                <span class="input-group-append">
                  <b-button variant="primary" type="button" style="padding: 0px 10px !important;">
                    <b-icon icon="search"></b-icon>
                  </b-button>
                </span>
              </div>
            </form>
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
import { mapActions } from "vuex";
export default {
  props: ["user", "log", "cart"],
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
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
</style>