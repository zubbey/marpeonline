<template>
  <div class="content-wrapper" ref="contentWrapper">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from 'vuex';

export default {
  name: "admin_settings",
  props: ["id"],
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
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