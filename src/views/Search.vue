<template >
  <div>
    <Searchheader />
    <mdb-container class="my-lg-5">
      <mdb-row>
        <mdb-col class="pb-4">
          <div class="lead">
            <strong>Found {{searchedResult.length}} products for {{this.$route.query.q}}</strong>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="4">
          <div class="card-selector mr-3">
            <div class="card-body p-4 bg-white rounded">
              <div class="search-title">
                <h4>Catagories +</h4>
                <br />
                <content-placeholders v-if="log.loading">
                  <content-placeholders-text :lines="3" />
                </content-placeholders>
                <p v-for="category in categories" :key="category._id">
                  <router-link :to="{name: 'Category', params: {id: category.categoryName}}">
                    {{ category.categoryName }}
                    ({{ category.items }})
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </mdb-col>
        <mdb-col md="8">
          <section class="container">
            <b-row>
              <b-col>
                <transition-group v-if="searchedResult.length > 0" name="fade" tag="div">
                  <div class="card mb-2" v-for="product in searchedResult" :key="product._id">
                    <div class="row">
                      <div class="col-md-4">
                        <b-img-lazy
                          v-bind="mainProps"
                          :src="product.thumbnail"
                          alt="Image"
                          class="w-100"
                        ></b-img-lazy>
                      </div>
                      <div class="col-md-8 p-3">
                        <div class="card-block px-3">
                          <h4 class="card-title">
                            <router-link
                              :to="{name: 'Product', params: {id: product.slug}}"
                            >{{product.name}}</router-link>
                          </h4>
                          <p class="card-text">
                            <strong>{{ product.price | toCurrency }}</strong>
                          </p>
                          <b-button type="button" variant="primary" @click="addtoCart(product)">
                            <b-icon icon="cart3"></b-icon>
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition-group>
                <div v-else>
                  <p
                    style="font-size: 1.5em !important;"
                    class="text-muted text-center"
                    v-if="!log.loading"
                  >Sorry, we can't find a product with the name {{ this.$route.query.q }}</p>
                </div>
              </b-col>
            </b-row>
          </section>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <Footer :categories="categories" />
  </div>
</template>

<script>
import Searchheader from "@/Components/Searchheader.vue";
import Footer from "@/Components/Footer.vue";
import Loading from "@/Components/Loading.vue";
import { mapState, mapActions } from "vuex";
import { mdbContainer, mdbRow, mdbCol } from "mdbvue";

export default {
  name: "Category",
  props: ["id"],
  components: {
    Searchheader,
    Footer,
    Loading,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 50,
        height: 50,
        class: "",
      },
      searchedResult: [],
      options: [],
    };
  },
  created() {
    let searchQuery = new String(this.$route.query.q);

    if (searchQuery.length > 3) {
      this.$store.dispatch("getSearchedKeyword", searchQuery).then((data) => {
        this.searchedResult = data;
        this.$store.commit("RESET");
      });
    }
  },
  watch: {
    "$route.query.q": function () {
      this.$store
        .dispatch("getSearchedKeyword", this.$route.query.q)
        .then((data) => {
          this.searchedResult = data;
          this.$store.commit("RESET");
        });
    },
  },
  computed: {
    ...mapState([
      "settings",
      "cart",
      "log",
      "productsInNigeria",
      "productsIn1688",
      "categories",
    ]),
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
  },
};
</script>

<style scoped>
a {
  color: #333 !important;
}
.text-primary {
  color: #ea5376 !important;
}
.card {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 0%), 0 2px 10px 0 rgb(0 0 0 / 3%) !important;
}
.bg-white.col-md-4 {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 0%), 0 2px 10px 0 rgb(0 0 0 / 3%) !important;
}
hr {
  width: 100%;
  border-bottom: 1px solid black;
}
.related-item {
  padding-left: 8rem;
  padding-right: 8rem;
  height: auto;
  text-align: center;
}
</style>
