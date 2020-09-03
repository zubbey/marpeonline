<template>
  <div>
    <div :class="cClass">
      <div class="cart-menu">
        <div class="d-flex justify-content-between pt-4">
          <h5>
            <b>Cart</b>
          </h5>
          <button class="btn btn-outline-light btn-sm" @click.prevent="emptyCart()">
            <i class="fa fa-remove"></i> Empty
          </button>
        </div>
        <hr />

        <transition name="fade" tag="div">
          <div
            v-if="cart.length < 0"
            class="text-center font-italic"
          >Your cart is empty, try to Add stuff.</div>
        </transition>

        <!-- <transition-group name="fade" tag="b-row"> -->
        <b-row v-for="(item, index) in cart" :key="index" class="p-3">
          <b-col cols="10">
            <img :src="item.product.thumbnail" width="100" class="mb-4" />
            <h6>{{ item.product.name }}</h6>
            <h6 class="bold">Qty: {{ item.qty }}</h6>
            <div class="d-flex justify-content-between align-items-baseline">
              <h6 class="text-white" v-if="d_to_n">
                Price:
                <b>{{ convertCurrency(item.totalprice) | toCurrency }}</b>
              </h6>
              <h6 class="text-white" v-else>
                Price:
                <b>{{ calculateItemTotal(item.product.price, item.qty) | toCurrency }}</b>
              </h6>
              <div class="control">
                <button
                  class="decrement-button"
                  @click="dec(item.product._id, item._id)"
                  style="border: .5px solid white;background:none;color:white;"
                >−</button>
                <div class="px-2">{{itemQty(item.product._id)}}</div>
                <button
                  class="increment-button"
                  @click="inc(item.product._id, item._id)"
                  style="border: .5px solid white;background:none;color:white;"
                >+</button>
                <br />
                <br />
              </div>
            </div>
          </b-col>
          <b-col cols="2">
            <span class="remove-btn" @click.prevent="removeCartItem(item.product)">remove</span>
          </b-col>
          <hr />
        </b-row>
        <!-- </transition-group> -->

        <div
          class="row justify-content-between"
          style="background:rgb(0 0 0 / 24%);padding:10px 10px 10px 10px"
          v-if="cart.length > 0"
        >
          <div class="flex-column pl-3">
            <h4>Total</h4>
          </div>
          <div class="flex-column pr-3">
            <h4 v-if="d_to_n">
              <b>{{ convertCurrency(totalItemPrice) | toCurrency }}</b>
            </h4>
            <h4 v-else>
              <b>{{ totalItemPrice | toCurrency }}</b>
            </h4>
          </div>
        </div>
        <transition tag="button" name="fade" v-if="cart.length > 0">
          <router-link to="/checkout" class="btn btn-primary btn-lg btn-block text-white">
            <b-icon icon="cart-check"></b-icon>Checkout
          </router-link>
        </transition>
      </div>
    </div>

    <div :class="modalClass" @click="cartON"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      quan: 1,
      cClass: "cart",
      modalClass: "modal off",
    };
  },
  computed: {
    ...mapState(["cart", "user", "currency", "settings", "d_to_n"]),
    ...mapGetters(["totalItemPrice"]),
  },
  methods: {
    ...mapActions(["removeCartItem"]),
    emptyCart() {
      let accessToken = localStorage.getItem("accessToken");
      let guest_id = localStorage.getItem("guest_id");

      if (!accessToken && guest_id) {
        this.$store
          .dispatch("emptyCart", guest_id)
          .then(() => this.$store.commit("EMPTY_CART"));
      } else if (accessToken) {
        this.$store
          .dispatch("emptyCart", this.$store.state.user._id)
          .then(() => this.$store.commit("EMPTY_CART"));
      }
    },
    cartON() {
      if (this.cClass === "cart on") {
        this.cClass = "cart";
        this.modalClass = "modal off";
      } else {
        this.cClass = "cart on";
        this.modalClass = "modal";
      }
    },
    calculateItemTotal(price, qty){
      return price * qty
    },
    inc(productId, cartId) {
      // Info box Incrememnt button
      if (this.itemQty(productId) <= 100) {
        let payload = {
          _id: cartId,
          action: "increment"
        };

        this.$store
          .dispatch("updateProductQty", payload)
          .then(() => {
            this.$store.commit("INC", productId);
          })
          .catch((err) =>
            this.$store.commit("logServerErr", err.response.data.message)
          );
      }
    },
    dec(productId, cartId) {
      // Decrememnt button
      if (this.itemQty(productId) >= 2) {
        let payload = {
          _id: cartId,
          action: "decrement"
        };

        this.$store
          .dispatch("updateProductQty", payload)
          .then(() => {
            this.$store.commit("DEC", productId);
          })
          .catch((err) =>
            this.$store.commit("logServerErr", err.response.data.message)
          );
      }
    },
    itemQty(productId) {
      let product = this.cart.filter((item) => item.product._id === productId);
      if (product.length > 0) return product[0].qty;
      else return 1;
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
/* Modal Overlay */
.modal {
  display: block;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal.off {
  display: none;
}
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.control {
  display: flex;
  align-items: flex-start;
}
.control:hover {
  cursor: pointer;
}
/* Cart Body */
.cart {
  position: fixed;
  margin-right: 0px;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: #401821;
  overflow-y: auto;
  z-index: 10000;
  -webkit-overflow-scrolling: touch;
  transform: translateX(360px);
  transition-property: transform;
  transition-duration: 0.4s;
}
.cart.on {
  transform: translateX(0);
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart-menu {
  color: #eee;
  margin-left: 10px;
  margin-right: 15px;
}

hr {
  border-color: rgba(255, 255, 255, 0.3);
}

.row {
  margin-top: 10px;
  margin-bottom: 10px;
}

.remove-btn {
  border-radius: 50%;
  content: url("../assets/multiply.png");
}

.remove-btn:hover {
  background-color: grey;
}
.btn-primary.focus,
.btn-primary:focus {
  color: #fff !important;
}
.btn-primary:not([disabled]):not(.disabled):active,
.btn-primary:not([disabled]):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
  background-color: rgb(255 255 255 / 5%) !important;
}
</style>
