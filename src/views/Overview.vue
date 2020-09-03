<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />

      <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2" class="mb-5">
        <b-col class="mb-3">
          <b-card class="text-white o-hidden h-100" style="background-color: #59ddff">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h5>Current Balance</h5>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="wallet2" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h1 class="title is-2 text-white">$0.00</h1>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <span class="float-left">View Wallet</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>

        <b-col>
          <b-card class="text-white o-hidden h-100" style="background-color: #958cf4">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h5>Earned Point</h5>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="star" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h1 class="title is-2 text-white">{{ totalAffiliatePoint }}%</h1>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <span class="float-left">View Transactions</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>

      <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2" class="mb-5">
        <b-col class="mb-3">
        </b-col>
      </b-row>
    </b-container>

    <Footer />
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>

    <!-- Modal-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            class="modal-body"
          >Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="#">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "overview",
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
          text: "Overview",
          href: "/user/" + this.id + "/overview"
        }
      ],

      error: null,
      valid: null,
      show: true
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["user", "log", "cart"]),
    ...mapGetters(["fullname", "registerd", "totalAffiliatePoint"]),
  },
  methods: {
  }
};
</script>

<style>
</style>