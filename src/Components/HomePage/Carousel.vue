<template>
  <div>
    <section>
      <lazy-component v-if="load">
        <img
          class="mini-cover"
          src="https://placehold.it/1321x583"
          width="100%"
          height="400"
        />
      </lazy-component>
      <mdb-carousel
        :items="banner"
        :interval="5000"
        controlls
        indicators
      ></mdb-carousel>
    </section>
    <section class="search-sec">
      <div class="container">
        <form @submit.prevent="searchEntered()" >
          <div class="row">
            <div class="col">
              <input
                type="search"
                class="form-control"
                @keydown="searchKeyword()"
                v-model="keyword"
                ref="keyword"
                placeholder="Search Marpe Product eg: mobile phone"
              />
              <transition-group v-if="searchedResult.length > 0" name="fade" tag="div" class="resultRow bg-white mt-lg-5" style="position: absolute;">
                <b-card v-for="product in searchedResult" :key="product._id" no-body class="overflow-hidden mb-3" style="box-shadow: none !important">
                  <router-link :to="{name: 'Product', params: {id: product.slug}}">
                    <b-row no-gutters class="p-4">
                      <b-col md="1">
                        <b-img-lazy v-bind="mainProps" :src="product.thumbnail" alt="Image" class="rounded-0" style="height: 50px; object-fit: contain;"></b-img-lazy>
                      </b-col>
                      <b-col md="8">
                        <b-card-body style="padding: 0 1.25rem;" :sub-title="product.name">
                        </b-card-body>
                      </b-col>
                    </b-row>
                  </router-link>
                  <hr class="my-2" />
                </b-card>
              </transition-group>
            </div>
            <div class="col-md-auto">
              <strong>
                <b-icon icon="search"></b-icon>
              </strong>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mdbCarousel } from "mdbvue";
import { mapState } from "vuex";
export default {
  name: "Carousel",
  props: ["categoryOption"],
  components: { mdbCarousel },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: 50,
        height: 50,
        class: ""
      },
      banner: [
        {
          src: 'https://placehold.it/1321x583',
          img: true
        }
      ],
      load: true,
      keyword: null,
      searchedResult: [],
      searchedCategory: null
    };
  },
  async created() {
    await this.$store.watch(
      state => {
        console.clear(state);
        return this.$store.state.settings; // could also put a Getter here
      },
      (newSettings, oldSettings) => {
        console.clear(oldSettings);
        //something changed do something
        this.banner = newSettings.homebanner;
        this.load = false;
      }
    );
    this.banner = await this.settings.homebanner;
      if(this.banner.length > 0){
        this.load = false;
    }
  },
  computed: {
    ...mapState(["log", "settings", "categories"])
  },
  methods: {
    searchKeyword(){
      if(this.$refs.keyword.value.length > 3){
        this.$store.dispatch('getSearchedKeyword', this.keyword)
        .then(data => {
          this.searchedResult = data;
          this.$store.commit('RESET');
        })
      }
    },

    searchEntered(){
      if(this.$refs.keyword.value.length > 3){
        this.$router.push({name: 'Search', query: {q: this.keyword}})
      }
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none !important;
}
.custom-select {
  border-color: #ea5376 !important;
}
.custom-select:focus {
  box-shadow: none !important;
}
.btn {
  margin: 0 !important;
}
.search-sec {
  padding: 2rem;
  z-index: 100;
}
.search-slt {
  display: block;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #55595c;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  height: calc(3rem + 2px) !important;
  border-radius: 0;
}
.resultRow{
    position: relative;
    top: 0px;
    z-index: 1000;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
}
.wrn-btn {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  text-transform: capitalize;
  height: calc(3rem + 2px) !important;
  border-radius: 0;
}
@media (min-width: 992px) {
  .search-sec {
    position: relative;
    /* top: -114px; */
    background: rgba(255, 255, 255);
  }
}

@media (max-width: 992px) {
  .search-sec {
    background: #1a4668;
  }
}

.img-fluid {
  min-width: 100% !important;
  height: 400px;
  object-fit: cover;
  object-position: top;
}

ol.carousel-indicators li {
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 30px;
  border: 0.6px solid black;
}

ol.carousel-indicators li.active {
  background: #dbf0fa;
}
</style>
