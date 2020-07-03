<template>
  <div>
    <transition-group name="fade" class="row" tag="div">
      <div
        v-for="product in CardArray"
        :style="cardColumn"
        class="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3"
        :key="product._id"
      >
        <div class="card m-1">
          <img class="card-img-top" :src="product.thumbnail" alt="Card image cap" />
          <div class="overlay">
            <b-button type="button" variant="primary" @click="addtoCart(product)">
              <b-icon icon="cart3"></b-icon> Add to Cart
            </b-button>
            <router-link :to="{name: 'Product', params: {id: product.slug}}">
              <b-button type="button" variant="outline">View Product</b-button>
            </router-link>
          </div>
          <div class="card-body product-card">
            <h6 class="card-title">{{ product.name }}</h6>
            <p class="card-text color-primary">
              <strong>{{ product.price | toCurrency }}</strong>
            </p>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["CardArray", "cardColumn"],
  name: "Card",
  mounted() {
  },
  computed: {
    ...mapState(["currency", "user", "cart"])
  },
  methods: {
    ...mapActions(["addToCart"]),
    addtoCart(product) {
      if (
        !localStorage.getItem("accessToken") &&
        localStorage.getItem("guest_id")
      ) {
        this.addToCart({
          product: product,
          qty: 1,
          user: {
            _id: localStorage.getItem("guest_id"),
            name: "Guest"
          }
        });
      } else if (localStorage.getItem("accessToken")) {
        // if()
        this.addToCart({
          product: product,
          qty: 1,
          user: {
            _id: this.$store.state.user._id,
            name: this.$store.getters.fullname
          }
        });
      }
    }
  }
};
</script>

<style>
/* default primary color */

.color-primary {
  color: #ea5376 !important;
}
/* transition Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  border: none;
}

.card img {
  z-index: 1;
  height: 200px;
  object-fit: fill;
  -o-object-fit: fill;
  padding: 15px;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

.card:hover img,
.card:hover .product-card {
  filter: blur(40px);
}

.card:hover .overlay {
  opacity: 1;
}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.493);
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover,
.card:active {
  transform: scale(1.005);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.025), 0 0px 20px rgba(0, 0, 0, 0.025);
}
.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto{
  padding: 5px !important;
}
</style>
