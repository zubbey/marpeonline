import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vuelidate from 'vuelidate'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import 'VueCharts'
import 'chart.js'
import 'hchs-vue-charts'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue-bootstrap4-table'
Vue.use(Viewer)
Vue.use(VueLogger, options)
Vue.use(Vuelidate)
Vue.use(window.VueCharts)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false
Vue.config.devtools = true
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};


Vue.filter('toCurrency', function (value) {
  let locale = store.state.currencyType.locale;
  let ccy = store.state.currencyType.currency;

  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: ccy,
      minimumFractionDigits: 0
  });
  return formatter.format(value);
});

new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')
