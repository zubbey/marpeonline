<template>
  <div>
    <Grid :productsInNigeria="productsInNigeria" :productsIn1688="productsIn1688" :categories="categories" />
  </div>
</template>

<script>
import Grid from '@/Components/ProductsPage/Grid.vue'

export default {
  components: {
    Grid
  },
  name: 'Productlist',
  props: ['productsInNigeria', 'productsIn1688', 'categories']
}
</script>

<style scoped>

</style>