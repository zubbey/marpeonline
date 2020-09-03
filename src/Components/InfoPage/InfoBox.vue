<template>
  <div>
    <content-placeholders :rounded="true" v-if="product == null">
      <content-placeholders-img />
      <content-placeholders-heading />
    </content-placeholders>
    <div class="row mb-5 bg-white rounded p-5" v-for="item in product" :key="item._id">
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div v-viewer="viewerOptions">
          <img
            class="img-fluid imgSingle"
            :src="activeImage || item.imageLinks[0]"
            :data-href="item.thumbnail"
          />
          <img
            class="imgArray d-none"
            v-for="(image, index) in item.imageLinks"
            :src="image"
            :key="index"
            :data-href="image"
          />
        </div>
        <div style="overflow: scroll" class="my-4 d-flex justify-content-between">
          <img
            class="imgArray"
            v-for="(image, index) in item.imageLinks"
            :src="image"
            :key="index"
            :id="'image_'+index"
            :data-href="image"
            :alt="image"
            @click="setActiveImage(item, index)"
          />
        </div>
      </div>

      <div
        class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start"
      >
        <div class="info pt-xl-0 pt-lg-0 pt-5">
          <!-- <span class="float-left pr-3">★★★★★</span><h6 style="width:190px;">3 reviews</h6> -->
          <h4 class="font-weight-bold text-capitalize">{{ item.name }}</h4>
          <h6>Category: 
            <router-link class="text-primary" :to="{name: 'Category', params: {id: getCategoryName(item.categoryId)}}">
                {{ getCategoryName(item.categoryId) }}
            </router-link>
          </h6>
          <div v-if="is1688Product(item.label)">
            <h5>{{ item.label }}</h5>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Weight</th>
                  <th scope="col">Qty Range</th>
                  <th scope="col">Product Link</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ item.weight }} kg</td>
                  <td>{{ item.qtyRange }}</td>
                  <td>
                    <a :href="item.refLink" target="_blank">View product link</a>
                  </td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 style="color: #ea5376" v-if="d_to_n">{{ convertCurrency(item.price) | toCurrency}}</h4>
          <h4 style="color: #ea5376" v-else>{{ item.price | toCurrency}}</h4>
          <br />
          <div v-if="isNigeriaProduct(item.label)">
            <h5>{{ item.label }}</h5>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col" v-show="item.weight > 0">Weight</th>
                  <th scope="col">Qty Range</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-show="item.weight > 0">{{ item.weight }} kg</td>
                  <td>{{ item.qtyRange }}</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
            <div class="card">
              <div class="card-body">
                <p>
                  <i class="fa fa-bullhorn"></i> This product is available in our Nigeria warehouse and can be shipping to all parts of Nigeria within 1 to 5days.
                </p>
              </div>
            </div>
          </div>
          <br />
          <div class="control number text-center">
            <button
              class="decrement-button"
              @click="dec()"
              style="border-right: 0.2px solid lightgrey;float:left;margin-right: 11px;"
            >−</button>
            <div v-if="inCart(item._id)">{{ itemQty(item._id) }}</div>
            <span v-else>{{ quan }}</span>
            <button
              class="increment-button"
              @click="inc()"
              style="border-left: 0.2px solid lightgrey;margin-left: 16px;"
            >+</button>
            <br />
            <br />
          </div>
          <div class="d-flex">
            <b-button v-if="inCart(item._id)" disabled type="button" variant="primary">
              Added
              <b-icon icon="check2-circle"></b-icon>
            </b-button>
            <b-button v-else variant="primary mr-3" @click="addtoCart(item)">
              <b-icon icon="cart3"></b-icon>Add to Cart
            </b-button>
            <b-button variant="outline" @click="addtoWishList(item)">
              <b-icon icon="heart"></b-icon>Add to Wishlist
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["product"],
  name: "InfoBox",
  data() {
    return {
      quan: 1,
      activeImage: "",
      isActive: false,
      viewerOptions: {
        movable: false,
        rotatable: false,
        scalable: false,
        url: "data-href",
        title(image) {
          return image.alt;
        },
      },
    };
  },
  mounted() {
    // console.log('cart: ' + JSON.stringify(this.getCartId('5f4843c97acea4408089bc39')));
  },
  computed: {
    ...mapState(["settings", "d_to_n", "cart", "user", "categories"]),
  },

  methods: {
    ...mapActions(["addToCart", "addtoWishList"]),
    // ...mapGetters(["getCategoryName"]),
    getCategoryName(id){
      let cat = this.categories.filter(category => category._id === id);
      return cat[0].categoryName;
    },
    setActiveImage(item, index) {
      return (this.activeImage = item.imageLinks[index]);
    },
    isNigeriaProduct(label) {
      if (label === "Products Available in Our Nigerian Warehouse") {
        return true;
      }
    },
    is1688Product(label) {
      if (label === "Products On Preorders") {
        return true;
      }
    },
    inc() {
      // Info box Incrememnt button
      if (this.inCart) {
        if (this.itemQty(this.product[0]._id) <= 100) {
          let payload = {
            _id: this.getCartId(this.product[0]._id),
            action: "increment",
          };

          this.$store
            .dispatch("updateProductQty", payload)
            .then(() => {
              this.$store.commit("INC", this.product[0]._id);
            })
            .catch((err) =>
              this.$store.commit("logServerErr", err.response.data.message)
            );
        }
      } else {
        if (this.quan <= 100) return this.quan++;
      }
    },
    dec() {
      // Info box Decrememnt button
      if (this.inCart) {
        if (this.itemQty(this.product[0]._id) >= 2) {
          let payload = {
          _id: this.getCartId(this.product[0]._id),
          action: "decrement"
        };

        this.$store
          .dispatch("updateProductQty", payload)
          .then(() => {
            this.$store.commit("INC", this.product[0]._id);
          })
          .catch((err) =>
            this.$store.commit("logServerErr", err.response.data.message)
          );
        }
      } else {
        if (this.quan >= 2) return this.quan--;
      }
    },
    itemQty(productId) {
      let product = this.cart.filter((item) => item.product._id === productId);
      if (product.length > 0) return product[0].qty;
      else return 1;
    },
    inCart(productId) {
      let added = this.cart.filter((item) => item.product._id === productId);
      if (added.length > 0) return true;
      else return false;
    },
    getCartId(productId) {
      let cart = this.cart.filter(item => item.product._id === productId);
      return cart[0]._id;
    },
    addtoCart(product) {
      if (
        !localStorage.getItem("accessToken") &&
        localStorage.getItem("guest_id")
      ) {
        this.addToCart({
          product: product,
          qty: this.quan,
          totalprice: product.price * this.quan,
          user: {
            _id: localStorage.getItem("guest_id"),
            name: "Guest",
          },
        });
        // .then(success => {

        // });
      } else if (localStorage.getItem("accessToken")) {
        // if()
        this.addToCart({
          product: product,
          qty: this.quan,
          totalprice: product.price * this.quan,
          user: {
            _id: this.$store.state.user._id,
            email: this.$store.state.user.email,
            name: this.$store.getters.fullname,
          },
        });
      }
    },

    addtoWishList(product) {
      console.log(product);
    },

    convertCurrency(amount) {
      // convert amount to dollar
      let d = this.settings.rates[0].d_to_n;
      return Math.round((amount * 1000) / d / 1000);
    },
  },
};
</script>

