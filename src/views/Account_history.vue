<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb name="account_history" :id="user.slug" />
    </b-container>

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
  name: "account_history",
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          href: "/user/" + this.id + "/"
        },
        {
          text: "Account History",
          href: "/user/" + this.id + "/account_history"
        }
      ]
    };
  },
  computed: {
    ...mapState(["log", "user"])
  }
};
</script>

<style>
</style>