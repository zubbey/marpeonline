<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default{
  name: 'app',
  components: {
  },
  created(){
      let accessToken = localStorage.getItem('accessToken');
      let guest_id = localStorage.getItem('guest_id');

      if(!accessToken && !guest_id){
          // generate a new guest user
          localStorage.setItem('guest_id', this.createGuestId);

      } else if(!accessToken && guest_id){

          this.$store.dispatch('getCartItems', guest_id)
          .then(data => {
            this.$store.commit('SET_CART', data)
          })
          .catch(error => console.log(error))
      }
  },
  mounted(){
    let accessToken = localStorage.getItem('accessToken');

    this.$store.dispatch('Authenticate_User', accessToken)
    .then(data => {
      const payload = {message: 'Login was successfully', user: data[0]};
      this.$store.commit('SUCCESS', payload);
    })
    .then(() => {
      this.$store.commit("RESET");
      this.$store.dispatch('getCartItems', this.$store.state.user._id)
      .then(data => {
        this.$store.commit('SET_CART', data)
      })
      .catch(error => console.log(error))
    })
    .catch(error => this.$store.commit('logServerErr', error.response.data.message))
  },
  computed: {
    ...mapState(['user']),
    
    createGuestId(){
      const rand = ()=> Math.random(0).toString(36).substr(2);
      const token = (length) => (rand()+rand()+rand()+rand()).substr(0, length);
      return token(24);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo+2');
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
#app {
  background-color: #F9F9F9 !important;
  font-family: 'Roboto', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
