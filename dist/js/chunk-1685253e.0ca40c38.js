(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1685253e"],{"02f4":function(t,e,r){var n=r("4588"),o=r("be13");t.exports=function(t){return function(e,r){var a,c,s=String(o(e)),i=n(r),l=s.length;return i<0||i>=l?t?"":void 0:(a=s.charCodeAt(i),a<55296||a>56319||i+1===l||(c=s.charCodeAt(i+1))<56320||c>57343?t?s.charAt(i):a:t?s.slice(i,i+2):c-56320+(a-55296<<10)+65536)}}},"0390":function(t,e,r){"use strict";var n=r("02f4")(!0);t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},"207e":function(t,e,r){"use strict";var n=r("f058"),o=r.n(n);o.a},"214f":function(t,e,r){"use strict";r("b0c5");var n=r("2aba"),o=r("32e9"),a=r("79e5"),c=r("be13"),s=r("2b4c"),i=r("520a"),l=s("species"),u=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();t.exports=function(t,e,r){var p=s(t),f=!a((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),h=f?!a((function(){var e=!1,r=/a/;return r.exec=function(){return e=!0,null},"split"===t&&(r.constructor={},r.constructor[l]=function(){return r}),r[p](""),!e})):void 0;if(!f||!h||"replace"===t&&!u||"split"===t&&!d){var b=/./[p],g=r(c,p,""[t],(function(t,e,r,n,o){return e.exec===i?f&&!o?{done:!0,value:b.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}})),v=g[0],m=g[1];n(String.prototype,t,v),o(RegExp.prototype,p,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}}},"24c0":function(t,e,r){"use strict";var n=r("b66b"),o=r.n(n);o.a},"29e5":function(t,e,r){},"2f21":function(t,e,r){"use strict";var n=r("79e5");t.exports=function(t,e){return!!t&&n((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"3a38e":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-row",{attrs:{cols:"1","cols-sm":"2","cols-md":"2","cols-lg":"4"}},[r("b-col",[r("content-placeholders",{attrs:{rounded:!0}},[r("content-placeholders-img"),r("content-placeholders-text",{attrs:{lines:2}})],1)],1),r("b-col",[r("content-placeholders",{attrs:{rounded:!0}},[r("content-placeholders-img"),r("content-placeholders-text",{attrs:{lines:2}})],1)],1),r("b-col",[r("content-placeholders",{attrs:{rounded:!0}},[r("content-placeholders-img"),r("content-placeholders-text",{attrs:{lines:2}})],1)],1),r("b-col",[r("content-placeholders",{attrs:{rounded:!0}},[r("content-placeholders-img"),r("content-placeholders-text",{attrs:{lines:2}})],1)],1)],1)],1)},o=[],a={name:"Loading"},c=a,s=r("2877"),i=Object(s["a"])(c,n,o,!1,null,"7b79c304",null);e["a"]=i.exports},4917:function(t,e,r){"use strict";var n=r("cb7c"),o=r("9def"),a=r("0390"),c=r("5f1b");r("214f")("match",1,(function(t,e,r,s){return[function(r){var n=t(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,n):new RegExp(r)[e](String(n))},function(t){var e=s(r,t,this);if(e.done)return e.value;var i=n(t),l=String(this);if(!i.global)return c(i,l);var u=i.unicode;i.lastIndex=0;var d,p=[],f=0;while(null!==(d=c(i,l))){var h=String(d[0]);p[f]=h,""===h&&(i.lastIndex=a(l,o(i.lastIndex),u)),f++}return 0===f?null:p}]}))},"4aff":function(t,e,r){"use strict";var n=r("c97d"),o=r.n(n);o.a},"520a":function(t,e,r){"use strict";var n=r("0bfb"),o=RegExp.prototype.exec,a=String.prototype.replace,c=o,s="lastIndex",i=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t[s]||0!==e[s]}(),l=void 0!==/()??/.exec("")[1],u=i||l;u&&(c=function(t){var e,r,c,u,d=this;return l&&(r=new RegExp("^"+d.source+"$(?!\\s)",n.call(d))),i&&(e=d[s]),c=o.call(d,t),i&&c&&(d[s]=d.global?c.index+c[0].length:e),l&&c&&c.length>1&&a.call(c[0],r,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(c[u]=void 0)})),c}),t.exports=c},"55dd":function(t,e,r){"use strict";var n=r("5ca1"),o=r("d8e8"),a=r("4bf8"),c=r("79e5"),s=[].sort,i=[1,2,3];n(n.P+n.F*(c((function(){i.sort(void 0)}))||!c((function(){i.sort(null)}))||!r("2f21")(s)),"Array",{sort:function(t){return void 0===t?s.call(a(this)):s.call(a(this),o(t))}})},"5f1b":function(t,e,r){"use strict";var n=r("23c6"),o=RegExp.prototype.exec;t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var a=r.call(t,e);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==n(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"7bea":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"newsletter-area"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row justify-content-between"},[r("div",{staticClass:"col-12 col-lg-6"},[t._m(0),r("div",{staticClass:"newsletter-form"},[r("form",[r("input",{staticClass:"nl-email",attrs:{placeholder:"Your E-mail"}}),r("b-button",{attrs:{variant:"primary"},on:{click:function(e){return e.preventDefault(),t.haSubmit(e)}}},[r("b-icon",{attrs:{icon:"envelope"}}),t._v(" Submit")],1)],1)])]),r("div",{staticClass:"col-12 col-lg-4"})])])])},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"newsletter-text"},[r("h2",[t._v("Join our Newsletter")]),r("p",[t._v("Nulla ac convallis lorem, eget euismod nisl. bibendum nec.")])])}],a={name:"Newsletter",methods:{haSubmit:function(){return alert("Thank you for subscribing")}}},c=a,s=(r("fe2c"),r("2877")),i=Object(s["a"])(c,n,o,!1,null,"21832cb2",null);e["a"]=i.exports},"912f":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("transition-group",{staticClass:"row row-cols-1 row-cols-sm-2 row-cols-md-4",attrs:{name:"fade",tag:"div"}},t._l(t.CardArray,(function(e){return r("div",{key:e._id,staticClass:"col pb-3 card-col",style:t.cardColumn},[r("router-link",{attrs:{to:{name:"Product",params:{id:e.slug}}}},[r("div",{staticClass:"card m-1"},[r("b-img-lazy",t._b({staticStyle:{"margin-bottom":"0 !important","margin-top":"0 !important"},attrs:{src:e.thumbnail,alt:"Card image"}},"b-img-lazy",t.mainProps,!1)),r("div",{staticClass:"card-body product-card text-left"},[r("h6",{staticClass:"card-title"},[t._v(t._s(t._f("truncate")(e.name,15,"...")))]),r("h4",{staticClass:"card-text color-primary"},[t.d_to_n?r("strong",[t._v(t._s(t._f("toCurrency")(t.convertCurrency(e.price))))]):r("strong",[t._v(t._s(t._f("toCurrency")(e.price)))])])])],1)]),r("b-collapse",{staticClass:"show",attrs:{id:"collapse-2"}},[t.inCart(e._id)?r("b-button",{attrs:{disabled:"",type:"button",variant:"primary"}},[t._v("\n          Added "),r("b-icon",{attrs:{icon:"check2-circle"}})],1):r("b-button",{attrs:{type:"button",variant:"primary"},on:{click:function(r){return t.addtoCart(e)}}},[r("b-icon",{attrs:{icon:"cart3"}}),t._v("Add to Cart\n        ")],1)],1)],1)})),0)],1)},o=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),c=r("2f62");function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l={props:["CardArray","cardColumn"],name:"Card",data:function(){return{converted:null,currency:"",mainProps:{center:!0,fluidGrow:!0,blank:!0,blankColor:"#eee",width:600,height:400,class:"my-5"}}},mounted:function(){this.currency=this.currencyType.currency},computed:i({},Object(c["d"])(["currencyType","user","cart","settings","d_to_n"])),methods:i(i({},Object(c["b"])(["addToCart"])),{},{addtoCart:function(t){!localStorage.getItem("accessToken")&&localStorage.getItem("guest_id")?this.addToCart({product:t,qty:1,totalprice:t.price,user:{_id:localStorage.getItem("guest_id"),name:"Guest"}}):localStorage.getItem("accessToken")&&this.addToCart({product:t,qty:1,totalprice:t.price,user:{_id:this.$store.state.user._id,email:this.$store.state.user.email,name:this.$store.getters.fullname}})},inCart:function(t){var e=this.cart.filter((function(e){return e.product._id===t}));return e.length>0},convertCurrency:function(t){var e=this.settings.rates[0].d_to_n;return Math.round(1e3*t/e/1e3)}})},u=l,d=(r("24c0"),r("2877")),p=Object(d["a"])(u,n,o,!1,null,"602bcd10",null);e["a"]=p.exports},b0c5:function(t,e,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},b66b:function(t,e,r){},b860:function(t,e,r){},bb51:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Header"),r("Carousel",{attrs:{categoryOption:t.categoryOption}}),r("Productlist",{staticClass:"container",attrs:{productsInNigeria:t.productsInNigeria,productsIn1688:t.productsIn1688,categories:t.categories}}),r("Newsletter"),r("Footer",{attrs:{categories:t.categories}})],1)},o=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),c=r("62a6"),s=r("7bea"),i=r("80ce"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("section",[t.load?r("lazy-component",[r("img",{staticClass:"mini-cover",attrs:{src:"https://placehold.it/1321x583",width:"100%",height:"400"}})]):t._e(),r("mdb-carousel",{attrs:{items:t.banner,interval:5e3,controlls:"",indicators:""}})],1),r("section",{staticClass:"search-sec"},[r("div",{staticClass:"field has-addons"},[r("p",{staticClass:"control"},[r("span",{staticClass:"select"},[r("b-form-select",{scopedSlots:t._u([{key:"first",fn:function(){return[r("b-form-select-option",{attrs:{value:null,disabled:""}},[t._v("-select category-")])]},proxy:!0}]),model:{value:t.searchedCategory,callback:function(e){t.searchedCategory=e},expression:"searchedCategory"}},t._l(t.categories,(function(e){return r("b-form-select-option",{key:e._id,attrs:{value:e._id}},[t._v(t._s(e.categoryName))])})),1)],1)]),r("p",{staticClass:"control is-expanded"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],ref:"keyword",staticClass:"input",attrs:{type:"search",placeholder:"Search Marpe Product eg: mobile phone"},domProps:{value:t.keyword},on:{keydown:[t.searchFor,function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchEntered(e)}],input:function(e){e.target.composing||(t.keyword=e.target.value)}}})]),r("p",{staticClass:"control"},[r("a",{staticClass:"button",on:{click:t.searchFor}},[r("b-icon",{attrs:{icon:"search"}})],1)])]),r("b-collapse",{attrs:{id:"collapse-2"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},t._l(t.searchedResult,(function(e,n){return r("b-card",{key:n,staticClass:"overflow-hidden resultCard",attrs:{"no-body":""}},[r("router-link",{staticClass:"text-muted py-2",attrs:{to:{name:"Product",params:{id:e.slug}}}},[t._v(t._s(t._f("truncate")(e.name,100,"...")))]),r("div",{staticClass:"text-primary"},[t._v(t._s(t.searchedResult.length)+" Results")])],1)})),1)],1)])},u=[],d=(r("7f7f"),r("96cf"),r("3b8d")),p=r("91c9"),f=r("2f62");function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var g={name:"Carousel",props:["categoryOption"],components:{mdbCarousel:p["mdbCarousel"]},data:function(){return{mainProps:{center:!0,fluidGrow:!0,blank:!0,blankColor:"#eee",width:50,height:50,class:""},banner:[{src:"https://placehold.it/1321x583",img:!0}],visible:!0,load:!0,keyword:"",searchedResult:[],searchedCategory:null}},created:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.watch((function(t){return console.log(t),e.$store.state.settings}),(function(t,r){console.log(r),e.banner=t.homebanner,e.load=!1}));case 2:return t.next=4,this.settings.homebanner;case 4:this.banner=t.sent,this.banner.length>0&&(this.load=!1);case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),watch:{keyword:function(t){this.visible=""!==t},searchedResult:function(t){!t.length>0?this.visible=!1:this.visible=!0}},mounted:function(){},computed:b(b({},Object(f["d"])(["log","settings","categories"])),Object(f["c"])(["allMarpeProducts"])),methods:{searchFor:function(){var t,e=this,r=this;if(null!==this.searchedCategory){var n=this.allMarpeProducts.filter((function(t){return t.categoryId===e.searchedCategory}));t=n.filter((function(t){return t.name.toLowerCase().indexOf(r.keyword.toLowerCase())>=0})),t.length>5?this.searchedResult=t.slice(0,5):this.searchedResult=t,console.log(this.searchedResult)}else t=this.allMarpeProducts.filter((function(t){return t.name.toLowerCase().indexOf(r.keyword.toLowerCase())>=0})),t.length>5?this.searchedResult=t.slice(0,5):this.searchedResult=t},searchEntered:function(){this.$refs.keyword.value.length>3&&this.$router.push({name:"Search",query:{q:this.keyword}})}}},v=g,m=(r("207e"),r("2877")),y=Object(m["a"])(v,l,u,!1,null,"701b8329",null),C=y.exports,w=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Grid",{attrs:{productsInNigeria:t.productsInNigeria,productsIn1688:t.productsIn1688,categories:t.categories}})],1)},O=[],_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-xl grid p-0"},[r("div",{staticClass:"row justify-content-around m-0"},[r("div",{staticClass:"row col-6 pb-4 p-0 m-0"},[r("div",{staticClass:"dropdown"},[r("a",{staticClass:"btn btn-light dropdown-toggle",attrs:{role:"button",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("\n          SORT BY\n          "),r("span",{staticStyle:{color:"#ea5376"}},[t._v(t._s(t.sortButton))])]),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},[r("a",{staticClass:"dropdown-item",on:{click:t.sortDate}},[t._v("DATE")]),r("a",{staticClass:"dropdown-item",on:{click:t.sortPrice}},[t._v("PRICE")]),r("a",{staticClass:"dropdown-item",on:{click:t.sortTrend}},[t._v("TRENDS")]),r("a",{staticClass:"dropdown-item",on:{load:t.reSet1688}},[t._v("DEFAULT")])])])]),r("div",{staticClass:"row col-6 flex-row-reverse p-0"},[r("div",{staticClass:"view-button"},[r("div",{staticClass:"dropdown"},[r("button",{staticClass:"btn btn-light dropdown-toggle d-block d-lg-none d-xl-none",attrs:{role:"button",id:"MenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("CATAGORIES")]),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"MenuLink"}},[t._l(t.categories,(function(e){return r("span",{key:e._id},[r("a",{staticClass:"dropdown-item",on:{click:function(r){return t.sortI(e._id)}}},[t._v(t._s(e.categoryName))])])})),r("div",{staticClass:"dropdown-divider"}),r("a",{staticClass:"dropdown-item",on:{click:t.reSetNigeria}},[t._v("Reset")])],2)])])]),r("div",{staticClass:"row justify-content-around m-0"},[r("div",{staticClass:"col col-xl-3 col-lg-3 d-none d-lg-block d-xl-block p-0"},[r("div",{staticClass:"card-selector mr-3"},[r("div",{staticClass:"card-body p-4"},[r("div",{staticClass:"search-title"},[r("h4",[t._v("Catagories +")]),r("br"),t.log.loading?r("content-placeholders",[r("content-placeholders-text",{attrs:{lines:3}})],1):t._e(),t._l(t.categories,(function(e){return r("p",{key:e._id,staticClass:"pb-3"},[r("router-link",{attrs:{to:{name:"Category",params:{id:e.categoryName}}}},[t._v("\n                  "+t._s(e.categoryName)+"\n                  ("+t._s(e.items)+")\n                ")])],1)}))],2)])])]),r("div",{staticClass:"row col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 text-center"},[r("Breadc",{attrs:{label:"Products Available in Our Nigerian Warehouse"}}),0==this.productsInNigeria?r("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 card-section"},[t.log.loading?r("Loading"):t._e(),t.log.loading?t._e():r("p",{staticClass:"text-muted",staticStyle:{"margin-left":"9rem","margin-right":"9rem"}},[t._v("Sorry, we can't find a product in Nigerian Warehouse")])],1):t._e(),r("Card",{attrs:{CardArray:t.slicedNigeriaCards,cardColumn:t.cardColumn}}),r("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4"},[r("b-button",{attrs:{type:"button",variant:"outline"},on:{click:t.incNigCardNumber}},[t._v("More +")])],1),r("Breadc",{attrs:{label:"Products On Preorders"}}),0==this.productsIn1688?r("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 card-section"},[t.log.loading?r("Loading"):t._e(),t.log.loading?t._e():r("p",{staticClass:"text-muted",staticStyle:{"margin-left":"9rem","margin-right":"9rem"}},[t._v("Sorry, we can't find a product in 1688")])],1):t._e(),r("Card",{attrs:{CardArray:t.slicedCards1688,cardColumn:t.cardColumn}}),r("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4"},[r("b-button",{attrs:{type:"button",variant:"outline"},on:{click:t.inc1688CardNumber}},[t._v("More +")])],1)],1)])])])},x=[],j=(r("4917"),r("55dd"),r("d18b")),k=r("e323"),P=r("3a38e"),I=r("912f");function N(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function E(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?N(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var S={props:["productsInNigeria","productsIn1688","categories"],name:"Grid",components:{Card:I["a"],Breadc:k["a"],Skeleton:j["a"],Loading:P["a"]},data:function(){return{showNigCards:6,show1688Cards:6,sortButton:"DEFAULT",cardColumn:{}}},computed:E(E({},Object(f["d"])(["log"])),{},{slicedNigeriaCards:function(){return this.productsInNigeria.slice(0,this.showNigCards)},slicedCards1688:function(){return this.productsIn1688.slice(0,this.show1688Cards)}}),methods:{incNigCardNumber:function(){return this.showNigCards+=6},inc1688CardNumber:function(){return this.show1688Cards+=6},sortDate:function(){return this.productsInNigeria.sort((function(t,e){return 2*t.created.length-4*e.created.length})),this.sortButton="DATE"},sortPrice:function(){return this.productsInNigeria.sort((function(t,e){return t.price-e.price})),this.sortButton="PRICE"},sortTrend:function(){return this.productsInNigeria.sort((function(t,e){return t.label.length-e.label.length})),this.sortButton="TRENDING"},sortI:function(t){this.productsInNigeria=this.productsInNigeria.filter((function(e){return e.categoryId.match(t)})),this.productsIn1688=this.productsIn1688.filter((function(e){return e.categoryId.match(t)})),1===this.productsInNigeria.length||1===this.productsIn1688.length?this.cardColumn={flex:"0 0 36.66666%","max-width":"36.66666%"}:this.cardColumn={}},reSetNigeria:function(){return this.productsInNigeria=this.productsInNigeria},reSet1688:function(){return this.productsIn1688=this.productsIn1688}}},R=S,D=(r("4aff"),Object(m["a"])(R,_,x,!1,null,"21b81e4e",null)),T=D.exports,$={components:{Grid:T},name:"Productlist",props:["productsInNigeria","productsIn1688","categories"]},A=$,L=Object(m["a"])(A,w,O,!1,null,"572c2636",null),B=L.exports;function M(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function F(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?M(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var G={components:{Header:c["a"],Newsletter:s["a"],Footer:i["a"],Carousel:C,Productlist:B},data:function(){return{d_to_n:!1,options:[]}},watch:{$route:function(t,e){console.log(e),"/?redirect=403"===t.path&&(this.$store.commit("FORBIDDEN"),location.reload())}},computed:F({categoryOption:function(){return this.categories.map((function(t){return{value:t._id,text:t.categoryName}}))}},Object(f["d"])(["settings","productsInNigeria","productsIn1688","categories"]))},q=G,z=(r("cccb"),Object(m["a"])(q,n,o,!1,null,null,null));e["default"]=z.exports},c97d:function(t,e,r){},cccb:function(t,e,r){"use strict";var n=r("d563"),o=r.n(n);o.a},d563:function(t,e,r){},e323:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{},[r("h5",{staticClass:"pb-4 text-center font-weight-bold",staticStyle:{color:"#b9b9b9"}},[t._v(t._s(t.label))])])},o=[],a={name:"Breadc",props:["label"]},c=a,s=(r("f262"),r("2877")),i=Object(s["a"])(c,n,o,!1,null,"aeab8c8a",null);e["a"]=i.exports},f058:function(t,e,r){},f262:function(t,e,r){"use strict";var n=r("b860"),o=r.n(n);o.a},fe2c:function(t,e,r){"use strict";var n=r("29e5"),o=r.n(n);o.a}}]);
//# sourceMappingURL=chunk-1685253e.0ca40c38.js.map