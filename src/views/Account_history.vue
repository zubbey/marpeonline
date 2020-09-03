<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />

      <b-card title="COMING SOON!" sub-title="work in progress" class="text-center py-5"></b-card>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
export default {
  name: "account-history",
  components: {
    Breadcrumb,
    Footer,
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
          href: "/user/" + this.id + "/account-history"
        }
      ],
    };
  },
  computed: {
    ...mapState(["log", "user"]),
  },
  methods: {},
};
</script>

<style>
</style>