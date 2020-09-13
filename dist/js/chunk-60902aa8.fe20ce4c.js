(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60902aa8"],{"7cb4":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Header"),s("div",{staticClass:"container"},[s("b-row",{staticClass:"bg-white p-4 rounded my-4"},[s("div",{staticClass:"text-center"},[s("h2",[s("strong",[t._v("Checkout")])])])]),s("b-row",{staticClass:"bg-white p-4 mb-5 rounded",attrs:{cols:"1","cols-lg":"2"}},[s("b-col",{staticClass:"mb-4",attrs:{"cols-sm":"1","cols-md":"4","order-md":"2"}},[s("h4",{staticClass:"d-flex justify-content-between align-items-center mb-3"},[s("span",{staticClass:"text-muted"},[t._v("your cart")]),s("span",{staticClass:"badge badge-secondary badge-pill"},[t._v(t._s(this.cart.length))])]),t._l(t.cart,(function(e,r){return s("ul",{key:r,staticClass:"list-group mb-3"},[s("li",{staticClass:"list-group-item d-flex justify-content-between lh-condensed"},[s("div",{staticClass:"pr-4"},[s("img",{staticClass:"mb-4",attrs:{src:e.product.thumbnail,width:"100"}})]),s("div",[s("h6",{staticClass:"my-0"},[t._v(t._s(e.product.name))]),s("p",{staticClass:"mt-2"},[t._v("\n                Qty:\n                "),s("b",[t._v(t._s(e.qty))])]),s("p",{staticClass:"mt-2"},[t._v("\n                weight:\n                "),s("b",[t._v(t._s(e.product.weight)+"kg")])])]),s("div",[s("h6",{staticClass:"my-0"},[t.d_to_n?s("strong",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(e.product.price))))]):s("strong",[t._v(t._s(t._f("toCurrency")(e.product.price)))])])])])])})),s("ul",{staticClass:"list-group mb-3"},[s("li",{staticClass:"list-group-item d-flex justify-content-between"},[s("span",[t._v("Shipping Cost")]),t.d_to_n?s("strong",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(t.cartWeight))))]):s("strong",[t._v(t._s(t._f("toCurrency")(t.cartWeight)))])]),s("li",{staticClass:"list-group-item d-flex justify-content-between"},[s("span",[t._v("Total")]),t.d_to_n?s("strong",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(t.percentage(t.totalItemPrice,t.fee)))))]):s("strong",[t._v(t._s(t._f("toCurrency")(t.percentage(t.totalItemPrice,t.fee))))])]),s("li",{staticClass:"list-group-item d-flex justify-content-between"},[s("span",[t._v("Delivery Method")]),s("b-form-select",{attrs:{options:t.options},model:{value:t.delivery,callback:function(e){t.delivery=e},expression:"delivery"}})],1)])],2),t.newUser||t.log.isUserActive?t._e():s("b-col",{attrs:{"cols-sm":"1","cols-md":"8","order-md":"1"}},[s("h4",{staticClass:"mb-3"},[t._v("Sign into your account")]),s("p",{staticClass:"muted"},[t._v("Or click continue to create account")]),s("b-button",{attrs:{variant:"primary"},on:{click:t.sendToLogin}},[t._v("\n          Sign in\n          "),s("b-icon",{attrs:{icon:"chevron-right"}})],1),t._v("Or\n        "),s("b-button",{attrs:{variant:"outline"},on:{click:function(e){t.newUser=!0}}},[t._v("\n          Continue\n          "),s("b-icon",{attrs:{icon:"chevron-right"}})],1)],1),t.newUser||t.log.isUserActive?s("b-col",{attrs:{"cols-sm":"1","cols-md":"8","order-md":"1"}},[s("h4",{staticClass:"mb-3"},[t._v("Billing address")]),t.log.msgError&&""==!t.log.message?s("b-alert",{attrs:{show:"",variant:"danger"}},[t._v(t._s(t.log.message))]):t._e(),s("mdb-container",{staticClass:"mt-5"},[s("form",{ref:"userForm",staticClass:"needs-validation",attrs:{novalidate:""},on:{submit:t.checkForm}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"col mb-3"},[s("label",{attrs:{for:"firstname"}},[t._v("First name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.firstname,expression:"form.firstname"}],staticClass:"form-control",attrs:{type:"text",id:"firstname",required:""},domProps:{value:t.form.firstname},on:{input:function(e){e.target.composing||t.$set(t.form,"firstname",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide your firstname.")])]),s("div",{staticClass:"col mb-3"},[s("label",{attrs:{for:"lastname"}},[t._v("Last name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.lastname,expression:"form.lastname"}],staticClass:"form-control",attrs:{type:"text",id:"lastname",required:""},domProps:{value:t.form.lastname},on:{input:function(e){e.target.composing||t.$set(t.form,"lastname",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide your lastname.")])])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"email"}},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",attrs:{type:"email",id:"email",name:"email",required:""},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide a valid email address for shipping update.")])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"phone"}},[t._v("Phone")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.phone,expression:"form.phone"}],staticClass:"form-control",attrs:{type:"text",id:"phone",required:""},domProps:{value:t.form.phone},on:{input:function(e){e.target.composing||t.$set(t.form,"phone",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide your phone number for shipping update.")])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"address"}},[t._v("Address")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.address,expression:"form.address"}],staticClass:"form-control",attrs:{type:"text",id:"address",required:""},domProps:{value:t.form.address},on:{input:function(e){e.target.composing||t.$set(t.form,"address",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide your Home Address.")])]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"col-md-6 mb-3"},[s("b-form-group",{attrs:{id:"country",label:"Country","label-for":"country"}},[s("b-form-select",{attrs:{id:"country",options:t.country,required:""},model:{value:t.form.country,callback:function(e){t.$set(t.form,"country",e)},expression:"form.country"}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please select a valid country")])],1)],1),s("div",{staticClass:"col-md-3 mb-3"},[s("label",{attrs:{for:"city"}},[t._v("City")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.city,expression:"form.city"}],staticClass:"form-control",attrs:{type:"text",id:"city",required:""},domProps:{value:t.form.city},on:{input:function(e){e.target.composing||t.$set(t.form,"city",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide a valid state.")])]),s("div",{staticClass:"col-md-3 mb-3"},[s("label",{attrs:{for:"zip"}},[t._v("Zip")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.zip,expression:"form.zip"}],staticClass:"form-control",attrs:{type:"text",id:"zip",required:""},domProps:{value:t.form.zip},on:{input:function(e){e.target.composing||t.$set(t.form,"zip",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide a valid zip.")])])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"shippingaddress"}},[t._v("Shipping Address")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.shippingaddress,expression:"form.shippingaddress"}],staticClass:"form-control",attrs:{type:"text",id:"shippingaddress",required:""},domProps:{value:t.form.shippingaddress},on:{input:function(e){e.target.composing||t.$set(t.form,"shippingaddress",e.target.value)}}}),s("div",{staticClass:"invalid-feedback"},[t._v("Please provide your shipping address update.")])]),s("div",{staticClass:"form-group"},[s("div",{staticClass:"form-check pl-0"},[s("input",{staticClass:"form-check-input",attrs:{type:"checkbox",value:"",id:"paystack",checked:"",disabled:"",required:""}}),s("label",{staticClass:"form-check-label",attrs:{for:"invalidCheck"}},[t._v("Checkout with Paystack")]),s("div",{staticClass:"invalid-feedback"},[t._v("You must select your payment method.")])])]),s("mdb-btn",{attrs:{type:"submit",color:"primary"}},[t._v("\n              Continue\n              "),s("b-icon",{attrs:{icon:"chevron-right"}})],1)],1)])],1):t._e()],1),s("b-modal",{ref:"paymentModal",staticStyle:{padding:"0","text-align":"center"},attrs:{"hide-header":"","hide-footer":"","no-stacking":"","no-close-on-backdrop":"","ok-disabled":"",size:"sm"}},[s("object",{staticStyle:{width:"100%",height:"600px"},attrs:{type:"text/html",data:t.authorization_url}})]),s("b-modal",{ref:"passwordModel",attrs:{id:"modal-prevent-closing",title:"Complete your account","ok-only":"","no-stacking":""},on:{ok:t.handleOk}},[s("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[s("b-form-group",{attrs:{state:t.valid,label:"Password","label-for":"password","invalid-feedback":"Password is required"}},[s("b-form-input",{attrs:{id:"password",type:"password",state:t.valid,required:""},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),s("small",{staticClass:"text-warning"},[t._v("password must be atleast 6 characters long!")])],1)],1)])],1),s("Footer")],1)},a=[],o=(s("8e6e"),s("456d"),s("bd86")),i=(s("7f7f"),s("ac6a"),s("62a6")),n=s("80ce"),c=s("91c9"),l=s("2f62");function d(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,r)}return s}function u(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?d(Object(s),!0).forEach((function(e){Object(o["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):d(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var m={props:["id"],name:"Product",components:{mdbContainer:c["mdbContainer"],mdbBtn:c["mdbBtn"],Header:i["a"],Footer:n["a"]},data:function(){return{render:0,error:null,valid:null,fee:null,newUser:!1,authorization_url:null,reference:null,checkTransaction:null,toastCount:0,countDown:1200,form:{firstname:"",lastname:"",email:"",phone:"",address:"",shippingaddress:"",city:"",country:"",zip:null,password:"",paystack:!1,wallet:!1},country:[{text:"Select Country",value:null}],delivery:null,currency:"",options:[]}},watch:{form:function(t,e){localStorage.getItem("isAuthorized")&&(""!=e.email&&void 0!=e.email||(this.form=this.$store.state.user))},countDown:function(t,e){console.log(e),0===t&&(this.stopTransactionCheck(),this.$refs["paymentModal"].hide(),0===this.countDown&&(this.makeToast("warning","Timeout! Try again",!0),this.countDown=1200),this.$store.commit("RESET"),console.log("timeout!"))}},created:function(){this.render=!0,this.render=!1},mounted:function(){var t=this;this.$store.watch((function(e){return console.log(e),t.$store.state.transaction}),(function(e,s){console.log(s),"success"===e?(t.stopTransactionCheck(),!0===t.$store.state.log.isUserActive?t.updateUserData():t.loginNewUser(),t.makeToast("success","Transaction was success",!0),t.$refs["paymentModal"].hide()):"failed"===e?(t.stopTransactionCheck(),t.makeToast("danger","Transaction Failed, Please try again",!0),t.$refs["paymentModal"].hide(),setTimeout((function(){location.reload()}),3e3)):"Insufficient Funds"===e?(t.stopTransactionCheck(),t.makeToast("warning","Insufficient Funds, Please try again",!0),t.$refs["paymentModal"].hide(),setTimeout((function(){location.reload()}),3e3)):"warning"===e&&t.makeToast("warning",t.log.message,!0)})),this.fee=this.settings.commission.shipping,this.options=this.settings.shippingmethods,this.delivery=this.settings.shippingmethods[0],"NGN"!=this.currencyType.currency&&"USD"!=this.currencyType.currency||(this.currency=this.currencyType.currency),!0===this.log.isUserActive&&(this.form={firstname:this.user.firstname,lastname:this.user.lastname,email:this.user.email,phone:this.user.phone,address:this.user.address,shippingaddress:this.user.shippingaddress,city:this.user.city,country:this.user.country,zip:this.user.zip}),this.$store.dispatch("getCountries").then((function(e){e.forEach((function(e){t.country.push(e.name)}))})).catch((function(t){console.log(t)}))},computed:u(u({},Object(l["d"])(["settings","log","cart","user","currencyType","d_to_n"])),Object(l["c"])(["totalItemPrice","cartWeight"])),methods:{sendToLogin:function(){this.$router.push("/login?redirect=checkout")},validate:function(){var t=Array.prototype.slice.call(arguments),e=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;for(var s in t){var r=t[s];if("email"===r&&!e.test(this.form[r]))return!1;if(""===this.form[r])return!1}return!0},checkForm:function(t){var e=this;if(t.preventDefault(),t.target.classList.add("was-validated"),this.validate("email","firstname","lastname","phone","shippingaddress")){var s={cart:this.cart,user:this.form,currency:this.currency,reference:this.reference,deliverymethod:this.delivery,total:this.percentage(this.totalItemPrice,this.fee),date:new Date};!1===this.log.isUserActive?this.$refs["passwordModel"].show():this.$store.dispatch("initTransaction",s).then((function(t){e.authorization_url=t.data.authorization_url,e.reference=t.data.reference})).then((function(){return e.$refs["paymentModal"].show()})).then((function(){var t={cart:e.cart,user:e.form,currency:e.currency,deliverymethod:e.delivery,total:e.percentage(e.totalItemPrice,e.fee),reference:e.reference,date:new Date};e.checkTransaction=setInterval((function(){e.$store.dispatch("verifyPayment",t).then((function(t){"status"===t.data.status?(console.log("success"),e.stopTransactionCheck()):(e.countDown--,console.log("not verifed: "+e.countDown))}))}),5e3)})).catch((function(t){"undefined"===s&&console.log("failed"),e.$store.commit("logServerErr",t.response.data.message)}))}else console.log("invalid!")},stopTransactionCheck:function(){clearInterval(this.checkTransaction)},updateUserData:function(){var t=this,e=localStorage.getItem("accessToken"),s={cart:this.cart,user:this.form,currency:this.currency,reference:this.reference,deliverymethod:this.delivery,total:this.percentage(this.totalItemPrice,this.fee),date:new Date};this.$store.dispatch("placeDomesticOrder",s).then((function(){return t.$store.commit("RESET")})).catch((function(e){return t.$store.commit("logServerErr",e.response.data.message)})),this.$store.dispatch("updateUserInfo",{token:e,payload:{firstname:this.form.firstname,lastname:this.form.lastname,email:this.form.email,phone:this.form.phone,address:this.form.address,shippingaddress:this.form.shippingaddress,city:this.form.city,country:this.form.country,zip:this.form.zip}}).then((function(){var e="Saved! you're doing well";t.$store.commit("SAVED",e)})).then((function(){t.$store.dispatch("Authenticate_User",e).then((function(e){var s={message:"",user:e[0]};t.$store.commit("SUCCESS",s)})).then((function(){return setTimeout((function(){t.$store.commit("RESET")}),3e3)})).catch((function(t){return console.log(t)}))})).then((function(){t.$store.dispatch("emptyCart",t.$store.state.user._id).then((function(){return t.$store.commit("EMPTY_CART")}))})).then((function(){t.$store.dispatch("getOrders",e).then((function(e){t.$store.commit("SET_ORDERS",e)})).catch((function(t){return console.log(t)})),t.$router.push("/user/".concat(t.$store.state.user.slug,"/orders/domestic?listorders=true"))})).catch((function(e){t.$store.commit("logServerErr",e.response.data.message)}))},checkFormValidity:function(){var t=this.$refs.form.checkValidity();if(this.form.password.length>5)return this.valid=t,t},handleOk:function(t){t.preventDefault(),this.handleSubmit()},handleSubmit:function(){var t=this;if(this.checkFormValidity()){var e={cart:this.cart,user:this.form,currency:this.currency,reference:this.reference,deliverymethod:this.delivery,total:this.percentage(this.totalItemPrice,this.fee),date:new Date};this.$store.dispatch("registerUser",{firstname:this.form.firstname,lastname:this.form.lastname,email:this.form.email,phone:this.form.phone,password:this.form.password}).then((function(e){t.$store.commit("SUCCESS",e),t.$store.dispatch("loginUser",{email:t.form.email,password:t.form.password}).then((function(e){localStorage.setItem("accessToken",e.accessToken),t.$store.dispatch("Authenticate_User",e.accessToken).then((function(e){var s={message:"Login was successfully",user:e[0]};t.$store.commit("SUCCESS",s),localStorage.setItem("isAuthorized",!0)}))}))})).then((function(){return t.modalShow=!0})).then((function(){t.$store.dispatch("initTransaction",e).then((function(e){t.authorization_url=e.data.authorization_url,t.reference=e.data.reference})).then((function(){return t.$refs["paymentModal"].show()})).then((function(){var e={cart:t.cart,user:t.form,currency:t.currency,deliverymethod:t.delivery,total:t.percentage(t.totalItemPrice,t.fee),reference:t.reference,date:new Date};t.checkTransaction=setInterval((function(){t.$store.dispatch("verifyPayment",e).then((function(e){"status"===e.data.status?(console.log("success"),t.stopTransactionCheck()):console.log("not verifed!")}))}),5e3)})).catch((function(e){return t.$store.commit("logServerErr",e.response.data.message)}))})).catch((function(e){return t.$store.commit("logServerErr",e.response.data.message)})),this.$nextTick((function(){t.$bvModal.hide("modal-prevent-closing")}))}},loginNewUser:function(){var t=this;this.$store.dispatch("emptyCart",localStorage.getItem("guest_id")).then((function(){return t.$store.commit("EMPTY_CART")})).then((function(){t.$store.commit("RESET"),t.$router.push("/user/".concat(t.$store.state.user.slug,"/orders/domestic?listorders=true"))})).catch((function(e){return t.$store.commit("logServerErr",e.response.data.message)}))},percentage:function(t,e){var s=t/100*e;return parseInt(s)+parseInt(t)},makeToast:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1?arguments[1]:void 0,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.toastCount++,this.$bvToast.toast("".concat(e),{title:"Transaction Status",variant:t,solid:!0,autoHideDelay:6e3,appendToast:s})},convertCurrency:function(t){var e=this.settings.rates[0].d_to_n;return Math.round(1e3*t/e/1e3)}}},f=m,p=(s("db03"),s("2877")),h=Object(p["a"])(f,r,a,!1,null,"782cac84",null);e["default"]=h.exports},"83cf":function(t,e,s){},db03:function(t,e,s){"use strict";var r=s("83cf"),a=s.n(r);a.a}}]);
//# sourceMappingURL=chunk-60902aa8.fe20ce4c.js.map