<template>
  <div>
    <content-placeholders :rounded="true" v-if="product == null">
      <content-placeholders-img />
      <content-placeholders-heading />
    </content-placeholders>
    <div class="row mb-5 bg-white rounded p-5" v-for="item in product" :key="item._id">
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div  v-viewer="viewerOptions">
        <img class="img-fluid imgSingle" :src="activeImage || item.imageLinks[0]" :data-href="item.thumbnail" >
          <img class="imgArray d-none" v-for="(image, index) in item.imageLinks" :src="image" :key="index" :data-href="image">
        </div>
        <div style="overflow: scroll" class="my-4 d-flex justify-content-between">
          <img class="imgArray" v-for="(image, index) in item.imageLinks" :src="image" :key="index" :id="'image_'+index" :data-href="image" :alt="image" @click="setActiveImage(item, index)">
        </div>
      </div>

      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
        <div class="info pt-xl-0 pt-lg-0 pt-5">
          <!-- <span class="float-left pr-3">★★★★★</span><h6 style="width:190px;">3 reviews</h6> -->
          <h4 class="font-weight-bold text-capitalize">{{ item.name }}</h4>
          <div v-if="is1688Product(item.label)" >
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Weight</th>
                    <th scope="col">Qty Range</th>
                    <th scope="col">Product Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ item.weight }} kg</td>
                    <td>{{ item.qtyRange }}</td>
                    <td><a :href="item.refLink" target="_blank">View on 1688</a></td>
                  </tr>
                </tbody>
            </table>
          </div>
          <h4 style="color: #ea5376">{{ item.price | toCurrency}}</h4>
          <br>
          <div v-if="isNigeriaProduct(item.label)">
            <h5>Ship: From Nigeria</h5>
            <div class="card">
              <div class="card-body">
                <p><i class="fa fa-bullhorn"></i> This product is available in our Nigeria warehouse and can be ship to all parts of Nigeria within 1 to 5days.</p>
              </div>
            </div>
          
          </div>
          <br>
          <div class="control number text-center">
            <button class="decrement-button" @click="dec" style="border-right: 0.2px solid lightgrey;float:left;margin-right: 11px;">−</button>
            <span>{{ quan }}</span>
            <button class="increment-button" @click="inc" style="border-left: 0.2px solid lightgrey;margin-left: 16px;">+</button>
            <br><br>
          </div>
          <div class="d-flex">
            <b-button variant="primary mr-3" @click="addtoCart(item)"><b-icon icon="cart3"></b-icon> Add to Cart</b-button>
            <b-button variant="outline" @click="addtoWishList(item)"><b-icon icon="heart"></b-icon> Add to Wishlist</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['product'],
  name: 'InfoBox',
  data() {
    return {
      quan: 1,
      activeImage: '',
      isActive: false,
      viewerOptions: {
        movable: false,
        rotatable: false,
        scalable: false,
        url: 'data-href',
        title(image) {
          return image.alt
        }
      }
    }
  },

  methods:{
    setActiveImage(item, index){
      return this.activeImage = item.imageLinks[index];
    },
    isNigeriaProduct(label){
      if(label === 'Products Available in Our Nigerian Warehouse'){
        return true
      }
    },
    is1688Product(label){
      if(label === 'Featured Products from 1688'){
        return true
      }
    },
    inc() { // Info box Incrememnt button
      if (this.quan <= 100 )
       return this.quan ++
    },
    dec() { // Info box Decrememnt button
      if (this.quan >= 2)
       return this.quan --
    },
    ...mapActions(['addToCart', 'addtoWishList']),

    addtoCart(product) {
      if (
        !localStorage.getItem("accessToken") &&
        localStorage.getItem("guest_id")
      ) {
        this.addToCart({
          product: product,
          qty: this.quan,
          user: {
            _id: localStorage.getItem("guest_id"),
            name: "Guest"
          }
        })
        // .then(success => {
          
        // });
      } else if (localStorage.getItem("accessToken")) {
        // if()
        this.addToCart({
          product: product,
          qty: this.quan,
          user: {
            _id: this.$store.state.user._id,
            email: this.$store.state.user.email,
            name: this.$store.getters.fullname
          }
        });
      }
    },

    addtoWishList(product) {
      this.addtoWishList({
        product: product,
        qty: this.quan
      })
    }
  }
}

</script>

<style scoped>
.img-fluid{
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
img.imgArray:hover{
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
.control.number button{
  border:none;
  background: inherit;
  width: 56px;
  height: 35px;
  outline-style: none;
}
.control.number button:active{
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
.add-to-cart-button:hover, .add-to-cart-button:focus {
  background-color: inherit;
  color: black;
}
.vue-content-placeholders-img{
  height: 320px;
}
</style>
