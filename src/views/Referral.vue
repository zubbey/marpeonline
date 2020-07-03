<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="items" :id="user.slug" />
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Referral Code" active>
            <div class="d-flex justify-content-between align-center">
              <h4>Tips</h4>
              <span>
                <b-badge pill variant="primary">Referral Code</b-badge>
                <h4>{{ user.referralcode }}</h4>
              </span>
            </div>
            <hr />
            <p
              class="text-break"
            >The referral code above is your Marpe affiliated code. This is specific to you and is a public link. You can freely share it on your blog/website, Facebook, Twitter, Instagram, Forums and other places. Visitors that registered on Chrisvicmall through your Affiliate link are called "Fish". When any of those visitors(Fish) proceed to use any of Chrisvicmall service (Procurement or Shipping) then you will be paid 1% of after expenses. You can be able to monitor your Affiliate earning from your dashboard under "Affiliate Program" menu</p>
            <h4>Earning & Payments</h4>
            <p
              class="text-break"
            >You earn 1% lifetime commission on customers that registered and used Chrisvicmall service through your affiliate link. The earnings are credited to your Chrisvicmall Wallet and they accumulate there. Your account must be at least $5 before you can be able to make a withdrawal.</p>
            <h4>Teams & Conditions</h4>
            <ul class>
              <li>You can invite anyone as long as they are not already registered with Chrisvicmall.com</li>
              <li>Please do not spam people with invites. We take spam reports very seriously and it might lead to account suspension.</li>
            </ul>
          </b-tab>

          <b-tab :title="`Total Affliate (${totalAffiliate})`">
            <b-card-text>
              <b-list-group>
                <b-list-group-item
                  style="border: none"
                  v-for="affiliate in user.affiliates"
                  :key="affiliate.email"
                >
                  <b-avatar size="20px"></b-avatar>
                  <strong>
                    {{ affiliate.affiliate_email }}
                    <br />
                    <small>
                    <span class="indicator text-primary d-none d-lg-block">
                      <b-icon icon="circle-fill" font-scale="0.5"></b-icon>
                            Joined: {{affiliate.date}}
                    </span>
                    </small>
                  </strong>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-tab>
          <b-tab title="Earning History">
            <b-row>
              <b-col>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <b-form-group class="mb-0">
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
                  </b-form-group>

                  <b-form-group class="mb-0">
                    <b-input-group size="lg">
                      <b-form-input v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </div>
              </b-col>
            </b-row>

            <b-table
              show-empty
              small
              stacked="md"
              :items="transactions"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              @filtered="onFiltered"
            >
              <template v-slot:cell(name)="row">{{ row.value.first }} {{ row.value.last }}</template>

              <template v-slot:cell(actions)="row">
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
              </template>

              <template v-slot:row-details="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ value }}</li>
                  </ul>
                </b-card>
              </template>
            </b-table>

            <b-row>
              <b-col sm="4" md="2" class="my-1">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
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
import { mapState, mapGetters } from "vuex";
export default {
  name: "referral",
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
          text: "Affiliate / Referral Program",
          href: "/user/" + this.id + "/referral"
        }
      ],
      transactions: [],
      fields: [
        { key: "affiliate_email", label: "Affilate Email", sortable: true },
        { key: "point", label: "Points", sortable: true },
        {
          key: "date",
          label: "Referred Date",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions", class: "text-right" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      filter: null,
      filterOn: []
    };
  },
  mounted() {
    this.totalRows = this.transactions.length;
    this.transactions = this.user.affiliates;
  },
  computed: {
    ...mapState(["log", "user"]),
    ...mapGetters(["totalAffiliate"]),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style>
</style>