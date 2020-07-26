<template>
  <div>
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />
      <b-row>
        <b-col>
          <b-card title="Only Shipping Instruction /Guideline"  class="overflow-hidden mb-3 p-3">
            <b-card-text>
              <ul class="list-unstyled">
                <li><h6>01 </h6> <p>When shipping to us, always remember that Your Marpe Username Is More Important Than Your Item.. This is because, if your supplier failed to write your username, it can lead to loss of goods, delay in shipping, frustration, and disappointment. So first thing first, always make sure that your supplier include your username on the parcel. If possible, ask them to write it on a separate piece of paper and stick it on the carton of the parcel.</p></li>
                <li><h6>02 </h6> <p>What we receive from your supplier is what we will ship to you. It is your responsibility to confirm from your supplier what he/she is sending to us before they ship out. Get the tracking number,know the kg, and follow up</p></li>
                <li><h6>03 </h6> <p>Sometimes there might be local shipping fee from your supplier's office to our office. It is your responsibility to make sure that your supplier pays the full payment to the shipping company before they ship the goods to us. In a situation whereby your supplier failed to pay the shipping fee, we have the right to reject accepting the products from the shipping company during delivery if the amount you have in your Chrisvicmall wallet is insufficient to cover the shipping fee.</p></li>
                <li><h6>04 </h6> <p>Make sure that you have given your supplier the exact address which you can find on "My China Address" which is within your "Account Profile" when you log into your Chrisvicmall account. That address is a unique address that belongs only to use.</p></li>
                <li><h6>05 </h6> <p>Before your supplier ship out the goods to us, please reconfirm the weight of the parcel, the number of items being sent, and also that your username is written on the package. Please note that sometimes your supplier's weight might be between 0.1kg to 2kg lower or higher due to the difference of scale measurement.</p></li>
                <li><h6>06 </h6> <p>It is your responsibility to keep in touch with the supplier from the time they confirm that the item has been shipped to us by the time we receive the goods. If you did not receive any update from us after three days, your supplier informed you of the shipping, please contact the supplier and ask for the tracking number of the shipping. Ask the supplier to tell you about the current location of the goods. If your supplier informs you that the products have reached our office, contact us immediately.</p></li>
              </ul>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
export default {
  name: "orders",
  props: "id",
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
        },
        {
          text: "Only Purchase Order",
          href: "onlypurchesed",
        },
        {
          text: "Only Shipping Order",
          href: "onlyshipping",
          active: true
        },
        {
          text: "Purchase And Shipping",
          href: "purchaseshipping"
        }
      ]
    };
  },
  computed: {
    ...mapState(["log", "user"])
  }
};
</script>

<style>
</style>
