<template>
  <div>
    <div :class="cClass">
      <div class="cart-menu">
        <div class="d-flex justify-content-between pt-4">
            <h5><strong>Cart</strong></h5>
            <button class="btn btn-outline-light btn-sm" @click.prevent="emptyCart()"><i class="fa fa-remove"></i> Empty</button>
        </div>
        <hr>

        <transition name="fade" tag="div">
          <div v-if="cart.length < 0" class="text-center font-italic">
            Your cart is empty, try to Add stuff.
          </div>
        </transition>

        <!-- <transition-group name="fade" tag="b-row"> -->
          <b-row v-for="(item, index) in cart" :key="index" class="p-3">
            <b-col cols="10">
              <img :src="item.product.thumbnail" width="100" class="mb-4">
              <h6>{{ item.product.name }}</h6>
              <h6 class="bold">Qty: {{ item.qty }}</h6>
              <h6 class="color-primary">Price: <strong>{{ item.product.price | toCurrency }}</strong></h6>
            </b-col>
            <b-col cols="2">
              <span class="remove-btn" @click.prevent="removeCartItem(item.product)">remove</span>
            </b-col>
            <hr>
          </b-row>
        <!-- </transition-group> -->

        <div class="row justify-content-between" style="background:rgba(91, 116, 136, 0.49);padding:10px 10px 10px 10px" v-if="cart.length > 0">
          <div class="flex-column pl-3">
            <h4>Total</h4>
          </div>
          <div class="flex-column pr-3">
            <h4><strong>{{ totalItemPrice | toCurrency }}</strong></h4>
          </div>
        </div>
        <transition tag="button" name="fade" v-if="cart.length > 0">
        <router-link to="/checkout" class="btn btn-primary btn-lg btn-block text-white"><b-icon icon="cart-check"></b-icon> Checkout</router-link>
        </transition>
      </div>
    </div>

    <div :class="modalClass" @click="cartON"></div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'Cart',
  data() {
    return {
      cClass: 'cart',
      modalClass: 'modal off',
    }
  },
  computed: {
    ...mapState(['cart', 'user', 'currency']),
    ...mapGetters(['totalItemPrice'])
  },
  methods: {
    ...mapActions(['removeCartItem']),
    emptyCart(){
      let accessToken = localStorage.getItem('accessToken');
      let guest_id = localStorage.getItem('guest_id');

      if(!accessToken && guest_id){
        this.$store.dispatch('emptyCart', guest_id)
        .then(() => this.$store.commit('EMPTY_CART'));
        
      } else if(accessToken){
        this.$store.dispatch('emptyCart', this.$store.state.user._id)
        .then(() => this.$store.commit('EMPTY_CART'));
      }
    },
    cartON() {
      if(this.cClass === 'cart on'){
        this.cClass = 'cart'
        this.modalClass = 'modal off'
      }else{
        this.cClass = 'cart on'
        this.modalClass = 'modal'
      }
    }
  }
}
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal.off {
  display: none;
}
/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
/* Cart Body */
.cart {
  position: fixed;
  margin-right: 0px;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: #401821;
  overflow-y: auto;
  z-index:10000;
  -webkit-overflow-scrolling: touch;
  transform: translateX(360px);
  transition-property: transform;
  transition-duration: 0.4s;
}
.cart.on{
  transform: translateX(0);
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart-menu{
  color: #eee;
  margin-left: 10px;
  margin-right: 15px;
}

hr {
border-color: rgba(255, 255, 255, 0.3);
}

.row{
  margin-top: 10px;
  margin-bottom: 10px;
}


.remove-btn{
  border-radius: 50%;
  content: url('../assets/multiply.png')
}

.remove-btn:hover {
  background-color: grey;
}
.btn-primary.focus, .btn-primary:focus{
  color: #FFF !important;
}
.btn-primary:not([disabled]):not(.disabled):active, .btn-primary:not([disabled]):not(.disabled).active, .show>.btn-primary.dropdown-toggle{
  background-color: rgb(255 255 255 / 5%) !important;
}
</style>
