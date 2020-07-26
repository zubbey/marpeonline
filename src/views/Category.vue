<template >
<div>
  <Searchheader/>
  <Grid2 :categoryName="id" :productsInNigeria="productsInNigeria" :productsIn1688="productsIn1688" :categories="categories"/>
  <Footer :categories="categories"/>
</div>
</template>

<script>
import Searchheader from '@/Components/Searchheader.vue'
import Footer from '@/Components/Footer.vue'
import Loading from '@/Components/Loading.vue'
import Grid2 from '@/Components/category/Grid2.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name:'Category',
  props: ['id'],
  components: {
    Searchheader, Footer, Grid2, Loading
  },
  data(){
    return{
      options: []
    }
  },
  computed: {
    ...mapState(['productsInNigeria', 'productsIn1688', 'categories']),
  },
  mounted(){
    this.getNigeriaProducts();
    this.get1688Products();
    this.getCategories()
    .then(async data => {
      this.$store.commit('SET_CATEGORIES', data);
    })
  },
  methods: {
    ...mapActions(['getNigeriaProducts', 'get1688Products', 'getCategories'])
  }
}
</script>

<style scoped>
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
