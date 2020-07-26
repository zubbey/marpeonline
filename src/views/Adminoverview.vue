<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <b-row cols="1" cols-md="2" cols-xl="4">
        <b-col>
          <b-card class="text-white o-hidden h-100" style="background-color: #8862e0">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h6>Customers</h6>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="people" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h3>{{ totalUsers }}</h3>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <span class="float-left">View Customers</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="text-white o-hidden h-100" style="background-color: #ffaf00">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h6>Orders</h6>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="cart3" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h3>{{ totalOrders }}</h3>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <span class="float-left">View Orders</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="text-white o-hidden h-100" style="background-color: #59ddff">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h6>Products</h6>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="box" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h3>{{ totalProducts }}</h3>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <span class="float-left">View Products</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="text-white o-hidden h-100" style="background-color: #19d895">
            <div class="d-flex justify-content-between align-items-center">
              <span>
                <h6>Revenue</h6>
              </span>
              <b-iconstack font-scale="4">
                <b-icon stacked icon="circle-fill" style="color: rgba(248, 249, 250, 0.43)"></b-icon>
                <b-icon stacked icon="wallet2" scale="0.5"></b-icon>
              </b-iconstack>
            </div>
            <h3>$0.00</h3>
            <b-card-footer style="background-color: rgba(0,0,0,.03) !important">
              <small class="float-left">View Revenue</small>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>

      <b-row cols-md="1" cols-xl="2" class="my-4">
        <b-col>
          <b-card no-body>
            <ChartBar />
          </b-card>
        </b-col>

        <b-col>
          <b-card no-body>
            <ChartDoughnut />
          </b-card>
        </b-col>
      </b-row>

      <b-row cols-md="1" cols-xl="3" class="my-4">
        <b-col>
          <b-card
            sub-title="Unpaid Orders"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            img-src="https://i.imgur.com/4GBliSd.png"
            img-alt="Card image"
            img-bottom
          >
            <b-card-text>
              <h3>0</h3>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col>
          <b-card
            sub-title="Visitors"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            img-src="https://i.imgur.com/4GBliSd.png"
            img-alt="Card image"
            img-bottom
          >
            <b-card-text>
              <h3>0</h3>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col>
          <b-card
            sub-title="Referred Users"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <div class="table-responsive">
                <table class="table table-bordered table-wrapper" id="dataTable" width="100%" cellspacing="0">
                  <tbody>
                    <tr v-for="(users, i) in referredUsers" :key="i">
                      <td>
                          <span class="d-flex align-items-center">
                            <b-avatar variant="primary" v-bind:text="getLastFirst(users.firstname, users.lastname)" class="mr-3"></b-avatar>
                            <span class="mr-auto">{{ users.firstname }} {{ users.lastname }}</span>
                            <b-badge>{{ new Date(users.created).toLocaleDateString() }}</b-badge>
                          </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card
          title="Active Users"
          >
            <b-table striped hover :items="activeUsers" :fields="fields" responsive="sm"></b-table>
          </b-card>
        </b-col>
      </b-row>
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
import ChartBar from "@/Components/admin/chart-bar.vue";
import ChartDoughnut from "@/Components/admin/chart-doughnut.vue";
// import ChartLine from "@/Components/admin/chart-line.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "adminoverview",
  props: ["id", "users"],
  components: {
    ChartBar,
    ChartDoughnut,
    // ChartLine,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview"
        },
        {
          text: "Overview",
          href: "/admin/" + this.id + "/overview"
        }
      ],

      labels: ["Search Engine", "Direct Click", "Bookmark Clik"],
      datasets: [
        {
          data: [30, 50, 15],
          backgroundColor: ["green", "blue", "orange"]
        }
      ],
      option: {
        title: {
          display: true,
          position: "bottom",
          text: "Traffic Sources"
        }
      },

      fields: ['status', 'name', 'email', 'activity'],
      activeUsers: [
        { isActive: true, name: 'Dickerson Macdonald', email: 'dickerson@email.com', activity: 'last login: ' + new Date().toLocaleDateString()},
        { isActive: false, name: 'Larsen Shaw', email: 'dickerson@email.com',  activity: 'last login: ' + new Date().toLocaleDateString() },
        { isActive: false, name: 'Geneva Wilson', email: 'dickerson@email.com',  activity: 'last login: ' + new Date().toLocaleDateString()},
        { isActive: true, name: 'Jami Carney', email: 'dickerson@email.com',  activity: 'last login: ' + new Date().toLocaleDateString() }
      ]
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["user", "log", "cart"]),
    ...mapGetters(["registerd", "totalUsers", "totalProducts", "referredUsers", "totalOrders"]),
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      })
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    },
    // referredUsers(users){
    //   return users.filter(function (u){
    //     return u.isReffered
    //   })
    // },
    getLastFirst(fn, ln){
      fn = fn.charAt(0);
      ln = ln.charAt(0);
      return fn + ln
    },
  }
};
</script>

<style scoped>
.table-wrapper {
  max-height: 120px;
  overflow: auto;
  display:inline-block;
}
</style>