<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />

      <b-row>
        <b-col>
          <b-card title="My Wallet" sub-title="Account Balance" class="text-center py-5">
            <b-card-text>
              <h1 class="display-4 font-weight-bold text-primary">{{ balance | toCurrency}}</h1>
            </b-card-text>

            <b-card-text>
              <b-button variant="outline" type="button" v-b-modal.withdrawModal>Withdraw Money</b-button>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card no-body>
            <b-table
              striped
              hover
              borderless
              responsive
              :items="transactions"
              :fields="fields"
            ></b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>

    <b-modal
      id="withdrawModal"
      ref="modal"
      title="Withdraw Money"
      size="lg"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="d-flex">
            <div><p class="text-muted">Recieving Account: <span class="font-weight-bold">Mastercard 2300..0302</span></p></div>
            <a href="#" class="ml-4 text-primary">Change</a>
        </div>
        <b-form-group
          :state="nameState"
          invalid-feedback="Opps! the amount exceeds your balance"
        >
          <b-form-input
            style="border: none; border-bottom: 1px solid #dee2e6; font-size: 2.5rem; color: #ea5376"
            id="name-input"
            v-model="amount"
            :state="nameState"
            required
          ></b-form-input>
            <div><p class="text-muted">Actual Balance: <span class="font-weight-bold">{{ balance }}</span></p></div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState } from "vuex";
export default {
  name: "wallet",
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      balance: 1000,
      amount: 200,
      nameState: null,
      submittedNames: [],
      items: [
        {
          text: "Dashboard",
          href: "/user/" + this.id + "/"
        },
        {
          text: "Account History",
          href: "/user/" + this.id + "/My Wallet"
        }
      ],

      fields: [
        {
          key: "date",
          sortable: true
        },
        {
          key: "type",
          sortable: false
        },
        {
          key: "status",
          sortable: true
        },
        {
          key: "details",
          sortable: true
        },
        {
          key: "amount",
          sortable: true
        }
      ],
      transactions: [
        {
          date: new Date().toLocaleDateString(),
          type: "Withdrawal",
          status: "Approved",
          details: "Mastercard transfer...0922",
          amount: 1000
        },
        {
          date: new Date().toLocaleDateString(),
          type: "Withdrawal",
          status: "Approved",
          details: "Mastercard transfer...2102",
          amount: 500
        },
        {
          date: new Date().toLocaleDateString(),
          type: "Deposit",
          status: "Approved",
          details: "Transfered from wal...0922",
          amount: 20000
        },
        {
          date: new Date().toLocaleDateString(),
          type: "Withdrawal",
          status: "Approved",
          details: "Mastercard transfer...0922",
          amount: 1000
        },
        {
          date: new Date().toLocaleDateString(),
          type: "Deposit",
          status: "Pending",
          details: "Mastercard transfer...0922",
          amount: 12000
        },
        {
          date: new Date().toLocaleDateString(),
          type: "Withdrawal",
          status: "Approved",
          details: "Mastercard transfer...0922",
          amount: 1000
        }
      ]
    };
  },
  computed: {
    ...mapState(["log", "user"])
  },
  methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('withdrawModal')
        })
      }
    }
};
</script>

<style>
</style>