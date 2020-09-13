(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fdd4ff8e"],{"08ff":function(t,e,a){"use strict";var r=a("37d1"),s=a.n(r);s.a},"23dc":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{class:t.cClass},[a("div",{staticClass:"cart-menu"},[a("div",{staticClass:"d-flex justify-content-between pt-4"},[t._m(0),a("button",{staticClass:"btn btn-outline-light btn-sm",on:{click:function(e){return e.preventDefault(),t.emptyCart()}}},[a("i",{staticClass:"fa fa-remove"}),t._v(" Empty\n        ")])]),a("hr"),a("transition",{attrs:{name:"fade",tag:"div"}},[t.cart.length<0?a("div",{staticClass:"text-center font-italic"},[t._v("Your cart is empty, try to Add stuff.")]):t._e()]),t._l(t.cart,(function(e,r){return a("b-row",{key:r,staticClass:"p-3"},[a("b-col",{attrs:{cols:"10"}},[a("img",{staticClass:"mb-4",attrs:{src:e.product.thumbnail,width:"100"}}),a("h6",[t._v(t._s(e.product.name))]),a("h6",{staticClass:"bold"},[t._v("Qty: "+t._s(e.qty))]),a("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[t.d_to_n?a("h6",{staticClass:"text-white"},[t._v("\n              Price:\n              "),a("b",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(e.totalprice))))])]):a("h6",{staticClass:"text-white"},[t._v("\n              Price:\n              "),a("b",[t._v(t._s(t._f("toCurrency")(t.calculateItemTotal(e.product.price,e.qty))))])]),a("div",{staticClass:"control"},[a("button",{staticClass:"decrement-button",staticStyle:{border:".5px solid white",background:"none",color:"white"},on:{click:function(a){return t.dec(e.product._id,e._id)}}},[t._v("−")]),a("div",{staticClass:"px-2"},[t._v(t._s(t.itemQty(e.product._id)))]),a("button",{staticClass:"increment-button",staticStyle:{border:".5px solid white",background:"none",color:"white"},on:{click:function(a){return t.inc(e.product._id,e._id)}}},[t._v("+")]),a("br"),a("br")])])]),a("b-col",{attrs:{cols:"2"}},[a("span",{staticClass:"remove-btn",on:{click:function(a){return a.preventDefault(),t.removeCartItem(e.product)}}},[t._v("remove")])]),a("hr")],1)})),t.cart.length>0?a("div",{staticClass:"row justify-content-between",staticStyle:{background:"rgb(0 0 0 / 24%)",padding:"10px 10px 10px 10px"}},[t._m(1),a("div",{staticClass:"flex-column pr-3"},[t.d_to_n?a("h4",[a("b",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(t.totalItemPrice))))])]):a("h4",[a("b",[t._v(t._s(t._f("toCurrency")(t.totalItemPrice)))])])])]):t._e(),t.cart.length>0?a("transition",{attrs:{tag:"button",name:"fade"}},[a("router-link",{staticClass:"btn btn-primary btn-lg btn-block text-white",attrs:{to:"/checkout"}},[a("b-icon",{attrs:{icon:"cart-check"}}),t._v("Checkout\n        ")],1)],1):t._e()],2)]),a("div",{class:t.modalClass,on:{click:t.cartON}})])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h5",[a("b",[t._v("Cart")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-column pl-3"},[a("h4",[t._v("Total")])])}],i=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),n=a("2f62");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var l={name:"Cart",data:function(){return{quan:1,cClass:"cart",modalClass:"modal off"}},computed:o(o({},Object(n["d"])(["cart","user","currency","settings","d_to_n"])),Object(n["c"])(["totalItemPrice"])),methods:o(o({},Object(n["b"])(["removeCartItem"])),{},{emptyCart:function(){var t=this,e=localStorage.getItem("accessToken"),a=localStorage.getItem("guest_id");!e&&a?this.$store.dispatch("emptyCart",a).then((function(){return t.$store.commit("EMPTY_CART")})):e&&this.$store.dispatch("emptyCart",this.$store.state.user._id).then((function(){return t.$store.commit("EMPTY_CART")}))},cartON:function(){"cart on"===this.cClass?(this.cClass="cart",this.modalClass="modal off"):(this.cClass="cart on",this.modalClass="modal")},calculateItemTotal:function(t,e){return t*e},inc:function(t,e){var a=this;if(this.itemQty(t)<=100){var r={_id:e,action:"increment"};this.$store.dispatch("updateProductQty",r).then((function(){a.$store.commit("INC",t)})).catch((function(t){return a.$store.commit("logServerErr",t.response.data.message)}))}},dec:function(t,e){var a=this;if(this.itemQty(t)>=2){var r={_id:e,action:"decrement"};this.$store.dispatch("updateProductQty",r).then((function(){a.$store.commit("DEC",t)})).catch((function(t){return a.$store.commit("logServerErr",t.response.data.message)}))}},itemQty:function(t){var e=this.cart.filter((function(e){return e.product._id===t}));return e.length>0?e[0].qty:1},convertCurrency:function(t){var e=this.settings.rates[0].d_to_n;return Math.round(1e3*t/e/1e3)}})},u=l,d=(a("c9c9"),a("2877")),v=Object(d["a"])(u,r,s,!1,null,"8eedf3e4",null);e["a"]=v.exports},"37d1":function(t,e,a){},"5cd5":function(t,e,a){"use strict";var r=a("b930"),s=a.n(r);s.a},"62a6":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-flex"},[a("div",{staticClass:"utility-nav d-none d-md-block"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6"},[a("p",{staticClass:"small"},[a("b-icon",{attrs:{icon:"envelope"}}),t._v("support@marpe.online |\n            "),a("b-icon",{attrs:{icon:"phone"}}),t._v("+234 812 377 1335\n          ")],1)]),a("div",{staticClass:"col-12 col-md-6 text-right"},[a("p",{staticClass:"small"},[t._v("Free shipping on total of "+t._s(t._f("toCurrency")(1e3))+" of all products")])])])])]),a("nav",{staticClass:"navbar",attrs:{role:"navigation","aria-label":"main navigation"}},[t._m(0),a("div",{staticClass:"navbar-menu",attrs:{id:"navbarBasicExample"}},[a("div",{staticClass:"navbar-start"},[a("router-link",{staticClass:"navbar-item",attrs:{to:"/"}},[t._v("Home")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/category"}},[t._v("Products")]),a("div",{staticClass:"navbar-item has-dropdown is-hoverable"},[a("a",{staticClass:"navbar-link"},[t._v("Links")]),a("div",{staticClass:"navbar-dropdown"},[a("router-link",{staticClass:"navbar-item",attrs:{to:"/servicefee"}},[t._v("Service fee")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/costcalculator"}},[t._v("Cost converter")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/exchangerate"}},[t._v("Exchange rate")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/trackitems"}},[t._v("Track items")]),a("a",{staticClass:"navbar-item",attrs:{href:"https://procurement.marpe.online/blog",target:"_blank"}},[t._v("Blog")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/about"}},[t._v("About us")]),a("router-link",{staticClass:"navbar-item",attrs:{to:"/contact"}},[t._v("Contact us")]),a("hr",{staticClass:"navbar-divider"}),a("a",{staticClass:"navbar-item"},[t._v("Report an issue")])],1)])],1),a("div",{staticClass:"navbar-end"},[a("div",{staticClass:"navbar-item has-dropdown is-hoverable"},[a("a",{staticClass:"navbar-link"},[t._v(t._s(t.currencyType.name))]),a("div",{staticClass:"navbar-dropdown"},t._l(t.getDollarNaira,(function(e,r){return a("a",{key:r,staticClass:"navbar-item",on:{click:function(a){return t.changeCurrency(e.currency)}}},[t._v(t._s(e.name))])})),0)]),t.log.isUserActive?a("div",{staticClass:"navbar-item"},[a("div",{staticClass:"navbar-item has-dropdown is-hoverable"},[a("a",{staticClass:"navbar-link"},[a("b-icon",{attrs:{icon:"person"}}),t._v("\n              "+t._s(t.user.firstname)+"\n            ")],1),a("div",{staticClass:"navbar-dropdown"},[a("router-link",{staticClass:"navbar-item",attrs:{to:"/user/"+t.user.slug+"/overview?welcome=true"}},[a("b-icon",{attrs:{icon:"grid1x2"}}),t._v(" Dashboard\n              ")],1),a("router-link",{staticClass:"navbar-item",attrs:{to:"/user/"+t.user.slug+"/wishlist"}},[a("b-icon",{attrs:{icon:"heart"}}),t._v(" My Wishlist\n              ")],1),a("div",{staticClass:"navbar-item logout",on:{click:t.logout}},[a("b-icon",{attrs:{icon:"power"}}),t._v(" Logout\n              ")],1)],1)])]):a("div",{staticClass:"navbar-item"},[a("div",{staticClass:"buttons"},[a("router-link",{staticClass:"button is-primary text-white",attrs:{to:"/register"}},[a("b",[t._v("Sign up")])]),a("router-link",{staticClass:"button is-light",attrs:{to:"/login"}},[t._v("Log in")])],1)]),a("div",{staticClass:"bag navbar-item",on:{click:t.openCart}},[a("div",{staticClass:"pb-1"},[a("b-icon",{attrs:{icon:"cart3","font-scale":"2"}})],1),t.cart.length>0?a("span",{staticClass:"mb-3"},[t._v(t._s(t.cart.length))]):t._e()])])])]),a("sideCart",{ref:"cartMove"})],1)},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"navbar-brand"},[r("a",{staticClass:"navbar-item",attrs:{href:"/"}},[r("img",{attrs:{src:a("cf05"),width:"auto",height:"50"}})]),r("a",{staticClass:"navbar-burger burger",attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample"}},[r("span",{attrs:{"aria-hidden":"true"}}),r("span",{attrs:{"aria-hidden":"true"}}),r("span",{attrs:{"aria-hidden":"true"}})])])}],i=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),n=a("23dc"),c=a("2f62");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={name:"Header",components:{sideCart:n["a"]},data:function(){return{comfirmPassword:""}},computed:l(l({},Object(c["d"])(["user","cart","log","settings","currencyType"])),Object(c["c"])(["getDollarNaira"])),methods:{changeCurrency:function(t){var e=this,a=this.currencyType.currency;this.$store.dispatch("changeCurrency",{newCurrency:t,currentCurrency:a}).then((function(t){return e.$store.commit("CHANGE_CURRENCY",t)})).catch((function(t){return console.error(t)}))},openCart:function(){this.$refs.cartMove.cartON()},logout:function(){this.$store.dispatch("logoutUser").then((function(){localStorage.removeItem("isAuthorized"),location.reload()}))}}},d=u,v=(a("5cd5"),a("2877")),b=Object(v["a"])(d,r,s,!1,null,null,null);e["a"]=b.exports},"80ce":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"footer_area bg-white"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row justify-content-between"},[a("div",{staticClass:"col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3"},[a("div",{staticClass:"footer-widget"},[a("div",{staticClass:"footer-title"},[t._v("Quick link")]),a("ul",{staticClass:"list-unstyled"},[a("router-link",{attrs:{to:"/servicefee"}},[a("li",[t._v("Service Fee")])]),a("router-link",{attrs:{to:"/costconverter"}},[a("li",[t._v("Cost converter")])]),a("router-link",{attrs:{to:"/track"}},[a("li",[t._v("Track items")])]),a("router-link",{attrs:{to:"/about"}},[a("li",[t._v("About us")])]),a("router-link",{attrs:{to:"/contact"}},[a("li",[t._v("contact us")])]),a("router-link",{attrs:{to:"/faqs"}},[a("li",[t._v("FAQs")])])],1)])]),a("div",{staticClass:"col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3"},[a("div",{staticClass:"footer-widget"},[a("div",{staticClass:"footer-title"},[t._v("Collection")]),a("ul",{staticClass:"list-unstyled"},[a("router-link",{attrs:{to:"#"}},[a("li",[t._v("Products Available in Our Nigerian Warehouse")])]),a("router-link",{attrs:{to:"#"}},[a("li",[t._v("Products On Preorders")])])],1)])]),a("div",{staticClass:"col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3"},[a("div",{staticClass:"footer-widget"},[a("div",{staticClass:"footer-title"},[t._v("Catagories")]),t._l(t.slicedCat,(function(e){return a("ul",{key:e._id,staticClass:"list-unstyled"},[a("router-link",{attrs:{to:"#"}},[a("li",[t._v(t._s(e.categoryName))])])],1)}))],2)]),t._m(0)]),a("div",{staticClass:"row justify-content-between"},[t._m(1),a("div",{staticClass:"col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 text-right"},[a("div",{staticClass:"social-info"},[a("strong",[t._v("Get social")]),a("a",{staticClass:"p-1",attrs:{href:"https://www.facebook.com/marpe.online/",target:"_blank"}},[a("mdb-icon",{attrs:{fab:"",icon:"facebook-square",size:"lg"}})],1),a("a",{staticClass:"p-1",attrs:{href:"https://twitter.com/onlinemarpe",target:"_blank"}},[a("mdb-icon",{attrs:{fab:"",icon:"twitter-square",size:"lg"}})],1),a("a",{staticClass:"p-1",attrs:{href:"https://www.linkedin.com/company/marpe-online-limited",target:"_blank"}},[a("mdb-icon",{attrs:{fab:"",icon:"linkedin",size:"lg"}})],1),a("a",{staticClass:"p-1",attrs:{href:"https://www.instagram.com/marpe.online/",target:"_blank"}},[a("mdb-icon",{attrs:{fab:"",icon:"instagram",size:"lg"}})],1)])])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 col-xl-6 col-lg-3 col-md-3 col-sm-12 text-left text-md-right pb-5"},[a("div",{staticClass:"footer-widget"},[a("h4",[t._v("Port Harcourt Rivers State, Nigeria")]),a("a",{attrs:{href:"mailto:support@marpe.online"}},[t._v("support@marpe.online")]),a("h6",[t._v("+234 812 377 1335")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6"},[a("div",{staticClass:"tiny-footer"},[a("p",[t._v("Copyright © All Rights Reserved 2020 ")])])])}],i=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),n=a("91c9"),c=a("2f62");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={name:"Footer",props:["categories"],components:{mdbIcon:n["mdbIcon"]},computed:l({},Object(c["c"])(["slicedCat"]))},d=u,v=(a("08ff"),a("2877")),b=Object(v["a"])(d,r,s,!1,null,"fe739152",null);e["a"]=b.exports},b930:function(t,e,a){},c9c9:function(t,e,a){"use strict";var r=a("e7ae"),s=a.n(r);s.a},cf05:function(t,e,a){t.exports=a.p+"img/logo.434fe046.png"},e7ae:function(t,e,a){}}]);
//# sourceMappingURL=chunk-fdd4ff8e.4dfc2c55.js.map