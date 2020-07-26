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
        <!-- <span class="navbar-toggler-icon"></span> -->
        <b-icon icon="three-dots-vertical"></b-icon>
        <!-- <mdb-icon fab icon="bars" /> -->
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav pt-3" id="exampleAccordion">
          <li class="nav-item py-0" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <router-link :to="`/user/${user.slug}/overview`" class="nav-link">
              <b-icon icon="grid1x2"></b-icon> <span class="nav-link-text"> Overview</span>
          </router-link>
          </li>

          <li class="nav-item py-0" data-toggle="tooltip" data-placement="right" title="Referral">
          <router-link :to="`/user/${user.slug}/referral`" class="nav-link">
              <b-icon icon="person-plus"></b-icon> <span class="nav-link-text"> Affiliate/Referral Program</span>
          </router-link>
          </li>
          <li class="nav-item py-0" data-toggle="tooltip" data-placement="right" title="Wallet">
          <router-link :to="`/user/${user.slug}/wallet`" class="nav-link">
              <b-icon icon="credit-card"></b-icon> <span class="nav-link-text"> My Wallet <b-badge variant="primary"> New</b-badge></span>
          </router-link>
          </li>

          <router-link :to="`/user/${user.slug}/orders/domestic`">
          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Orders">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseComponents"
              data-parent="#exampleAccordion"
            >
              <b-icon icon="cart3"></b-icon> <span class="nav-link-text"> Order Placement</span>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseComponents">
              <li class="nav-link">
                <router-link to="domestic">Domestic Order</router-link>
              </li>
              <li class="nav-link">
                <router-link to="onlypurchesed">Only Purchase Order</router-link>
              </li>
              <li class="nav-link">
                <router-link to="onlyshipping">Only Shipping Order</router-link>
              </li>
              <li class="nav-link">
                <router-link to="purchaseshipping">Purchase And Shipping</router-link>
              </li>
            </ul>
          </li>
          </router-link>
          <router-link :to="`/user/${user.slug}/account_history`">
          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Account History">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseExamplePages"
              data-parent="#exampleAccordion"
            >
              <b-icon icon="clock-history"></b-icon> <span class="nav-link-text"> Account History</span>
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
          <li class="nav-item py-1" data-toggle="tooltip" data-placement="right" title="Account Settings">
            <a
              class="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              href="#collapseMulti"
              data-parent="#exampleAccordion"
            >
              <b-icon icon="gear"></b-icon> <span class="nav-link-text"> Account Setting</span>
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
          <li class="nav-item py-0" data-toggle="tooltip" data-placement="right" title="Logout">
            <a class="nav-link" @click.prevent="logout">
              <b-icon icon="power"></b-icon> <span class="nav-link-text"> Logout</span>
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
              <span v-if="cart.length > 0">
                Cart
                <span
                  class="badge badge-pill badge-primary"
                  v-if="cart.length  > 0"
                >{{ cart.length  }}</span>
              </span>
              <!-- if cart is empty -->
              <span v-if="cart.length == 0" class="indicator text-primaey d-none d-lg-block">
                <i class="fa fa-fw fa-circle"></i>
              </span>
            </a>
            <div class="dropdown-menu bg-white" aria-labelledby="alertsDropdown">
              <div class="dropdown-divider"></div>
              <transition-group v-if="cart.length > 0" name="fade" tag="div">
                <div v-for="item in cart" :key="item._id" class="p-3">
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
                      <span class="text-primary">
                        Price:
                        <strong>{{ item.product.price | toCurrency }}</strong>
                        <div class="text-muted">Qantity: <strong>{{ item.qty }}</strong></div>
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

              <h6 v-else class="dropdown-header">Your cart is empty, try to Add stuff.</h6>
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
            <a class="nav-link" ><b-icon icon="person"></b-icon><strong>{{ user.firstname }}</strong></a>
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
import { mdbIcon } from 'mdbvue';
import { mapActions } from "vuex";
export default {
  props: ["user", "log", "cart"],
  components: {
    mdbIcon
  },
  methods: {
    ...mapActions(["removeCartItem"]),

    logout() {
      this.$store.dispatch("logoutUser").then(() => {
          localStorage.removeItem('isAuthorized');
          localStorage.removeItem('accessToken');
          location.reload();
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
.navbar .dropdown-menu {
    position: absolute !important;
}
</style>