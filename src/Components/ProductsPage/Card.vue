<template>
  <div>
    <transition-group name="fade" class="row row-cols-1 row-cols-sm-2 row-cols-md-4" tag="div">
      <div
        v-for="product in CardArray"
        class="col pb-3 card-col"
        :style="cardColumn"
        :key="product._id"
      >
        <router-link :to="{name: 'Product', params: {id: product.slug}}">
          <div class="card m-1">
            <b-img-lazy
              v-bind="mainProps"
              :src="product.thumbnail"
              alt="Card image"
              style="margin-bottom: 0 !important; margin-top: 0 !important;"
            ></b-img-lazy>
            <div class="card-body product-card text-left">
              <h6 class="card-title">{{ product.name | truncate(15, '...')}}</h6>
              <h4 class="card-text color-primary">
                <strong v-if="d_to_n">{{convertCurrency(product.price) | toCurrency }}</strong>
                <strong v-else>{{product.price | toCurrency }}</strong>
              </h4>
            </div>
          </div>
        </router-link>
        <b-collapse id="collapse-2" class="show">
          <b-button v-if="inCart(product._id)" disabled type="button" variant="primary">
            Added <b-icon icon="check2-circle"></b-icon>
          </b-button>
          <b-button v-else type="button" variant="primary" @click="addtoCart(product)">
            <b-icon icon="cart3"></b-icon>Add to Cart
          </b-button>
        </b-collapse>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["CardArray", "cardColumn"],
  name: "Card",
  data() {
    return {
      converted: null,
      currency: "",
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 600,
        height: 400,
        class: "my-5",
      },
    };
  },
  mounted() {
    this.currency = this.currencyType.currency;
  },
  computed: {
    ...mapState(["currencyType", "user", "cart", "settings", "d_to_n"]),
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
          totalprice: product.price,
          user: {
            _id: localStorage.getItem("guest_id"),
            name: "Guest",
          },
        });
      } else if (localStorage.getItem("accessToken")) {
        // if()
        this.addToCart({
          product: product,
          qty: 1,
          totalprice: product.price,
          user: {
            _id: this.$store.state.user._id,
            email: this.$store.state.user.email,
            name: this.$store.getters.fullname,
          },
        });
      }
    },
    inCart(productId){
      let added = this.cart.filter(item => item.product._id === productId);
      if(added.length > 0) return true;
      else return false
    },
    //convert price of product base on selected currency
    convertCurrency(amount) {
      // convert amount to dollar
      let d = this.settings.rates[0].d_to_n;
      return Math.round((amount * 1000) / d / 1000);
    },
  },
};
</script>

<style scoped>
/* default primary color */
.btn {
  margin: 0 !important;
}
.color-primary {
  color: #ea5376 !important;
}
/* transition Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  padding: 10px;
  cursor: pointer;
  transition: 100ms;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  border: none;
}

.card img {
  z-index: 1;
  height: 150px;
  object-fit: fill;
  -o-object-fit: fill;
  -webkit-object-fit: fill;
  transition: all 200ms ease;
}
.card-col:hover .card img {
  height: 120px;
  object-fit: cover;
  -o-object-fit: cover;
  -webkit-object-fit: cover;
  transition: all 200ms ease;
}
.card-col .show{
  opacity: 0;
  transition: all 2s ease;
}
.card-col:hover .show {
  display: block !important;
    transition: all 2s ease;
  z-index: 1000;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  opacity: 1;
}
.card-body {
  padding: 1.25rem 0 0 0 !important;
}

.card button {
  width: 100%;
}

.card:hover,
.card:active {
  transform: scale(1.005);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.025), 0 0px 20px rgba(0, 0, 0, 0.025);
}
.col,
.col-1,
.col-10,
.col-11,
.col-12,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-auto,
.col-lg,
.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-auto,
.col-md,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-auto,
.col-sm,
.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-auto,
.col-xl,
.col-xl-1,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-auto {
  padding: 5px !important;
}
@media (min-width:320px){
  .card{
    padding: 20 !important;
  }
  .card img {
    height: 200px !important;
  }
}
@media only screen and (min-device-width: 480px) {
  .card img {
    height: 200px !important;
  }
  .card{
    padding: 20 !important;
  }
}
@media only screen and (min-device-width: 768px) {
  .card img {
    height: 200px !important;
  }
  .card{
    padding: 20 !important;
  }
}
</style>
