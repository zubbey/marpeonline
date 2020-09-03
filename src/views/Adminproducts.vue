<template>
  <div class="content-wrapper" ref="contentWrapper">
    <b-container fluid>
      <Breadcrumb :items="breadcrumb" :id="user.slug" />

      <div class="row">
        <div class="col">
          <div class="container">
            <div class="divHeader">
              <h3 class="title is-3 mb-0">All Marpe products</h3>
              <mdb-btn color="primary" @click.native="addProductModal = true">
                <b-icon icon="plus"></b-icon>Add new product
              </mdb-btn>
            </div>

            <div class="box m-form">
              <label class="label">Search Product</label>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input
                    class="input"
                    v-model="searchItem"
                    v-on:keyup="searchInTheList(searchItem)"
                    type="text"
                    placeholder="Find a Product"
                  />
                  <span class="help is-dark">
                    <strong>{{filteredItems.length | numeral}}</strong>
                    of {{products.length | numeral}} product found
                  </span>
                </p>
                <p class="control">
                  <a
                    class="button is-info"
                    v-on:click="clearSearchItem"
                    v-bind:class="{'is-disabled': searchItem==''}"
                  >Clear</a>
                </p>
              </div>
            </div>
            <div class="box m-tags">
              <span>
                <strong>{{selectedItems.length}}</strong> product selected
              </span>
              <div class="m-tags-items" id="selectable">
                <a
                  v-for="(item, key) in selectedItems"
                  :key="key"
                  class="tag is-dark is-small"
                  @click="editProduct(item)"
                >
                  {{item.name}}
                  <button
                    class="delete is-small"
                    v-on:click="removeSelectedItem(item)"
                  ></button>
                </a>
              </div>
              <b-tooltip target="selectable" placement="bottomright">click to edit product</b-tooltip>
            </div>
            <nav class="pagination m-pagination">
              <a
                class="button"
                v-on:click="selectPage(this.pagination.currentPage-1)"
                v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[0] || this.pagination.items.length==0}"
              >Previous</a>
              <a
                class="button"
                v-on:click="selectPage(this.pagination.currentPage+1)"
                v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[this.pagination.items.length-1] || this.pagination.items.length==0}"
              >Next page</a>
              <ul>
                <li>
                  <a
                    class="button"
                    v-on:click="selectPage(pagination.items[0])"
                    v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[0] || this.pagination.items.length==0}"
                  >First</a>
                </li>
                <li class="is-space"></li>
                <li v-for="(item, key) in pagination.filteredItems" :key="key">
                  <a
                    class="button"
                    v-on:click="selectPage(item)"
                    v-bind:class="{'is-info': item == pagination.currentPage}"
                  >{{item | numeral}}</a>
                </li>
                <li class="is-space"></li>
                <li>
                  <a
                    class="button"
                    v-on:click="selectPage(pagination.items[pagination.items.length-1])"
                    v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[this.pagination.items.length-1] || this.pagination.items.length==0}"
                  >Last</a>
                </li>
              </ul>
            </nav>
            <div class="m-table table-container">
              <table class="table is-bordered is-striped is-narrow is-hoverable">
                <tr>
                  <th class="m-table-index">#</th>
                  <th>image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Label</th>
                  <th>Weight</th>
                  <th>Range</th>
                  <th>Reflink</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="(item, key) in products" :key="key">
                  <td>{{key}}</td>
                  <td>
                    <figure class="image is-128x128" @click="imageModal(item)">
                      <img :src="item.thumbnail" />
                    </figure>
                  </td>
                  <td>{{item.name}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.label}}</td>
                  <td>{{item.weight}}</td>
                  <td>{{item.qtyRange}}</td>
                  <td>{{item.refLink}}</td>
                  <td>{{item.status}}</td>
                  <td class="action">
                    <input type="checkbox" :value="item" v-model="selectedItems" />
                    <a class="delete is-medium ml-3" @click="deleteProduct(item)"></a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- ADD NEW PRODUCT MODAL -->
      <mdb-modal
        side
        position="bottom"
        fullHeight
        direction="bottom"
        :show="addProductModal"
        @close="addProductModal = false"
      >
        <mdb-modal-header>
          <mdb-modal-title>Add new product</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form ref="addProduct" @submit.prevent="addProduct">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Product name"
                v-model="newProduct.name"
                required
              />
            </div>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="price">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="Product price"
                  v-model="newProduct.price"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="weight">Weight</label>
                <input
                  type="number"
                  class="form-control"
                  id="weight"
                  placeholder="Product weight"
                  v-model="newProduct.weight"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="qtyRange">QTY Range</label>
                <input
                  type="number"
                  class="form-control"
                  id="qtyRange"
                  placeholder="Product quantity range"
                  v-model="newProduct.qtyRange"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="refLink">Product Link</label>
              <input
                type="url"
                class="form-control"
                id="refLink"
                placeholder="Product Link"
                v-model="newProduct.refLink"
              />
            </div>
            <div class="form-group">
              <label>Label</label>
              <b-form-select
                v-model="newProduct.label"
                :options="productLabelOption"
                class="mb-3"
                required
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>- select product label -</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class="form-group">
              <label for="refLink">Category</label>
              <b-form-select v-model="newProduct.categoryId" class="mb-3" required>
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-select product category-</b-form-select-option>
                </template>
                <b-form-select-option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >{{ category.categoryName }}</b-form-select-option>
              </b-form-select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <b-form-select
                v-model="newProduct.status"
                :options="productStatusOption"
                class="mb-3"
                required
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-select product status-</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class="form-group">
              <label>Product details</label>
              <ckeditor :editor="editor" v-model="newProduct.desc" :config="editorConfig"></ckeditor>
            </div>
            <mdb-btn color="primary" v-if="log.loading" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Please Wait...
            </mdb-btn>
            <mdb-btn v-else type="submit">Add Product</mdb-btn>
          </form>
        </mdb-modal-body>
      </mdb-modal>

      <mdb-modal size="lg" :show="editImageModal" @close="editImageModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Change Product Image</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <div
            id="my-strictly-unique-vue-upload-multiple-image"
            style="display: flex; justify-content: center;"
          >
            <vue-upload-multiple-image
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              @edit-image="editImage"
              :data-images="images"
              idUpload="myIdUpload"
              editUpload="myIdEdit"
            ></vue-upload-multiple-image>
          </div>
        </mdb-modal-body>
      </mdb-modal>

      <!-- EDIT MODAL -->
      <mdb-modal
        side
        position="bottom"
        fullHeight
        direction="bottom"
        :show="editModal"
        @close="editModal = false"
      >
        <mdb-modal-header>
          <mdb-modal-title>Edit Product</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form ref="editProduct" @submit.prevent="saveProduct">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Product name"
                v-model="editable.name"
                required
              />
            </div>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="price">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="Product price"
                  v-model="editable.price"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="weight">Weight</label>
                <input
                  type="number"
                  class="form-control"
                  id="weight"
                  placeholder="Product weight"
                  v-model="editable.weight"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="qtyRange">QTY Range</label>
                <input
                  type="number"
                  class="form-control"
                  id="qtyRange"
                  placeholder="Product quantity range"
                  v-model="editable.qtyRange"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="refLink">Product Link</label>
              <input
                type="url"
                class="form-control"
                id="refLink"
                placeholder="Product Link"
                v-model="editable.refLink"
              />
            </div>
            <div class="form-group">
              <label>Label</label>
              <b-form-select v-model="editable.label" :options="productLabelOption" class="mb-3">
                <template v-slot:first>
                  <b-form-select-option :value="editable.label" disabled>{{ editable.label }}</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class="form-group">
              <label for="refLink">Category</label>
              <b-form-select v-model="editable.categoryId" class="mb-3">
                <b-form-select-option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >{{ category.categoryName }}</b-form-select-option>
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>{{ selectedCategory }}</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <b-form-select v-model="editable.status" :options="productStatusOption" class="mb-3">
                <template v-slot:first>
                  <b-form-select-option :value="editable.status" disabled>{{ editable.status }}</b-form-select-option>
                </template>
              </b-form-select>
            </div>
            <div class="form-group">
              <label>Product details</label>
              <ckeditor :editor="editor" v-model="editable.desc" :config="editorConfig"></ckeditor>
            </div>
            <mdb-btn color="primary" v-if="log.loading" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Please Wait...
            </mdb-btn>
            <mdb-btn v-else type="submit">Save Changes</mdb-btn>
          </form>
        </mdb-modal-body>
      </mdb-modal>

      <mdb-modal size="lg" :show="editImageModal" @close="editImageModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Change Product Image</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <div
            id="my-strictly-unique-vue-upload-multiple-image"
            style="display: flex; justify-content: center;"
          >
            <vue-upload-multiple-image
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              @edit-image="editImage"
              :data-images="images"
              idUpload="myIdUpload"
              editUpload="myIdEdit"
            ></vue-upload-multiple-image>
          </div>
        </mdb-modal-body>
      </mdb-modal>
    </b-container>

    <Footer />
  </div>
