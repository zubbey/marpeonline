<template>
  <div>
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />

      <b-row>
        <b-col class="mb-4">
          <div v-if="log.msgError" class="alert alert-danger" role="alert">{{ log.message }}</div>
          <div v-if="log.msgSuccess" class="alert alert-success" role="alert">{{ log.message }}</div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card title="Only purchase order" class="overflow-hidden mb-3 p-3">
            <h6 class="muted mb-3">By placing this order,you acknowledge that you have read our Only <a style="color: #ea5376 !important" href="#">Purchase Guidelines</a></h6>
            <b-form @submit.prevent="onSubmit">
              <b-form-group label-cols="4" label-cols-lg="2" label="Seller Name" label-for="seller">
                <b-form-input v-model="data.sellername" name="seller" type="text" placeholder="Enter the seller name" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Amount To Pay" label-for="amount">
                <b-form-input v-model="data.amount" ref="amount" name="amount" type="text" placeholder="Enter the Amount you want To Pay" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Seller Phone Number" label-for="phone">
                <b-form-input v-model="data.sellerphone" name="phone" type="text" placeholder="Enter seller phone number" required></b-form-input>
              </b-form-group>
              <b-button v-if="log.loading" disabled variant="primary"><b-spinner small></b-spinner> Please Wait</b-button>
              <b-button v-else type="submit" variant="primary"><b-icon icon="envelope"></b-icon> Make Payment</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>

      <hr class="my-5" />
      
      <b-row v-if="onlypurchase.length > 0">
        <b-col>
          <b-card title="Waiting for paymentment" class="overflow-hidden mb-3 p-3">
            <mdb-tbl btn responsive striped>
              <mdb-tbl-head>
                <tr>
                  <th>#</th>
                  <th>Seller Name</th>
                  <th>Seller Phone</th>
                  <th>Amount to Pay</th>
                  <th>Fee</th>
                  <th>Total Paid</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr v-for="(product, index) in onlypurchase" :key="index">
                  <th scope="row">{{ index }}</th>
                  <td>{{ product.sellername }}</td>
                  <td>{{ product.sellerphone }}</td>
                  <td>{{ product.amount | toCurrency }}</td>
                  <td>{{ fee }}</td>
                  <td>{{ product.total | toCurrency }}</td>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
          </b-card>
        </b-col>
      </b-row>

      <b-row v-else>
        <b-col>
          <b-card class="p-3" no-body>
              <p>you have nothing to purchase</p>
            </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      style="padding: 0;"
      id="comfirmModal"
      ref="comfirmModal"
      title="Comfirm Payment"
      size="md"
    >
      <mdb-tbl btn responsive striped>
        <mdb-tbl-head>
          <tr>
            <th>#</th>
            <th>Amount to Pay</th>
            <th>Fee</th>
            <th>Total</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr>
            <th scope="row">1</th>
            <td>{{ data.amount | toCurrency }}</td>
            <td>{{ fee }}%</td>
            <td>{{ percentage(data.amount, this.fee) | toCurrency }}</td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
      <template v-slot:modal-footer="{ ok }">
        <b-button variant="primary" @click="ok(makePayment())">
          Comfirm
        </b-button>
      </template>
    </b-modal>

    <!-- FOR PAYMENT -->

    <b-modal
      style="padding: 0;"
      id="modal-prevent-closing"
      ref="paymentModal"
      hide-header
      hide-footer
      no-stacking
      ok-disabled
      size="md"
    >
      <object type="text/html" :data="authorization_url" style="width:100%; height:500px;"></object>
    </b-modal>
  </div>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "onlypurchesed",
  props: ['id'],
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      fee: null,
      authorization_url: null,
      reference: null,
      checkTransaction: null,
      currency: '',
      data: {
        useremail: '',
        sellername: null,
        amount: null,
        sellerphone: '',
        total: null
      },
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
          active: true
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
  created() {
    this.$store.watch(
      (state) => {
        console.log(state);
        return this.$store.state.transaction; // could also put a Getter here
      },
      (newTrans, oldTrans) => {
        console.log(oldTrans);
        //something changed do something
        if (newTrans === "success") {
          this.stopTransactionCheck();
          if (this.$store.state.log.isUserActive === true) {
            this.updateUserData();
          } else {
            this.loginNewUser();
          }
          this.makeToast("success", "Transaction was success", true);
          this.$refs["paymentModal"].hide();
        } else if (newTrans === "failed") {
          this.stopTransactionCheck();
          this.makeToast(
            "danger",
            "Transaction Failed, Please try again",
            true
          );
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "Insufficient Funds") {
          this.stopTransactionCheck();
          this.makeToast(
            "warning",
            "Insufficient Funds, Please try again",
            true
          );
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "warning") {
          console.log('reponse recieved');
          this.makeToast(
            "warning",
            this.log.message,
            true
          );
        }
      }
    );
    if (
      this.currencyType.currency == "NGN" ||
      this.currencyType.currency == "USD"
    ) {
      this.currency = this.currencyType.currency;
    }

    this.fee = this.settings.commission.procurementfee;
    this.data.useremail = this.user.email;
  },
  computed: {
    ...mapState(["settings", "log", "user", "onlypurchase", "currencyType"]),
    ...mapGetters(["totalOnlypurchased", "onlyPlacedOrder"]),
  },
  methods: {
    onSubmit(){
      this.$refs["comfirmModal"].show();
    },
    makePayment() {
      let user = {email: this.data.useremail};
      let data = {
          total: this.percentage(this.$refs.amount.value, this.fee),
          user: user,
          currency: this.currency
        };
      this.$store
        .dispatch("initTransaction", data)
        .then((response) => {
          this.authorization_url = response.data.authorization_url;
          this.reference = response.data.reference;
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        )
        .then(() => this.$refs["paymentModal"].show())
        .then(() => {
          let payload = {
            reference: this.reference
          };
          this.checkTransaction = setInterval(() => {
            this.$store.dispatch("verifyPayment", payload).then((data) => {
              if (data.data.status === "status") {
                console.log("success");
                this.stopTransactionCheck();
              } else {
                console.log("not verifed!");
              }
            });
          }, 5000);
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        );
    },
    updateUserData(){
      this.data.total = this.percentage(this.$refs.amount.value, this.fee);
      let token = localStorage.getItem("accessToken");
      let data = this.data;
      let payload = {token, data}
      this.$store.dispatch("addOnlyPurchase", payload)
      .then(data => {
        this.$store.commit("SET_NEW_ONLY_PURCHASE", data);
        this.$store.commit("SAVED", "added successfully");
      })
      .catch(error => this.$store.commit("logServerErr", error.response.data.message))
    },

    stopTransactionCheck() {
      clearInterval(this.checkTransaction);
    },

    percentage(num, per){
      let percent = ( num/100 ) * per;
      return parseInt(percent) + parseInt(num);
    },
    makeToast(variant = null, msg, append = false) {
      this.toastCount++;
      this.$bvToast.toast(`${msg}`, {
        title: "Transaction Status",
        variant: variant,
        solid: true,
        autoHideDelay: 5000,
        appendToast: append,
      });
    }
  }
};
</script>

<style>
</style>
