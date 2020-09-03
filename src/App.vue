<template>
  <div id="app" :key="render">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return {
      render: 0,
    };
  },
  created() {
    let adminAccessToken = localStorage.getItem("adminAccessToken");
    let accessToken = localStorage.getItem("accessToken");
    let guest_id = localStorage.getItem("guest_id");
    // Get Setting for global use
    this.getSettings();
    this.getNigeriaProducts();
    this.get1688Products();
    this.getCategories().then((data) => {
      this.$store.commit("SET_CATEGORIES", data);
      this.options = this.categoryOption;
    });

    // Get admin data
    if (adminAccessToken) {
      this.getAllData({
        accessToken: localStorage.getItem("adminAccessToken"),
      })
        .then((data) => {
          this.$store.commit("SET_ADMIN_DATA", data);
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        );
    }

    if (!adminAccessToken && !accessToken && !guest_id) {
      // generate a new guest user
      localStorage.setItem("guest_id", this.createGuestId(24));
    } else if (!accessToken) {
      this.$store
        .dispatch("getCartItems", guest_id)
        .then((data) => {
          this.$store.commit("SET_CART", data);
        })
        .catch((error) => console.log(error));
    } else {
      // get accessToken and login user
      this.$store
        .dispatch("Authenticate_User", accessToken)
        .then((data) => {
          const payload = { message: "Login was successfully", user: data[0] };
          this.$store.commit("SUCCESS", payload);
          setTimeout(() => {
            this.$store.commit("RESET");
          }, 3000);
          // get cart
          this.$store
            .dispatch("getCartItems", payload.user._id)
            .then((data) => {
              this.$store.commit("SET_CART", data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) =>
          this.$store.commit("logServerErr", error.response.data.message)
        );

      // get user orders
      this.$store
        .dispatch("getOrders", accessToken)
        .then((data) => {
          this.$store.commit("SET_ORDERS", data);
        })
        .catch((error) => console.log(error));

      this.$store
        .dispatch("getPurchaseOrders", accessToken)
        .then((data) => {
          if (data.length > 0) {
            this.$store.commit("SET_PURCHASE_ORDER", data);
          }
        })
        .catch((error) => console.log(error));
      // get user orders
      this.$store
        .dispatch("getOnlyPurchase", accessToken)
        .then((data) => {
          this.$store.commit("SET_ONLY_PURCHASE", data);
          this.$store.commit("RESET");
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    // RE_RENDER VUE
    this.rerender();
    this.$store.watch(
      (state) => {
        return this.$store.state.re_render;
      },
      (oldValue, newValue) => {
        if (newValue === true) {
          console.log("detacted!");
          this.rerender();
          this.$store.commit("RENDER_RESET");
        }
      }
    );

    // MAKE ALL TOAST
    this.$store.watch(
      (state) => {
        return this.$store.state.toast.status; // could also put a Getter here
      },
      (newToast, oldToast) => {
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
      }
    );

    // watch currency
    this.$store.watch(
      (state) => {
        return this.$store.state.currencyType; // could also put a Getter here
      },
      (newCurrency, oldCurrency) => {
        let value = null;
        if (newCurrency.name === "US Dollar") {
          value = true;
          this.$store.commit("UPDATE_D_TO_N", value);
        } else {
          value = false;
          this.$store.commit("UPDATE_D_TO_N", value);
        }
      }
    );
  },
  computed: {
    ...mapState(["toast", "user", "d_to_n"]),
  },
  methods: {
    ...mapActions([
      "getAllData",
      "getSettings",
      "getNigeriaProducts",
      "get1688Products",
      "getCategories",
      "getCartItems",
    ]),
    rerender() {
      this.$nextTick(() => {
        this.render += 1;
        console.log("re-render start");
        if (localStorage.getItem("adminAccessToken")) {
          this.getAllData({
            accessToken: localStorage.getItem("adminAccessToken"),
          })
            .then((data) => {
              this.$store.commit("SET_ADMIN_DATA", data);
            })
            .catch((error) =>
              this.$store.commit("logServerErr", error.response.data.message)
            );
        }
        this.$nextTick(() => {
          // Get admin data
          console.log("re-render end: " + this.render);
        });
      });
    },
    createGuestId(num) {
      const rand = () => Math.random(0).toString(36).substr(2);
      const token = (length) =>
        (rand() + rand() + rand() + rand()).substr(0, length);
      return token(num);
    },

    makeToast(variant = null, msg, append = false) {
      let color = "";
      switch (variant) {
        case "success":
          color = "#a0e689";
          break;
        case "danger":
          color = "#ff5555";
          break;
        case "warning":
          color = "#f3c744";
          break;

        default:
          color = "#649aff";
          break;
      }
      // Create the title
      const h = this.$createElement;
      const template = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline"] },
        [
          h("b-img", {
            class: "mr-2",
            style: `background-color: ${color}; width: 12px; height: 12px;`,
          }),
          h("strong", { class: "mr-auto" }, "Notice!"),
          h(
            "small",
            { class: "text-muted mr-2" },
            `${new Date().getSeconds()} seconds ago`
          ),
        ]
      );
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: template,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Exo+2");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.b-toaster {
  z-index: 999999 !important;
}
#app {
  font-family: "Roboto", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: #f9f9f9 !important;
}
a {
  color: black !important;
}
.footer-widget a {
  color: #ea5376 !important;
}
.dropdown,
.dropleft,
.dropright,
.dropup {
  margin: 0 !important;
}
</style>
