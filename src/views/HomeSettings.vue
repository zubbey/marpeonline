<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

    </b-container>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import { mapState } from 'vuex';

export default {
  name: "home_settings",
  props: ["id"],
  components: {
    Breadcrumb
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview",
        },
        {
          text: "Users",
          href: "/admin/" + this.id + "/home_settings",
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