<template>
  <div>
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />

      <b-tabs content-class="mt-3">
        <b-tab title="Placed Order" active>
          
          <div v-if="log.loading">
            <b-card no-body class="overflow-hidden" style="max-width: 100%; padding: 15px; margin: 0 15px;">
              <b-row no-gutters>
                    <b-col md="2">
                        <content-placeholders :rounded="true">
                          <content-placeholders-img />
                        </content-placeholders>
                    </b-col>
              </b-row>
            </b-card>
          </div>

          <transition-group v-if="orders.length > 0" name="fade" class="row row-cols-1" tag="div">
            <div v-for="order in orders" :key="order._id">
              <div v-for="(cart, index) in order.cart" :key="index">
                <b-card no-body class="overflow-hidden mb-3" style="max-width: 100%; margin: 0 15px;">
                  <b-row no-gutters class="p-4">
                    <b-col md="2">
                      <b-img-lazy v-bind="mainProps" :src="cart.product.thumbnail" alt="Image" class="rounded-0" style="height: 150px;object-fit: contain;"></b-img-lazy>
                    </b-col>
                    <b-col md="8">
                      <b-card-body style="padding: 0 1.25rem;" :title="cart.product.name">
                        <b-list-group flush>
                          <b-list-group-item class="p-0" href="#">Item Amount: <strong>{{ cart.product.price | toCurrency }}</strong></b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Quantity: {{ cart.qty }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Paid: {{ order.amount | toCurrency }}</b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Status: </b-list-group-item>
                          <b-list-group-item class="p-0" href="#">Date: {{ new Date(order.date).toDateString() }}</b-list-group-item>
                        </b-list-group>
                      </b-card-body>
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
        <b-tab title="Waiting for Shippment">
          <div v-if="orders.length > 0">
            <b-list-group v-for="order in orders" :key="order._id">
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
        <b-tab title="Shipped Order">
          <b-card class="p-3" no-body>
            <p>Nothing is shipped yet <router-link to="/" class="text-primary">click here </router-link> to get started</p>
          </b-card>
        </b-tab>
      </b-tabs>
      
    </b-container>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
export default {
  name: "domestic",
  props: ['id'],
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 600,
        height: 400,
        class: ""
      },
      items: [
        {
          text: "Dashboard",
          href: "/user/" + this.id + "/"
        },
        {
          text: "Domestic Order",
          href: "domestic",
          active: true
        },
        {
          text: "Only Purchase Order",
          href: "onlypurchesed"
        },
        {
          text: "Only Shipping Order",
          href: "onlyshipping"
        },
        {
          text: "Purchase And Shipping",
          href: "purchaseshipping"
        }
      ]
    };
  },
  computed: {
    ...mapState(["log", "user", "orders"])
  }
};
</script>

<style>
</style>
