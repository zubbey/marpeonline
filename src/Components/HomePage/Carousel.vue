<template>
  <div>
    <section>
      <lazy-component v-if="load">
        <img class="mini-cover" src="https://via.placeholder.com/3200x500.png?text=...." width="100%" height="400" />
      </lazy-component>
      <mdb-carousel :items="banner" :interval="5000" controlls indicators></mdb-carousel>
    </section>
    <section class="search-sec">
      <div class="field has-addons">
        <p class="control">
          <span class="select">
            <b-form-select v-model="searchedCategory">
              <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-select category-</b-form-select-option>
                </template>
              <b-form-select-option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >{{ category.categoryName }}</b-form-select-option>
            </b-form-select>
          </span>
        </p>
        <p class="control is-expanded">
          <input
            class="input"
            type="search"
            ref="keyword"
            placeholder="Search Marpe Product eg: mobile phone"
            @keydown="searchFor"
            @keydown.enter="searchEntered"
            v-model="keyword"
          />
        </p>
        <p class="control">
          <a class="button" @click="searchFor">
            <b-icon icon="search"></b-icon>
          </a>
        </p>
      </div>
      <b-collapse v-model="visible" id="collapse-2">
        <b-card
          v-for="(product, index) in searchedResult"
          :key="index"
          no-body
          class="overflow-hidden resultCard"
        >
          <router-link
            class="text-muted py-2"
            :to="{name: 'Product', params: {id: product.slug}}"
          >{{product.name | truncate(100, '...')}}</router-link>
          <div class="text-primary">{{searchedResult.length}} Results</div>
        </b-card>
      </b-collapse>
    </section>
  </div>
</template>

<script>
import { mdbCarousel } from "mdbvue";
import { mapState, mapGetters } from "vuex";
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
        class: "",
      },
      banner: [
        {
          src: "https://via.placeholder.com/3200x500.png?text=....",
          img: true,
        },
      ],
      visible: true,
      load: true,
      keyword: "",
      searchedResult: [],
      searchedCategory: null,
    };
  },
  async created() {
    await this.$store.watch(
      (state) => {
        return this.$store.state.settings; // could also put a Getter here
      },
      (newSettings, oldSettings) => {
        //something changed do something
        this.banner = newSettings.homebanner;
        this.load = false;
      }
    );
    this.banner = await this.settings.homebanner;
    if (this.banner.length > 0) {
      this.load = false;
    }
  },
  watch: {
    keyword(value) {
      if (value === "") this.visible = false;
      else this.visible = true
    },
    searchedResult(value) {
      if (!value.length > 0) this.visible = false;
      else this.visible = true
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(["log", "settings", "categories"]),
    ...mapGetters(["allMarpeProducts"]),
  },
  methods: {
    searchFor() {
      var self = this;
      let result;

      if (this.searchedCategory !== null) {
        let catProduct = this.allMarpeProducts.filter(
          (productCat) => productCat.categoryId === this.searchedCategory
        );
        result = catProduct.filter(function (product) {
          return (
            product.name.toLowerCase().indexOf(self.keyword.toLowerCase()) >= 0
          );
        });
        if (result.length > 5) {
          this.searchedResult = result.slice(0, 5);
        } else {
          this.searchedResult = result;
        }
      } else {
        result = this.allMarpeProducts.filter(function (product) {
          return (
            product.name.toLowerCase().indexOf(self.keyword.toLowerCase()) >= 0
          );
        });
        if (result.length > 5) {
          this.searchedResult = result.slice(0, 5);
        } else {
          this.searchedResult = result;
        }
      }
      // slice result
    },
    searchEntered() {
      if (this.$refs.keyword.value.length > 3) {
        this.$router.push({ name: "Search", query: { q: this.keyword } });
      }
    },
  },
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
.input:focus, .textarea:focus, .select select:focus, .is-focused.input, .is-focused.textarea, .select select.is-focused, .input:active, .textarea:active, .select select:active, .is-active.input, .is-active.textarea, .select select.is-active {
    border-color: #ea5376;
    box-shadow: none !important;
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
.resultRow {
  position: relative;
  top: 0px;
  z-index: 1000;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.resultCard {
  box-shadow: none !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
