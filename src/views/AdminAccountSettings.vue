<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

    </b-container>

    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from 'vuex';

export default {
  name: "account_settings",
  props: ["id"],
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview",
        },
        {
          text: "Account Setttings",
          href: "/admin/" + this.id + "/admin_account_settings",
        },
      ]
    };
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
.has-clear-right .form-control {
  min-width: 200px;
}
.divHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
}
</style>