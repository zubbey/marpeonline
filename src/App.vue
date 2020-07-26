<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {},
  created() {
    let accessToken = localStorage.getItem("accessToken");
    let guest_id = localStorage.getItem("guest_id");
    // Get Setting for global use
    this.getSettings();
    this.getNigeriaProducts();
    this.get1688Products();
    this.getCategories().then((data) => {
      this.$store.commit('SET_CATEGORIES', data);
      this.options = this.categoryOption;
    });

    if (!accessToken && !guest_id) {
      // generate a new guest user
      localStorage.setItem("guest_id", this.createGuestId);

    } else if (!accessToken) {
      this.$store
        .dispatch("getCartItems", guest_id)
        .then(data => {
          this.$store.commit("SET_CART", data);
        })
        .catch(error => console.log(error));
    } else {
      // get accessToken and login user
      this.$store.dispatch("Authenticate_User", accessToken).then(data => {
        const payload = { message: "Login was successfully", user: data[0] };
        this.$store.commit("SUCCESS", payload);
        setTimeout(() => {
          this.$store.commit("RESET");
        }, 3000);
              // get cart
        this.$store.dispatch("getCartItems", payload.user._id)
        .then(data => {
          this.$store.commit("SET_CART", data);
        })
        .catch(error => console.log(error));
      })
      .catch(error => this.$store.commit("logServerErr", error.response.data.message));

      // get user orders
      this.$store.dispatch("getOrders", accessToken).then(data => {
        this.$store.commit("SET_ORDERS", data);
      })
      .catch(error => console.log(error));

      this.$store.dispatch("getPurchaseOrders", accessToken).then(data => {
        if (data.length > 0){
          this.$store.commit("SET_PURCHASE_ORDER", data);
        }
      })
      .catch(error => console.log(error));
      // get user orders
      this.$store.dispatch("getOnlyPurchase", accessToken)
      .then(data => {
          this.$store.commit("SET_ONLY_PURCHASE", data);
          this.$store.commit("RESET");
      })
      .catch(error => console.log(error));
        
    }
  },
  mounted(){
    // MAKE ALL TOAST

    this.$store.watch((state) => {
        console.clear(state);
        return this.$store.state.toast.status; // could also put a Getter here
      },
      (newToast, oldToast) => {
        console.clear(oldToast);
        console.log('new toast detected!');
        //something changed do something
        if (newToast === "success") {
          this.makeToast("success", this.toast.message, true);
          setTimeout(() => {
            this.$store.commit("RESET_TOAST");
          }, 1000);
        } else if (newToast === "deleted") {
          this.makeToast("danger", this.toast.message, true);
          setTimeout(() => {
            this.$store.commit("RESET_TOAST");
          }, 1000);
        }
      });
  },
  computed: {
    ...mapState(["toast", "user"]),
  },
  methods: {
    ...mapActions(['getSettings', 'getNigeriaProducts', 'get1688Products', 'getCategories', 'getCartItems']),
    async createGuestId() {
      const rand = () => Math.random(0).toString(36).substr(2);
      const token = length => (rand() + rand() + rand() + rand()).substr(0, length);
      return await token(24);
    },

    makeToast(variant = null, msg, append = false) {
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: "New Notification",
        variant: variant,
        solid: true,
        autoHideDelay: 5000,
        appendToast: append,
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Exo+2");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.b-toaster {
    z-index: 999999 !important;
}
#app {
  background-color: #f9f9f9 !important;
  font-family: "Roboto", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