<style scoped>
.text-primary{
  color: #ea5376 !important;
}
.text-primary:hover{
  color: #a03c53 !important;
}
.img-fluid {
  min-width: 90% !important;
  border: 1px solid #eee !important;
}
img.imgSingle {
  cursor: pointer;
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 6px;
  object-fit: cover;
}
img.imgArray {
  width: 100px;
  height: 100px;
  object-fit: cover;
  transition: all 100ms ease;
}
img.imgArray:hover {
  border: 3px solid #ea5376;
  transition: all 100ms ease;
}
.active {
  border: 3px solid #ea5376;
}
.control.number {
  border: 0.2px solid lightgrey;
  font-size: 19px;
  font-weight: bold;
  height: 35px;
  width: 200px;
  margin-bottom: 30px;
}
.control.number button {
  border: none;
  background: inherit;
  width: 56px;
  height: 35px;
  outline-style: none;
}
.control.number button:active {
  background-color: lightgrey;
}
.control.number h5 {
  margin-left: 13px;
  margin-right: 13px;
}
.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  background-color: #2c3539;
  color: #fff;
  font-size: 15px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.add-to-cart-button:hover,
.add-to-cart-button:focus {
  background-color: inherit;
  color: black;
}
.vue-content-placeholders-img {
  height: 320px;
}
</style>
