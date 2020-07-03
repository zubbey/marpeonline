<template>
  <div>
    <Grid :productsInNigeria="productsInNigeria" :productsIn1688="productsIn1688" :categories="categories" />
  </div>
</template>

<script>
import Grid from '@/Components/ProductsPage/Grid.vue'
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Grid
  },
  name: 'Productlist',
  computed: {
    ...mapState(['productsInNigeria', 'productsIn1688', 'categories'])
  },
  mounted(){
    this.getNigeriaProducts();
    this.get1688Products();
    this.getCategories();
  },
  methods: {
    ...mapActions(['getNigeriaProducts', 'get1688Products', 'getCategories'])
  }
}
</script>

<style scoped>

</style>