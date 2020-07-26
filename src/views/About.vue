<template>
  <div>
    <Header />
    <mdb-container>
      <h2 class="h1-responsive font-weight-bold text-center my-5">About Us</h2>
      <mdb-row class="bg-white rounded p-4">
        <mdb-col lg="5">
          <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
            <b-img-lazy v-bind="mainProps"
              class="img-fluid"
              :src="settings.about[0].image"
              alt="image"
            ></b-img-lazy>
            <a>
              <mdb-mask overlay="white-slight" waves />
            </a>
          </mdb-view>
        </mdb-col>
        <mdb-col lg="7">
          <h3 class="font-weight-bold mb-3 p-0">
            <strong>{{ settings.about[0].heading }}</strong>
          </h3>
          <div v-if="showLess">
            <p v-for="(paragraph, index) in settings.about[0].paragraph.slice(0, 2)" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = false"> Read more ...</b-button>
          </div>
          <div v-else>
            <p v-for="(paragraph, index) in settings.about[0].paragraph" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = true"> Read Less</b-button>
          </div>
          
        </mdb-col>
      </mdb-row>

      <hr class="my-5" />

      <mdb-row class="bg-white rounded p-4">
        <mdb-col lg="7">
          <h3 class="font-weight-bold mb-3 p-0">
            <strong>{{ settings.about[1].heading }}</strong>
          </h3>
          <div v-if="showLess">
            <p v-for="(paragraph, index) in settings.about[1].paragraph.slice(0, 2)" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = false"> Read more ...</b-button>
          </div>
          <div v-else>
            <p v-for="(paragraph, index) in settings.about[1].paragraph" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = true"> Read Less</b-button>
          </div>
          
        </mdb-col>
        <mdb-col lg="5">
          <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
            <b-img-lazy v-bind="mainProps"
              class="img-fluid"
              :src="settings.about[1].image"
              alt="image"
            ></b-img-lazy>
            <a>
              <mdb-mask overlay="white-slight" waves />
            </a>
          </mdb-view>
        </mdb-col>
      </mdb-row>

      <hr class="my-5">

      <mdb-row class="bg-white rounded p-4">
        <mdb-col lg="5">
          <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
            <b-img-lazy v-bind="mainProps"
              class="img-fluid"
              :src="settings.about[2].image"
              alt="image"
            ></b-img-lazy>
            <a>
              <mdb-mask overlay="white-slight" waves />
            </a>
          </mdb-view>
        </mdb-col>
        <mdb-col lg="7">
          <h3 class="font-weight-bold mb-3 p-0">
            <strong>{{ settings.about[2].heading }}</strong>
          </h3>
          <div v-if="showLess">
            <p v-for="(paragraph, index) in settings.about[2].paragraph.slice(0, 2)" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = false"> Read more ...</b-button>
          </div>
          <div v-else>
            <p v-for="(paragraph, index) in settings.about[2].paragraph" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = true"> Read Less</b-button>
          </div>
          
        </mdb-col>
      </mdb-row>

      <hr class="my-5" />
      <mdb-row class="bg-white rounded p-4">
        <mdb-col lg="7">
          <h3 class="font-weight-bold mb-3 p-0">
            <strong>{{ settings.about[3].heading }}</strong>
          </h3>
          <div v-if="showLess">
            <p v-for="(paragraph, index) in settings.about[3].paragraph.slice(0, 2)" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = false"> Read more ...</b-button>
          </div>
          <div v-else>
            <p v-for="(paragraph, index) in settings.about[3].paragraph" :key="index">
              {{ paragraph }}
            </p>
            <b-button @click="showLess = true"> Read Less</b-button>
          </div>
          
        </mdb-col>
        <mdb-col lg="5">
          <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
            <b-img-lazy v-bind="mainProps"
              class="img-fluid"
              :src="settings.about[3].image"
              alt="image"
            ></b-img-lazy>
            <a>
              <mdb-mask overlay="white-slight" waves />
            </a>
          </mdb-view>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <Footer />
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbMask,
  mdbIcon,
  mdbView,
  mdbBtn
} from "mdbvue";
import Header from "@/Components/Header.vue";
import Footer from "@/Components/Footer.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "about",
  components: {
    Header,
    Footer,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbMask,
    mdbIcon,
    mdbView,
    mdbBtn
  },
  data(){
    return{
      showLess: true,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#eee",
        width: "100%",
        height: 50,
        class: "my-5"
      }
    }
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["getAboutImage"])
  }
};
</script>
<style scoped>
.z-depth-2{
  box-shadow: none !important;
}
p {
  font-size: 1rem !important;
}
</style>
