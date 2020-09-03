<template >
<div>
  <Header/>
  <div class="container py-5" style="padding-top:70px;">
    <InfoBreadcrumb v-for="item in product" :key="item._id" :item="item"/>
    <InfoBox :product="product"/>
    <InfoText v-for="(item, index) in product" :key="index" :desc="item.desc"/>
  </div>
  <Newsletter/>
  <Footer/>
</div>
</template>

<script>
import Header from '@/Components/Header.vue'
import Newsletter from '@/Components/Newsletter.vue'
import Footer from '@/Components/Footer.vue'
import InfoBreadcrumb from '@/Components/InfoPage/InfoBreadcrumb.vue'
import InfoBox from '@/Components/InfoPage/InfoBox.vue'
import InfoText from '@/Components/InfoPage/InfoText.vue'
import Loading from '@/Components/Loading.vue'

import { mapState } from 'vuex';

export default {
  props: ['id'],
  name:'Product',
  components: {
    Header, Newsletter, Footer, InfoBreadcrumb, InfoBox, InfoText, Loading
  },
  computed: {
    ...mapState(['product', 'log']),
  },
  mounted(){
    this.$store.dispatch('getProduct', this.id)
    .then(this.$store.commit('RESOLVED'))
  }
}
</script>

<style scoped>
.rounded {
    border-radius: .55rem !important;
}
hr {
width: 50px;
border-bottom: 1px solid black;
}
.related-item{
  padding-left: 8rem;
  padding-right: 8rem;
  height: auto;
  text-align: center;
}
</style>