</template>

<script>
import {
  mdbInput,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
} from "mdbvue";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
import Breadcrumb from "@/Components/userPage/Breadcrumb.vue";
import Footer from "@/Components/userPage/UserFooter.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "TableEditablePage",
  props: ["id", "users"],
  components: {
    mdbInput,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    VueUploadMultipleImage,
    Breadcrumb,
    Footer,
  },
  data() {
    return {
      baseURL: "http://ec2-34-202-157-59.compute-1.amazonaws.com:5000",
      render: false,
      breadcrumb: [
        {
          text: "Dashboard",
          href: "/admin/" + this.id + "/overview",
        },
        {
          text: "Products",
          href: "/admin/" + this.id + "/products",
        },
      ],
      editModal: false,
      editImageModal: false,
      addProductModal: false,
      selectedImage: [],
      images: [],
      editable: {},
      searchItem: "",
      products: [],
      categories: [],
      selectedCategory: "",
      filteredItems: [],
      paginatedItems: [],
      selectedItems: [],
      newProduct: {
        name: "",
        price: 0,
        weight: 0,
        qtyRange: 0,
        refLink: "",
        desc: "",
        label: "",
        status: "",
        categoryId: "",
      },
      productStatusOption: [
        { value: "In Stock", text: "In Stock" },
        { value: "Out Of Stock", text: "Out Of Stock" },
        { value: "Reserved", text: "Reserved" },
      ],
      productLabelOption: [
        {
          value: "Products Available in Our Nigerian Warehouse",
          text: "Products Available in Our Nigerian Warehouse",
        },
        { value: "Products On Preorders", text: "Products On Preorders" },
      ],
      pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 8,
        items: [],
        filteredItems: [],
      },
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
    };
  },
  created() {
    if (this.adminData.products.length > 0) {
      this.products = this.adminData.products;
      this.categories = this.adminData.category;
      this.$store.commit("RESET");
    }
  },
  watch: {
    editImageModal(value) {
      // this.$emit('onchange', value);
      if (value === false) this.images = [];
    },
    products(arrValue) {
      if (arrValue == undefined) {
        this.$store.commit("RE_RENDER");
      }
    },
  },
  computed: {
    ...mapState(["user", "log", "adminData"]),
  },
  ready() {
    this.filteredItems = this.products;
    this.buildPagination();
    this.selectPage(1);
  },
  methods: {
    ...mapActions(["getAllData"]),
    clearSearchItem() {
      this.searchItem = undefined;
      this.searchInTheList("");
    },
    searchInTheList(searchText, currentPage) {
      if (_.isUndefined(searchText)) {
        this.filteredItems = _.filter(this.products, function (v, k) {
          return !v.selected;
        });
      } else {
        this.filteredItems = _.filter(this.products, function (v, k) {
          return (
            !v.selected &&
            v.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
        });
      }
      this.filteredItems.forEach(function (v, k) {
        v.key = k + 1;
      });
      this.buildPagination();

      if (_.isUndefined(currentPage)) {
        this.selectPage(1);
      } else {
        this.selectPage(currentPage);
      }
    },
    buildPagination() {
      let numberOfPage = Math.ceil(
        this.filteredItems.length / this.pagination.itemPerPage
      );
      this.pagination.items = [];
      for (var i = 0; i < numberOfPage; i++) {
        this.pagination.items.push(i + 1);
      }
    },
    selectPage(item) {
      this.pagination.currentPage = item;

      let start = 0;
      let end = 0;
      if (this.pagination.currentPage < this.pagination.range - 2) {
        start = 1;
        end = start + this.pagination.range - 1;
      } else if (
        this.pagination.currentPage <= this.pagination.items.length &&
        this.pagination.currentPage >
          this.pagination.items.length - this.pagination.range + 2
      ) {
        start = this.pagination.items.length - this.pagination.range + 1;
        end = this.pagination.items.length;
      } else {
        start = this.pagination.currentPage - 2;
        end = this.pagination.currentPage + 2;
      }
      if (start < 1) {
        start = 1;
      }
      if (end > this.pagination.items.length) {
        end = this.pagination.items.length;
      }

      this.pagination.filteredItems = [];
      for (var i = start; i <= end; i++) {
        this.pagination.filteredItems.push(i);
      }

      this.paginatedItems = this.filteredItems.filter((v, k) => {
        return (
          Math.ceil((k + 1) / this.pagination.itemPerPage) ==
          this.pagination.currentPage
        );
      });
    },
    selectItem(item) {
      item.selected = true;
      this.selectedItems.push(item);
      this.searchInTheList(this.searchItem, this.pagination.currentPage);
    },
    removeSelectedItem(item) {
      item.selected = false;
      this.selectedItems.splice(item, 1);
      this.searchInTheList(this.searchItem, this.pagination.currentPage);
    },
    async editProduct(item) {
      this.editable = item;
      this.editModal = true;

      // get selected category
      let cat = await this.adminData.category.filter(
        (cn) => cn._id === item.categoryId
      );
      this.selectedCategory = cat[0].categoryName;
    },
    imageModal(item) {
      this.editImageModal = true;
      this.editable = item;
      // this.selectedImage.push(item.imageLinks);

      let objImages = item.imageLinks.map((value) => {
        return {
          path: value,
          default: 1,
          highlight: 1,
          caption: "caption to display. receive", // Optional
        };
      });
      this.images = objImages;
    },
    addProduct() {
      let token = localStorage.getItem("adminAccessToken");
      let payload = {
        name: this.newProduct.name,
        price: this.newProduct.price,
        weight: this.newProduct.weight,
        qtyRange: this.newProduct.qtyRange,
        refLink: this.newProduct.refLink,
        desc: this.newProduct.desc,
        label: this.newProduct.label,
        status: this.newProduct.status,
        categoryId: this.newProduct.categoryId,
      };
      this.$store
        .dispatch("addProduct", { token, payload })
        .then((data) => {
          this.newProduct = {
            name: "",
            price: 0,
            weight: 0,
            qtyRange: 0,
            refLink: "",
            desc: "",
            label: "",
            status: "",
            categoryId: "",
          };
          this.addProductModal = false;
          this.$store.commit("ADD_NEW_PRODUCT", data);
          this.makeToast("success", "New product added successfully!", true);
          this.$store.commit("RESET");
        })
        .catch((error) => {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", error.response.data.message, true);
        });
    },
    saveProduct() {
      let token = localStorage.getItem("adminAccessToken");
      let payload = {
        _id: this.editable._id,
        name: this.editable.name,
        price: this.editable.price,
        weight: this.editable.weight,
        qtyRange: this.editable.qtyRange,
        refLink: this.editable.refLink,
        desc: this.editable.desc,
        label: this.editable.label,
        status: this.editable.status,
        categoryId: this.editable.categoryId,
      };

      this.$store
        .dispatch("updateProduct", { token, payload })
        .then(() => {
          this.editModal = false;
          this.makeToast("success", "Product was updated successfully!", true);
          this.$store.commit("RESET");
        })
        .catch((error) => {
          this.makeToast("danger", error.response.data.message, true);
          this.$store.commit("logServerErr", error.response.data.message);
        });
    },

    deleteProduct(item) {
      let token = localStorage.getItem("adminAccessToken");
      let r = confirm(`Are you sure you want to delete : ${item.name}?`);
      if (r == true) {
        this.$store
          .dispatch("deleteProduct", { token, item })
          .then((data) => {
            console.log(data);
            let payload = {
              products: data.products,
            };
            this.$store.commit("UPDATE_PRODUCTS", payload);
            this.products = payload.products;
            this.makeToast("success", "Product has been deleted!", true);
            this.$store.commit("RESET");
          })
          .catch((error) => {
            console.log(error);
            this.makeToast("danger", error.response.data.message, true);
            this.$store.commit("logServerErr", error.response.data.message);
          });
      } else {
        this.makeToast("warning", "no changes made!", true);
      }
    },

    async uploadImageSuccess(formData, index, fileList) {
      console.log(fileList);
      // Upload image api
      try {
        let response = await axios.post(
          `${this.baseURL}/api/product/upload?index=${index}&id=${this.editable._id}`,
          formData
        );
        if (response.status === 200) {
          this.makeToast("success", "images was uploaded successfully", true);
          let payload = {
            products: response.data.products,
          };
          this.$store.commit("UPDATE_PRODUCTS", payload);
          this.products = payload.products;
        }
      } catch (error) {
        this.$store.commit("logServerErr", error.response.data.message);
        this.makeToast("danger", error.response.data.message, true);
      }
    },
    async beforeRemove(index, done, fileList) {
      // console.log('index', index, fileList)
      console.log(fileList);
      let r = confirm("remove image");
      if (r == true) {
        try {
          let response = await axios.delete(
            `${this.baseURL}/api/product/upload?index=${index}&id=${this.editable._id}`
          );
          if (response.status === 200) {
            this.makeToast("success", "images was deleted successfully", true);
            let payload = {
              products: response.data.products,
            };
            this.$store.commit("UPDATE_PRODUCTS", payload);
            this.products = payload.products;
          }
        } catch (error) {
          this.$store.commit("logServerErr", error.response.data.message);
          this.makeToast("danger", error.response.data.message, true);
        }
        done();
      } else {
        this.makeToast("warning", "no changes made!", true);
      }
    },
    async editImage(formData, index, fileList) {
      // console.log('edit data', formData, index, fileList);
      let oldImages = [];
      fileList.forEach((image) => {
        oldImages.push(image.path);
      });

      try {
        let response = await axios.patch(
          `${this.baseURL}/api/product/upload?index=${index}&id=${this.editable._id}&oldImages=${oldImages}`,
          formData
        );
        if (response.status === 200) {
          this.makeToast("success", "images updated successfully", true);
          oldImages = [];
          this.images = [];
          this.editImageModal = false;
          let payload = {
            products: response.data.products,
          };
          this.$store.commit("UPDATE_PRODUCTS", payload);
          this.products = payload.products;
        }
      } catch (error) {
        this.$store.commit("logServerErr", error.response.data.message);
        this.makeToast("danger", error.response.data.message, true);
      }
    },
    makeToast(variant = null, msg, append = false) {
      let color = "";
      switch (variant) {
        case "success":
          color = "#a0e689";
          break;
        case "danger":
          color = "#ff5555";
          break;
        case "warning":
          color = "#f3c744";
          break;

        default:
          color = "#649aff";
          break;
      }
      // Create the title
      const h = this.$createElement;
      const template = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline"] },
        [
          h("b-img", {
            class: "mr-2",
            style: `background-color: ${color}; width: 12px; height: 12px;`,
          }),
          h("strong", { class: "mr-auto" }, "Notice!"),
          h(
            "small",
            { class: "text-muted mr-2" },
            `${new Date().getSeconds()} seconds ago`
          ),
        ]
      );
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: template,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>
<style>
.tag:not(body).is-dark {
  color: #fff !important;
}
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.image:hover {
  cursor: pointer;
  opacity: 0.5;
}
.image:before {
  content: "";
  background: url("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSj3XfIpf-OOJRCcWz4iN2CU3qMKVVbj0p0bRvKNGVo1U9pk_8ZIlyR8pWreA");
  background-size: cover;
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: -10px;
}
.divHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
}
.action {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
}
.box {
  overflow: overlay;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>