<template>
  <div class="content-wrapper" ref="contentWrapper">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
export default {
  name: "orders",
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (to.path === `/user/${this.$store.state.user.slug}/orders/domestic?listorders=true`) {
        location.reload();
      }
    }
  },
  computed: {
    ...mapState(["log", "user", "orders"])
  }
  
};
</script>

<style>
</style>
