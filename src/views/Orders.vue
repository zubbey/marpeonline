<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />
      <table class="table table-bordered table-responsive table-striped example1">
        <thead>
          <tr>
            <th>Item details</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.amount }}</td>
            <td>{{ order._id }}</td>
            <td>
              <img :src="'{{ url() }}/' + cart.product.thumbnail" width="150px" />
            </td>
            <td>Edit | Delete</td>
          </tr>
        </tbody>
      </table>
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
import { mapState } from "vuex";
export default {
  name: "orders",
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          href: "/user/" + this.id + "/"
        },
        {
          text: "Domestic Shipping Request",
          href: "/user/" + this.id + "/#shippingRequest"
        },
        {
          text: "Only Purchase Order",
          href: "/user/" + this.id + "/#orderPurchase"
        },
        {
          text: "Only Shipping Order",
          href: "/user/" + this.id + "/#shippingOrder"
        },
        {
          text: "Purchase And Shipping",
          href: "/user/" + this.id + "/#PurchaseShipping"
        },
        {
          text: "Shipping Checkout",
          href: "/user/" + this.id + "/#checkout"
        }
      ]
    };
  },
  mounted() {
    console.log(this.orders[0].cart);
  },
  computed: {
    ...mapState(["log", "user", "orders"])
  }
};
</script>

<style>
</style>
