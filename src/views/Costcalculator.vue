<template>
  <div>
    <Header />
    <div class="container">
      <b-row class="bg-white rounded my-5 p-4">
        <b-col>
          <b-tabs content-class="mt-3" justified>
            <b-tab title="Procurement Calculator" active>
              <p>Our procurement fee is 3% of the product fee you want to purchase or the total amount you want us to pay your supplier. Use the form below to calculate the estimated amount it will cost you when procuring for an item through us.</p>

              <div v-if="log.msgError && !log.message == ''" class="alert alert-danger" role="alert">{{ log.message }}</div>
              <b-form @submit.prevent="convertAmount" inline>
                <b-input
                  class="w-50"
                  placeholder="Cost of item eg: 1000"
                  v-model="amount"
                ></b-input>
                <b-form-select v-model="selected" :options="currency"></b-form-select>

                <b-button variant="primary" @click="convertAmount()">
                  <b-spinner v-if="log.loading" small></b-spinner> Calculate
                </b-button>
              </b-form>

              <h3>{{currencyType.currency}} {{amount | toCurrency }} is qual to: {{selected}}{{ result}}</h3>
              <p>The rate of {{amount | toCurrency }} is {{ result | toCurrency }} as of {{ conversionDate }}</p>
            </b-tab>
            <b-tab title="Shipping Calculator">
              <p>Enter your product weight(kg) and select your country to calculate the estimated amount it will cost you to ship from China to your country.</p>
              <b-form inline>
                <b-input
                  class="w-50"
                  placeholder="Enter Kg"
                ></b-input>
                <b-form-select v-model="selected" :options="currency"></b-form-select>
                <b-button variant="primary">Calculate</b-button>
              </b-form>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/Components/Header.vue";
import Footer from "@/Components/Footer.vue";
import { mapState } from 'vuex';
export default {
  name: "Costcalculator",
  components: { Header, Footer },
  data() {
      return {
        amount: 0,
        result: null,
        conversionDate: null,
        selected: null,
        currency: [{ value: null, text: 'select currency' }]
      }
    },
    created(){
      const selectableCurrency = this.settings.currencyType.map(({ name: text, currency: value, ...rest }) => ({ text, value, ...rest }));
      this.currency = selectableCurrency;
    },
    computed: {
      ...mapState(['log', 'settings', 'currencyType'])
    },
    methods: {
      convertAmount(){
        let payload = {
          to: this.selected,
          from: this.currencyType.currency
        }
        this.$store.dispatch("convertCurrency", {payload}).then(data => {
          let res = `${payload.from}_${payload.to}`;
          let total = Math.round(data[res] * this.amount);
          this.result = Math.round(total * 100) / 100;
          this.conversionDate = new Date(data.time).toLocaleDateString();
        })
        .then(() => this.$store.commit("RESET"))
        .catch(error => this.$store.commit("logServerErr", error.response.data.message))
      }
    }
};
</script>

<style>
  a{
    color: #000 !important; 
  }
</style>