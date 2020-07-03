<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <b-row>
        <b-col>
          <vue-bootstrap4-table
            :rows="products"
            :columns="columns"
            :config="config"
            :actions="actions"
            @on-edit="onEdit"
            @on-add="onAdd"
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

      <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>

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
  name: "Products",
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
          href: "/admin/" + this.id + "/overview"
        },
        {
          text: "Products",
          href: "/admin/" + this.id + "/products"
        }
      ],
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
          label: "Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Enter product name"
          },
          sort: true
        },
        {
          label: "Price",
          name: "price",
          sort: true
        },
        {
          label: "Category",
          name: "categoryId",
          sort: true
        },
        {
          label: "created",
          name: "created",
          sort: true
        }
      ],
      actions: [
        {
          btn_text: "Edit",
          event_name: "on-edit",
          class: "btn btn-secondary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        },
        {
          btn_text: "Add Product",
          event_name: "on-add",
          class: "btn btn-primary",
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
  mounted() {
    //   console.log(this.getCategoryName(this.products[0].categoryId));
    console.log(this.categoryId);
    
      
  },
  computed: {
    ...mapState(["user", "log", "products"]),
    ...mapGetters(["getCategoryName"]),
  },
  methods: {
    onEdit(payload) {
      console.log(payload);
    },
    onAdd() {
        // v-b-toggle.sidebar-right
      console.log('add a product');
    }
  }
};
</script>

<style>
</style>