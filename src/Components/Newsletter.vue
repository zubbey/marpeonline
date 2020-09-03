<template>
  <section class="newsletter-area">
    <div class="container">
      <div class="row justify-content-between">
        <!-- Newsletter Text -->
        <div class="col-12 col-lg-6">
          <div class="newsletter-text">
            <h2>Join our Newsletter</h2>
            <p>Nulla ac convallis lorem, eget euismod nisl. bibendum nec.</p>
          </div>
          <div class="newsletter-form">
            <form>
              <input class="nl-email" placeholder="Your E-mail" />
              <b-button variant="primary" @click.prevent="haSubmit">
                <b-icon icon="envelope"></b-icon>Submit
              </b-button>
            </form>
          </div>
        </div>

        <!-- Newsletter Form -->
        <div class="col-12 col-lg-4"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Newsletter",
  methods: {
    haSubmit() {
      return alert("Thank you for subscribing");
    },
  },
};
</script>

<style scoped>
.newsletter-area {
  position: relative;
  z-index: 1;
  background-color: #c5eafa;
  background-image: url("~@/assets/newsletter.svg");
  background-position: right;
  background-repeat: no-repeat;
  padding: 75px;
}
@media (min-width:320px){
  .newsletter-area {
    background-image: none !important;
  }
}
@media only screen and (min-device-width: 480px) {
  .newsletter-area {
    background-image: none !important;
  }
}
@media only screen and (min-device-width: 768px) {
  .newsletter-area {
    background-image: none !important;
  }
}
.newsletter-area .newsletter-text {
  position: relative;
  z-index: 1;
}

.newsletter-area .newsletter-text h2 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #263239;
}

.newsletter-area .newsletter-text h2 {
  color: #263239;
}

.newsletter-area .newsletter-text p {
  color: #263239;
  margin-bottom: 0;
}

.newsletter-area .newsletter-form form {
  position: relative;
  z-index: 1;
}

.newsletter-area .newsletter-form form .nl-email {
  width: 100%;
  height: 50px;
  background-color: inherit !important;
  color: #263239;
  font-size: 14px;
  font-style: italic;
  border: none;
  outline: none;
  border-bottom: 2px solid #676c6f;
  padding: 0 30px;
}

.newsletter-area .newsletter-form .input-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  height: 50px;
  background-color: #263239;
  color: #fff;
  font-size: 18px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 16px 70px 0 rgba(0, 0, 0, 0.69);
}

.newsletter-area .newsletter-form .input-button:hover,
.newsletter-area .newsletter-form .input-button:focus {
  background-color: inherit;
  color: black;
}
</style>
