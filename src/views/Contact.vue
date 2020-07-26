<template>
  <div>
    <Header />
    <ContactForm :formImage="getContactImage"/>
    <section>
      <mdb-row class="text-center mb-5">
        <mdb-col md="4" v-for="(contact, index) in settings.contact" :key="index">
          <mdb-btn tag="a" floating >
            <mdb-icon :icon="contact.icon" />
          </mdb-btn>
          <div v-for="(p, key) in contact.paragraph" :key="key">
              <p>{{p}}</p>
          </div>
        </mdb-col>
      </mdb-row>
    </section>
    <Footer />
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbIcon,
  mdbCard,
  mdbCardBody
} from "mdbvue";
import Header from "@/Components/Header.vue";
import Footer from "@/Components/Footer.vue";
import ContactForm from "@/Components/ContactPage/ContactForm.vue";
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
    Header,
    Footer,
    ContactForm,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
    mdbCard,
    mdbCardBody
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['getContactImage'])
  }
};
</script>
<style scoped>
p {
    font-size: 1rem !important;
}
.btn-default {
    background-color: transparent !important;
}
.form-control:focus{
  box-shadow: none !important;
}
form button{
  box-shadow: 0 26px 38px 0 rgba(234, 83, 118, 0.19), 0 6px 20px 0 rgba(234, 83, 118, 0.39) !important;
}
</style>
