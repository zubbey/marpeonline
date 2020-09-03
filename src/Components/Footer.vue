<template>
  <footer class="footer_area bg-white">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Quick link</div>
            <ul class="list-unstyled">
              <router-link to="/servicefee"><li>Service Fee</li></router-link>
              <router-link to="/costconverter"><li>Cost converter</li></router-link>
              <router-link to="/track"><li>Track items</li></router-link>
              <router-link to="/about"><li>About us</li></router-link>
              <router-link to="/contact"><li>contact us</li></router-link>
              <router-link to="/faqs"><li>FAQs</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Collection</div>
            <ul class="list-unstyled">
              <router-link to="#"><li>Products Available in Our Nigerian Warehouse</li></router-link>
              <router-link to="#"><li>Products On Preorders</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Catagories</div>
            <ul class="list-unstyled" v-for="category in slicedCat" :key="category._id">
              <router-link :to="{name: 'Category', params: {id: category.categoryName}}"><li>{{ category.categoryName }}</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-12 col-xl-6 col-lg-3 col-md-3 col-sm-12 text-left text-md-right pb-5">
          <div class="footer-widget">
            <h4>Port Harcourt Rivers State, Nigeria</h4>
            <a href="mailto:support@marpe.online">support@marpe.online</a>
            <h6>+234 812 377 1335</h6>
          </div>
        </div>

      </div>

      <div class="row justify-content-between">
        <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6">
          <div class="tiny-footer">
            <p>Copyright © All Rights Reserved 2020 </p>
          </div>
        </div>
        <div class="col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 text-right">
          <div class="social-info">
            <strong>Get social</strong>
            <a
              v-for="(social, index) in socials"
              :key="index"
              class="p-1"
              target="_blank"
              :href="social.link"
            >
            <mdb-icon fab :icon="social.icon" size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mdbIcon } from 'mdbvue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Footer',
  props: ['categories'],
  components: {
    mdbIcon
  },
  data(){
    return {
      socials: []
    }
  },
  mounted(){
    this.socials = this.settings.socials;
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['slicedCat'])
  }
}
</script>

<style scoped>
.footer_area {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #fefefe;
}

.footer-widget {
  padding-top: 60px;
}

.footer-title {
  padding-bottom: 20px;
  font-weight: bold;
}

.list-unstyled a {
  text-decoration: none;
}

.list-unstyled a li {
  color: #2c3e50;
  margin-bottom: 10px;
}

.social-info>img {
  padding-left: 10px;
}

.social-info>img:hover {
  opacity: 0.7;
}

</style>
