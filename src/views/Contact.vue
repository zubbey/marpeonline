<template>
<div>
    <Header />
    <ContactForm />
    <Footer />
</div>
</template>

<script>
import Header from '@/Components/Header.vue'
import Footer from '@/Components/Footer.vue'
import ContactForm from '@/Components/ContactPage/ContactForm.vue'
export default {
  components: {
    Header, Footer, ContactForm
  }
}
</script>
