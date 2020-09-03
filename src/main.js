import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import VueContentPlaceholders from 'vue-content-placeholders'
import Skeleton from 'vue-loading-skeleton'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueLogger from 'vuejs-logger';
import numeral from "numeral";
import CKEditor from '@ckeditor/ckeditor5-vue';

// import 'VueCharts'
import 'chart.js'
import 'hchs-vue-charts'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-bootstrap4-table'
import 'bulma/css/bulma.css'

// import carousel
Vue.use(Viewer)
Vue.use(VueLazyload, {
  lazyComponent: true
})
Vue.use(VueLogger, options)
Vue.use(Vuelidate)
Vue.use(VueContentPlaceholders)
Vue.use(Skeleton)
Vue.use(window.VueCharts)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(CKEditor)

Vue.config.productionTip = false
Vue.config.devtools = true
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

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

Vue.filter('numeral', function (value) {
  return numeral(value).format('0,0');
})
new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
