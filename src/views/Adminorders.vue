<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      
      <b-tabs content-class="mt-3">
        <b-tab title="Placed Order" active>
          
          <!-- <div v-if="log.loading">
            <b-card no-body class="overflow-hidden" style="max-width: 100%; padding: 15px; margin: 0 15px;">
              <b-row no-gutters>
                    <b-col md="2">
                        <content-placeholders :rounded="true">
                          <content-placeholders-img />
                        </content-placeholders>
                    </b-col>
              </b-row>
            </b-card>
          </div> -->

          <transition-group v-if="getUnshippedOrders.length > 0" name="fade" class="row row-cols-1" tag="div">
            <div v-for="order in getUnshippedOrders" :key="order._id">
              <div v-for="(cart, index) in order.cart" :key="index">
                <b-card no-body class="overflow-hidden mb-3" style="max-width: 100%; margin: 0 15px;">
                  <b-row no-gutters class="p-4">
                    <b-col md="2">
                      <b-img-lazy v-bind="mainProps" :src="cart.product.thumbnail" alt="Image" class="rounded-0" style="height: 150px;object-fit: contain;"></b-img-lazy>
                    </b-col>
                    <b-col>
                      <b-card-body style="padding: 0 1.25rem; font-size: .5em" :title="cart.product.name">
                        <b-list-group flush>
                          <b-list-group-item class="p-0" href="#">Email Addresss: {{ order.user.email }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Currency: {{ order.currency }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">delivery Method: {{ order.deliverymethod }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Item Amount: <strong>{{ cart.product.price | toCurrency }}</strong></b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Quantity: {{ cart.qty }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Paid: {{ order.total | toCurrency }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Status: waiting shipment</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Date: {{ new Date(order.date).toDateString() }}</b-list-group-item>
                        </b-list-group>
                      </b-card-body>
                    </b-col>
                    <b-col md="auto">
                      <b-button variant="outline" @click="comfirm(order._id)">Update Shipment</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
            </div>
          </transition-group>

          <b-card class="p-3" no-body v-else>
            <p >you have not place any order yet <router-link to="/" class="text-primary">click here </router-link> to get started</p>
          </b-card>

        </b-tab>
        <b-tab title="Shipped Orders">
          <div v-if="getShippedOrders.length > 0">
            <b-list-group v-for="order in getShippedOrders" :key="order._id">
              <b-list-group-item v-for="(cart, index) in order.cart" :key="index" class="d-flex justify-content-between align-items-center">
                {{ cart.product.name }}
                <b-badge variant="primary p-2" pill> Total Item(s) {{cart.qty}}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </div>
          <b-card v-else class="p-3" no-body>
            <p>you have nothing to ship <router-link to="/" class="text-primary">click here </router-link> to get started</p>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-container>

    <Footer />
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import VueBootstrap4Table from "vue-bootstrap4-table";

import { mapState, mapGetters } from "vuex";
export default {
  name: "users",
  props: ["id"],
  components: {
    VueBootstrap4Table,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview"
        },
        {
          text: "Users",
          href: "/admin/" + this.id + "/users"
        }
      ],
      boxTwo: '',
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 600,
        height: 400,
        class: ""
      },
    };
    
  },
  mounted() {
  },
  computed: {
    ...mapState(["user", "adminData", "log", "cart"]),
    ...mapGetters(["fullname", "getShippedOrders", "getUnshippedOrders"])
  },
  methods: {
    comfirm(orderId) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you have shipped this item', {
          title: 'Please Confirm',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'primary',
          cancelVariant: 'outline',
          okTitle: 'YES COMFIRM',
          cancelTitle: 'WAIT A MINUTE',
          footerClass: 'p-3',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value;
            this.$store.dispatch("updateShipment", {accessToken: localStorage.getItem('accessToken'), orderId})
            .then(data => {
              this.$store.commit("UPDATE_SHIPMENT_ORDER", data);
            })
            console.log('comfirmed');
          })
          .catch(err => {
            // An error occurred
            console.log(err);
          })
      }
  }
};
</script>

<style scoped>
.has-clear-right .form-control {
  min-width: 200px;
}
.card .card-body h1, .card .card-body h2, .card .card-body h3, .card .card-body h4, .card .card-body h5, .card .card-body h6 {
    font-size: 2.5em !important;
}
</style>