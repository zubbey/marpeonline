<template>
  <div>
    <Header/>
    <Carousel />
    <Productlist class="container my-5"/>
    <Newsletter/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/Components/Header.vue'
import Newsletter from '@/Components/Newsletter.vue'
import Footer from '@/Components/Footer.vue'
import Carousel from '@/Components/HomePage/Carousel.vue'
import Productlist from '@/Components/HomePage/Productlist.vue'

export default {
  components: {
    Header, Newsletter, Footer, Carousel, Productlist
  }
}

</script>
