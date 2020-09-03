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
          <b-card title="Purchase and Shipping" class="overflow-hidden mb-3 p-3">
            <h6 class="muted mb-3">
              By placing this order,you acknowledge that you have read our Only
              <a style="color: #ea5376 !important" href="#">Purchase And Shipping Guidelines</a>
            </h6>
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <b-form-group label-cols="4" label-cols-lg="2" label="Website Name" label-for="website">
                <b-form-select v-model="data.website" :options="options" required></b-form-select>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-sm="2" label="Product image" label-for="image">
                <b-form-file
                  id="image"
                  accept="image/jpeg, image/png, image/gif"
                  v-model="data.image"
                  ref="file"
                  @change="onSelect"
                ></b-form-file>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product Link" label-for="link">
                <b-form-input v-model="data.productLink" id="link" placeholder="Enter the product link" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Unit Price" label-for="unitprice">
                <b-form-input v-model="data.unitPrice" id="unitprice" placeholder="Enter unit price" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Quantity" label-for="quantity">
                <b-form-input v-model="data.qty" id="quantity" placeholder="Enter quantity" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product Option" label-for="option">
                <b-form-input v-model="data.productOption" id="options" placeholder="Enter Product option eg: Color, Size"></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Seller Phone" label-for="seller">
                <b-form-input v-model="data.sellerphone" id="seller" placeholder="Enter seller phone"></b-form-input>
              </b-form-group>
              <b-button  v-if="log.loading" disabled type="submit" variant="primary" style="width: 100px;">
                <b-spinner small></b-spinner><b-icon icon="plus-circle-fill"></b-icon> Add
              </b-button>
              <b-button v-else type="submit" variant="primary" style="width: 100px;">
                <b-icon icon="plus-circle-fill"></b-icon> Add
              </b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>

      <hr class="my-5" />

      <b-row v-if="purchaseorder.length > 0">
        <b-col>
          <b-card title="Waiting for shipping" class="overflow-hidden mb-3 p-3">
            <mdb-tbl btn responsive striped>
              <mdb-tbl-head>
                <tr>
                  <th>#</th>
                  <th>Product Image</th>
                  <th>Website Name</th>
                  <th>Product Link</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Product Option</th>
                  <th>Seller Phone</th>
                  <th>Fee</th>
                  <th>Total Paid</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body v-for="(item, index) in purchaseorder" :key="index">
                  <tr v-for="(product, index) in item.data" :key="index">
                      <th scope="row">{{ index }}</th>
                      <td><img :src="product.image"  clas="img_resize" style="height:50px;width:50px;"/></td>
                      <td>{{ product.website }}</td>
                      <td>{{ product.productLink }}</td>
                      <td>{{ product.unitPrice | toCurrency }}</td>
                      <td>{{ product.qty }}</td>
                      <td>{{ product.productOption }}</td>
                      <td>{{ product.sellerphone }}</td>
                      <td>{{ product.fee }}%</td>
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
              <p>you have nothing to ship fill the form to get started</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- MODALS -->
    <b-modal
      style="padding: 0;"
      id="comfirmModal"
      ref="comfirmModal"
      title="Comfirm Payment"
      size="xl"
    >
      <mdb-tbl btn responsive striped>
        <mdb-tbl-head>
          <tr>
            <th>#</th>
            <th>Product Image</th>
            <th>Website Name</th>
            <th>Product Link</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Product Option</th>
            <th>Seller Phone</th>
            <th>Fee</th>
            <th>Total</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
            <tr>
                <th scope="row">1</th>
                <td><img :src="data.image"  clas="img_resize" style="height:50px;width:50px;"/></td>
                <td>{{ data.website }}</td>
                <td>{{ data.productLink }}</td>
                <td>{{ data.unitPrice | toCurrency }}</td>
                <td>{{ data.qty }}</td>
                <td>{{ data.productOption }}</td>
                <td>{{ data.sellerphone }}</td>
                <td>{{ fee }}%</td>
                <td>{{ percentage(data.unitPrice * data.qty, fee) | toCurrency }}</td>
            </tr>
        </mdb-tbl-body>
      </mdb-tbl>
      <template v-slot:modal-footer="{ ok }">
        <b-button variant="primary" @click="ok(makePayment(percentage(data.unitPrice * data.qty, fee)))">
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
import { mdbTbl, mdbTblHead, mdbTblBody } from "mdbvue";
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "onlypurchesed",
  props: ["id"],
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      baseURL: 'http://ec2-34-202-157-59.compute-1.amazonaws.com:5000',
      fileName: '',
      fee: null,
      authorization_url: null,
      reference: null,
      checkTransaction: null,
      currency: '',
      data: {
        useremail: '',
        website: null,
        image: null,
        productLink: '',
        unitPrice: '',
        qty: '',
        productOption: null,
        sellerphone: '',
        total: null,
        fee: null
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
          href: "domestic"
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
          href: "purchaseshipping",
          active: true
        }
      ],
      options: [{value: null, text: "select product website ..."}]
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
          this.makeToast("danger", "Transaction Failed, Please try again", true);
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "Insufficient Funds") {

          this.stopTransactionCheck();
          this.makeToast("warning", "Insufficient Funds, Please try again", true);
          this.$refs["paymentModal"].hide();
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (newTrans === "warning") {
          this.makeToast(
            "warning",
            this.log.message,
            true
          );
          this.$store.commit("RESET");
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
    this.options = this.settings.productwebsites;
    this.data.useremail = this.user.email;
  },
  computed: {
    ...mapState(["log", "user", "purchaseorder", "settings", "currencyType"])
  },
  methods: {

    percentage(num, per){
      let percent = (num/100)*per;
      return percent + num;
    },
    onSelect(event){
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = event.target.files[0];
      if(!allowedTypes.includes(file.type)) {
        this.makeToast("danger", "only images are allowed", true);
        return;
      }
      if(file.size > 1000000){
        this.makeToast("danger", "too large, Maximum file size should be is 1MB", true);
        return;
      }
      this.data.image = file;
      this.makeToast("success", "image uploaded!", true);
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append('file', this.data.image);

      try {
        let response = await axios.post(`${this.baseURL}/api/upload`, formData);
        this.fileName = response.data.file.filename;
        // this.addPurchase(`${this.baseURL}/${response.data.file.path}`)
        this.data.image = `${this.baseURL}/${response.data.file.path}`;
        this.$refs["comfirmModal"].show();
      } catch (error) {
        this.$store.commit("logServerErr", error.response.data.message);
      }
    },
    updateUserData(){
      this.data.total = this.percentage(this.data.unitPrice * this.data.qty, this.fee);
      this.data.fee = this.fee;

      this.$store.dispatch("addPurchaseOrder", this.data)
      .then(data => {
        this.$store.commit("SET_PURCHASE_ORDER", data);
        this.$store.commit("SAVED", "added successfully");
        this.data = {
          useremail: '',
          website: null,
          image: null,
          productLink: '',
          unitPrice: '',
          qty: '',
          productOption: null,
          sellerphone: '',
          total: null,
          fee: null
        }
      })
      .then(() => {
        setTimeout(() => {
          this.$store.commit("RESET");
        }, 5000);
      })
      .catch(error => this.$store.commit("logServerErr", error.response.data.message))
    },

    makePayment(total) {
      let user = {email: this.data.useremail};
      let data = {
          total: total,
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

    stopTransactionCheck() {
      clearInterval(this.checkTransaction);
    },

    makeToast(variant = null, msg, append = false) {
      this.toastCount++;
      this.$bvToast.toast(msg, {
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
