(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-170770c6"],{"43e3":function(t,e,r){"use strict";var a=r("bf1e"),s=r.n(a);s.a},"4c13":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"contentWrapper",staticClass:"content-wrapper"},[r("b-container",{attrs:{fluid:""}},[r("Breadcrumb",{attrs:{items:t.items,id:t.user.slug}}),r("b-card",{attrs:{"no-body":""}},[r("b-tabs",{attrs:{card:""}},[r("b-tab",{attrs:{title:"Referral Code",active:""}},[r("div",{staticClass:"d-flex justify-content-between align-center"},[r("h4",[t._v("Tips")]),r("span",[r("b-badge",{attrs:{pill:"",variant:"primary"}},[t._v("Referral Code")]),r("h4",[t._v(t._s(t.user.referralcode))])],1)]),r("hr"),r("p",{staticClass:"text-break"},[t._v('The referral code above is your Marpe affiliated code. This is specific to you and is a public link. You can freely share it on your blog/website, Facebook, Twitter, Instagram, Forums and other places. Visitors that registered on Chrisvicmall through your Affiliate link are called "Fish". When any of those visitors(Fish) proceed to use any of Chrisvicmall service (Procurement or Shipping) then you will be paid 1% of after expenses. You can be able to monitor your Affiliate earning from your dashboard under "Affiliate Program" menu')]),r("h4",[t._v("Earning & Payments")]),r("p",{staticClass:"text-break"},[t._v("You earn 1% lifetime commission on customers that registered and used Chrisvicmall service through your affiliate link. The earnings are credited to your Chrisvicmall Wallet and they accumulate there. Your account must be at least $5 before you can be able to make a withdrawal.")]),r("h4",[t._v("Teams & Conditions")]),r("ul",{},[r("li",[t._v("You can invite anyone as long as they are not already registered with Chrisvicmall.com")]),r("li",[t._v("Please do not spam people with invites. We take spam reports very seriously and it might lead to account suspension.")])])]),r("b-tab",{attrs:{title:"Total Affliate ("+t.totalAffiliate+")"}},[t.totalAffiliate>0?r("b-card-text",[r("b-list-group",t._l(t.user.affiliates,(function(e){return r("b-list-group-item",{key:e.email,staticStyle:{border:"none"}},[r("b-avatar",{attrs:{size:"20px"}}),r("strong",[t._v("\n                  "+t._s(e.affiliate_email)+"\n                  "),r("br"),r("small",[r("span",{staticClass:"indicator text-primary d-none d-lg-block"},[r("b-icon",{attrs:{icon:"circle-fill","font-scale":"0.5"}}),t._v("\n                          Joined: "+t._s(e.date)+"\n                  ")],1)])])],1)})),1)],1):t._e(),r("b-card-text",{staticClass:"p-3"},[r("p",[t._v("you have not referred anyone yet")])])],1),r("b-tab",{attrs:{title:"Earning History"}},[r("b-row",[r("b-col",[r("div",{staticClass:"d-flex justify-content-between align-items-center mb-3"},[r("b-form-group",{staticClass:"mb-0"},[r("b-form-select",{attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1),r("b-form-group",{staticClass:"mb-0"},[r("b-input-group",[r("b-form-input",{attrs:{type:"search",placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1)],1)],1)])],1),r("b-table",{attrs:{"show-empty":"",small:"",stacked:"md",items:t.transactions,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,filterIncludedFields:t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[t._v(t._s(e.value.first)+" "+t._s(e.value.last))]}},{key:"cell(actions)",fn:function(e){return[r("b-button",{attrs:{variant:"light",size:"sm"},on:{click:e.toggleDetails}},[t._v(t._s(e.detailsShowing?"Hide":"Show")+" Details")])]}},{key:"row-details",fn:function(e){return[r("b-card",[r("ul",t._l(e.item,(function(e,a){return r("li",{key:a},[t._v(t._s(e))])})),0)])]}}])}),r("b-row",[r("b-col",{staticClass:"my-1",attrs:{sm:"4",md:"2"}},[r("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1)],1)],1)],1),r("Footer"),t._m(0)],1)},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{staticClass:"scroll-to-top rounded",attrs:{href:"#page-top"}},[r("i",{staticClass:"fa fa-angle-up"})])}],i=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),n=r("5651"),o=r("6fa1"),l=r("2f62");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(i["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={name:"referral",components:{Breadcrumb:n["a"],Footer:o["a"]},data:function(){return{items:[{text:"Dashboard",href:"/user/"+this.id+"/"},{text:"Affiliate / Referral Program",href:"/user/"+this.id+"/referral"}],transactions:[],fields:[{key:"affiliate_email",label:"Affilate Email",sortable:!0},{key:"point",label:"Points",sortable:!0},{key:"date",label:"Referred Date",sortable:!0,class:"text-center"},{key:"actions",label:"Actions",class:"text-right"}],totalRows:1,currentPage:1,perPage:5,pageOptions:[5,10,15],sortBy:"",sortDesc:!1,filter:null,filterOn:[]}},mounted:function(){this.totalRows=this.transactions.length,this.transactions=this.user.affiliates},computed:u(u(u({},Object(l["d"])(["log","user"])),Object(l["c"])(["totalAffiliate"])),{},{sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}}),methods:{onFiltered:function(t){this.totalRows=t.length,this.currentPage=1}}},d=f,b=r("2877"),p=Object(b["a"])(d,a,s,!1,null,null,null);e["default"]=p.exports},5651:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-breadcrumb",{attrs:{items:t.items}})},s=[],i={props:["id","items"],data:function(){return{}}},n=i,o=(r("43e3"),r("2877")),l=Object(o["a"])(n,a,s,!1,null,null,null);e["a"]=l.exports},"6fa1":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("footer",{staticClass:"sticky-footer"},[r("div",{staticClass:"container"},[r("div",{staticClass:"text-center"},[r("small",[t._v("Copyright © Marpe Online Procument "+t._s(t.data))])])])])])},s=[],i={name:"referral",data:function(){return{data:(new Date).toDateString()}}},n=i,o=r("2877"),l=Object(o["a"])(n,a,s,!1,null,null,null);e["a"]=l.exports},bf1e:function(t,e,r){}}]);
//# sourceMappingURL=chunk-170770c6.87c5d815.js.map