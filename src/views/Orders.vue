<template>
  <div class="content-wrapper" ref="contentWrapper">
    <router-view />
    <Footer />
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>
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
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 600,
        height: 400,
        class: ""
      }
    }
  },
  watch: {
    $route(to, from) {
      console.clear(from);
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
