<template>
  <div>
    <Header />
    <div class="container">
      <b-row class="bg-white rounded my-5 p-4">
        <b-col>
          <b-tabs content-class="mt-3" justified>
            <b-tab title="Procurement Calculator" active>
              <p>Our procurement fee is {{ settings.commission.procurementfee }}% of the product fee you want to purchase or the total amount you want us to pay your supplier. Use the form below to calculate the estimated amount it will cost you when procuring for an item through us.</p>

              <div v-if="log.msgError && !log.message == ''" class="alert alert-danger" role="alert">{{ log.message }}</div>
              <b-form @submit.prevent="convertCurrency" inline>
                <b-input
                  class="w-50"
                  placeholder="Cost of item eg: 1000"
                  v-model="amount"
                ></b-input>
                <b-form-select v-model="selected" :options="currency"></b-form-select>

                <b-button v-if="log.loading" disabled variant="primary">
                  <b-spinner small></b-spinner> Calculating
                </b-button>
                <b-button v-else variant="primary" type="submit">Calculate</b-button>
              </b-form>

              <h4>{{currencyType.currency}} {{amount | toCurrency }} is qual to: {{selected}}{{ result}}</h4>
              <p>The rate of {{amount | toCurrency }} is {{ result | toCurrency }} as of {{ conversionDate }}</p>
            </b-tab>
            <b-tab title="Shipping Calculator">
              <p>Enter your product weight(kg) and select your country to calculate the estimated amount it will cost you to ship from China to your country.</p>
              <b-form
              inline
              @submit.prevent="calculatekg"
              ref="form2"
              >
                <b-input
                  class="w-50"
                  placeholder="Enter Kg"
                  v-model="kg"
                ></b-input>
                <b-form-select
                v-model="selected"
                :options="currency"></b-form-select>
                <b-button type="submit" variant="primary">Calculate</b-button>
              </b-form>

              <b-card v-if="result !== null">
                <h5>The shipping cost for {{ kg }}kg in {{ selected }} is: <b>{{ convertCurrency(result) | toSelectedCurrency(selected) }}</b></h5>
              </b-card>
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
        kg: '',
        result: null,
        conversionDate: null,
        selected: '',
        currency: [{ value: null, text: 'select currency' }]
      }
    },
    created(){
      const selectableCurrency = this.settings.currencyType.map(({ name: text, currency: value, ...rest }) => ({ text, value, ...rest }));
      this.currency = selectableCurrency;
    },
    watch: {
      selected(newSelection, oldSelection) {
        if(oldSelection.length > 0){
          this.selected = '';
          this.result = null;
        }
      },
      kg(newKg, oldKg) {
        if(oldKg.length > 0){
          this.selected = '';
          this.result = null;
        }
      }
    },
    computed: {
      ...mapState(['log', 'settings', 'currencyType'])
    },
    methods: {
      convertCurrency(amount){
        // convert amount to dollar
        if(this.selected === 'USD'){
          return Math.round((amount * 1000) / this.settings.rates[0].d_to_n / 1000);

        } else if(this.selected === 'CNY'){
          return Math.round(amount * this.settings.rates[4].n_to_y);

        } else if(this.selected === 'GHC'){
          return Math.round(amount * this.settings.rates[3].n_to_g);

        } else {
          return amount
        }
      },
      calculatekg(){
        this.result = this.kg * this.settings.commission.kg;
        this.$refs.form2.reset();
      }
    },
    filters: {
      toSelectedCurrency (value, selected) {
        let locale = '';
        if(selected === 'NGN'){
          locale = 'en-NG';
        }else if(selected === 'USD'){
          locale = 'en-US';
        }else if(selected === 'CNY'){
          locale = 'zh-CN';
        }else if(selected === 'GHC'){
          locale = 'en-GH';
        }

        if (typeof value !== "number") {
          return value;
        }
        let formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: selected,
          minimumFractionDigits: 0
        });
        return formatter.format(value);
      }
    }
};
</script>

<style>
  a{
    color: #000 !important; 
  }
</style>