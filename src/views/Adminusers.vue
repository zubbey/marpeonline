<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <b-row>
        <b-col>
          <vue-bootstrap4-table
            :rows="users"
            :columns="columns"
            :classes="classes"
            :config="config"
            :actions="actions"
            @on-download="onDownload"
          >
            <template slot="sort-asc-icon">
              <i class="fas fa-sort-up"></i>
            </template>
            <template slot="sort-desc-icon">
              <i class="fas fa-sort-down"></i>
            </template>
            <template slot="no-sort-icon">
              <i class="fas fa-sort"></i>
            </template>
          </vue-bootstrap4-table>
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
import VueBootstrap4Table from "vue-bootstrap4-table";

import { mapState, mapGetters } from "vuex";
export default {
  name: "users",
  props: ["id", "users"],
  components: {
    VueBootstrap4Table,
    Breadcrumb,
    Footer
  },
  data() {
    return {
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.users.slug + "/overview"
        },
        {
          text: "Users",
          href: "/admin/" + this.users.slug + "/users"
        }
      ],
      rows: [],
      columns: [
        {
          label: "id",
          name: "_id",
          filter: {
            type: "simple",
            placeholder: "Enter product id"
          },
          sort: true
        },
        {
          label: "First Name",
          name: "firstname",
          filter: {
            type: "simple",
            placeholder: "Enter first name"
          },
          sort: true
        },
        {
          label: "Last Name",
          name: "lastname",
          sort: true
        },
        {
          label: "Email",
          name: "email",
          filter: {
            type: "simple",
            placeholder: "Enter email Address"
          },
          sort: true
        },
        {
          label: "Phone",
          name: "phone"
        },
        {
          label: "Referral Code",
          name: "referralcode"
        },
        {
          label: "Affiliates",
          name: "affiliates.length",
          sort: true
        },
        {
          label: "Country",
          name: "country",
          filter: {
            type: "simple",
            placeholder: "Enter country"
          },
          sort: true
        },
        {
          label: "City",
          name: "city"
        },
        {
          label: "Address",
          name: "address"
        },
        {
          label: "Zip",
          name: "zip"
        },
        {
          label: "Shipping",
          name: "shippingaddress"
        },
        {
          label: "registed",
          name: "created",
          sort: true
        }
      ],
      classes: {
        cell: {
          "my-cell my-cell2": true,
          "text-success": function(row, column, cellValue) {
            return (
              column.name == "affiliates.length" && row.affiliates.length > 0
            );
          },
          "text-danger": function(row, column, cellValue) {
            return (
              column.name == "affiliates.length" && row.affiliates.length < 1
            );
          }
        }
      },
      actions: [
        {
          btn_text: "Download",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        }
      ],
      config: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "All marpe customer"
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState(["user", "log", "cart"]),
    ...mapGetters(["fullname"])
  },
  methods: {
    onDownload(payload) {
      console.log(payload);
    }
  }
};
</script>

<style>
.has-clear-right .form-control {
  min-width: 200px;
}
</style>