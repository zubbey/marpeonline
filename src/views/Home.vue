<template>
  <div>
    <Header />
    <Carousel :categoryOption="categoryOption" />
    <Productlist
      :productsInNigeria="productsInNigeria"
      :productsIn1688="productsIn1688"
      :categories="categories"
      class="container"
    />
    <Newsletter />
    <Footer :categories="categories" />
  </div>
</template>

<script>
import Header from "@/Components/Header.vue";
import Newsletter from "@/Components/Newsletter.vue";
import Footer from "@/Components/Footer.vue";
import Carousel from "@/Components/HomePage/Carousel.vue";
import Productlist from "@/Components/HomePage/Productlist.vue";

import { mapState } from "vuex";
export default {
  components: {
    Header,
    Newsletter,
    Footer,
    Carousel,
    Productlist,
  },
  data() {
    return {
      d_to_n: false,
      options: [],
    };
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (to.path === "/?redirect=403") {
        this.$store.commit("FORBIDDEN");
        location.reload();
      }
    },
  },
  computed: {
    categoryOption() {
      return this.categories.map((category) => ({
        value: category._id,
        text: category.categoryName,
      }));
    },
    ...mapState([
      "settings",
      "productsInNigeria",
      "productsIn1688",
      "categories",
    ]),
  },
};
</script>
<style>
@media (min-width: 1200px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 100% !important;
  }
}
</style>