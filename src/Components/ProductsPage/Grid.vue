<template>
  <div class="container-xl grid p-0">
    <div class="row justify-content-around m-0">
      <div class="row col-6 pb-4 p-0 m-0">
        <div class="dropdown">
          <a
            class="btn btn-light dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            SORT BY
            <span style="color: #ea5376;">{{ sortButton }}</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" @click="sortDate">DATE</a>
            <a class="dropdown-item" @click="sortPrice">PRICE</a>
            <a class="dropdown-item" @click="sortTrend">TRENDS</a>
            <a class="dropdown-item" @load="reSet1688">DEFAULT</a>
          </div>
        </div>
      </div>
      <div class="row col-6 flex-row-reverse p-0">
        <div class="view-button">
          <div class="dropdown">
            <button
              class="btn btn-light dropdown-toggle d-block d-lg-none d-xl-none"
              role="button"
              id="MenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >CATAGORIES</button>
            <div class="dropdown-menu" aria-labelledby="MenuLink">
              <span v-for="category in categories" :key="category._id">
                <a class="dropdown-item" @click="sortI(category._id)">{{ category.categoryName }}</a>
              </span>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="reSetNigeria">Reset</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-around m-0">
        <div class="col col-xl-3 col-lg-3 d-none d-lg-block d-xl-block p-0">
          <div class="card-selector mr-3">
            <div class="card-body p-4">
              <div class="search-title">
                <h4>Catagories +</h4>
                <br />
                <content-placeholders v-if="log.loading">
                  <content-placeholders-text :lines="3" />
                </content-placeholders>
                <p class="pb-3" v-for="category in categories" :key="category._id">
                  <router-link :to="{name: 'Category', params: {id: category.categoryName}}">
                    {{ category.categoryName }}
                    ({{ category.items }})
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 text-center">
          <Breadc :label="'Products Available in Our Nigerian Warehouse'" />
          <div
            v-if="this.productsInNigeria == 0"
            class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 card-section"
          >
          <Loading v-if="log.loading"/>
            <p style="margin-left:9rem;margin-right:9rem" class="text-muted" v-if="!log.loading">Sorry, we can't find a product in Nigerian Warehouse</p>
          </div>
          <Card :CardArray="slicedNigeriaCards" :cardColumn="cardColumn"/>
          <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4">
            <b-button type="button" @click="incNigCardNumber" variant="outline">More +</b-button>
          </div>
          <Breadc :label="'Products On Preorders'" />
          <div
            v-if="this.productsIn1688 == 0"
            class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 card-section"
          >
          <Loading v-if="log.loading"/>
            <p style="margin-left:9rem;margin-right:9rem" class="text-muted" v-if="!log.loading">Sorry, we can't find a product in 1688</p>
          </div>
          <Card :CardArray="slicedCards1688" :cardColumn="cardColumn" />

          <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4">
            <b-button type="button" @click="inc1688CardNumber" variant="outline">More +</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton';
import Breadc from "@/Components/ProductsPage/Breadc.vue";
import Loading from "@/Components/Loading.vue";
import Card from "./Card.vue";
import { mapState } from 'vuex';

export default {
  props: ["productsInNigeria", "productsIn1688", "categories"],
  name: "Grid",
  components: {
    Card,
    Breadc,
    Skeleton,
    Loading
  },
  data() {
    return {
      showNigCards: 6,
      show1688Cards: 6,
      sortButton: "DEFAULT",
      cardColumn: {}
    };
  },
  computed: {
    ...mapState(['log']),
    slicedNigeriaCards() {
      return this.productsInNigeria.slice(0, this.showNigCards);
    },
    slicedCards1688() {
      return this.productsIn1688.slice(0, this.show1688Cards);
    }
  },
  methods: {
    incNigCardNumber() {
      return (this.showNigCards += 6);
    },
    inc1688CardNumber() {
      return (this.show1688Cards += 6);
    },
    sortDate() {
      this.productsInNigeria.sort(
        (a, b) => a.created.length * 2 - b.created.length * 4
      );
      return (this.sortButton = "DATE");
    },
    sortPrice() {
      this.productsInNigeria.sort((a, b) => a.price - b.price);
      return (this.sortButton = "PRICE");
    },
    sortTrend() {
      this.productsInNigeria.sort((a, b) => a.label.length - b.label.length);
      return (this.sortButton = "TRENDING");
    },
    sortI(id) {
      this.productsInNigeria = this.productsInNigeria.filter(e =>
        e.categoryId.match(id)
      );
      this.productsIn1688 = this.productsIn1688.filter(e => e.categoryId.match(id));

      if (this.productsInNigeria.length === 1 || this.productsIn1688.length === 1) {
        this.cardColumn = {
          flex: "0 0 36.66666%",
          "max-width": "36.66666%"
        };
      } else {
        this.cardColumn = {};
      }
    },
    reSetNigeria() {
      return (this.productsInNigeria = this.productsInNigeria);
    },
    reSet1688() {
      return (this.productsIn1688 = this.productsIn1688);
    }
    
  }
};
</script>

<style scoped>
p a {
  color: #404040 !important;
}
p{
  font-size: .9rem;
}
.container {
  padding: 0 !important;
}
.container.grid {
  min-height: 100%;
}

.container.grid a {
  cursor: pointer !important;
}

.btn-light {
  color: black !important;
  background: white;
  border: none;
  border-radius: 6px !important;
}
.dropdown-menu {
  background-color: #eee;
  color: #2c3539;
}

.dropdown-menu > a:hover {
  background-color: #dae0e5;
}

.btn-outline-secondary {
  border-radius: 0 !important;
}
.dropdown-menu {
  position: absolute !important;
  transform: none !important;
}
.badge-primary {
  background-color: #ea5477 !important;
}
/*search options*/

.card-selector {
  color: #262626;
  height: auto;
  background: #ffffff !important;
  border-radius: 6px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.search-title h6 {
  cursor: pointer;
}

.circle {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  border: 0.7px solid #2c3539;
  display: inline-block;
  margin-left: 6px;
  cursor: pointer;
}
</style>
