import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const Home = () => import('@/views/Home.vue');
const Product = () => import('@/views/Product.vue');
const Category = () => import('@/views/Category.vue');
const Search = () => import('@/views/Search.vue');
const User = () => import('@/views/User.vue');
const Overview = () => import('@/views/Overview.vue');
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Contact = () => import('@/views/Contact.vue');
const About = () => import('@/views/About.vue');
const Checkout = () => import('@/views/Checkout.vue');
const Servicefee = () => import('@/views/Service_fee.vue');
const Costcalculator = () => import('@/views/Costcalculator.vue');
const Exchangerate = () => import('@/views/Exchangerate.vue');
const Trackitems = () => import('@/views/Track_items.vue');
const Faqs = () => import('@/views/Faqs.vue');
const Referral = () => import('@/views/Referral.vue');
const Wallet = () => import('@/views/Wallet.vue');
const Orders = () => import('@/views/Orders.vue');
const Domestic = () => import('@/views/Domestic.vue');
const Onlypurchesed = () => import('@/views/Onlypurchesed.vue');
const Onlyshipping = () => import('@/views/Onlyshipping.vue');
const Purchaseshipping = () => import('@/views/Purchaseshipping.vue');
const Account_history = () => import('@/views/Account_history.vue');
const Settings = () => import('@/views/Settings.vue');
const NotFound = () => import('@/views/404.vue');

//admin
const Admin = () => import('@/views/Admin.vue');
const Adminoverview = () => import('@/views/Adminoverview.vue');
const Adminusers = () => import('@/views/Adminusers.vue');
const Adminorders = () => import('@/views/Adminorders.vue');
const Adminproducts = () => import('@/views/Adminproducts.vue');
const Adminregister = () => import('@/views/Adminregister.vue');
const Adminlogin = () => import('@/views/Adminlogin.vue');

Vue.use(Router)
Vue.use(NProgress)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product,
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/user/:id',
      name: 'User',
      beforeEnter: routeAuth,
      component: User,
      meta: { title: 'Dashboard'},
      props: true,
      children: [
        {
          name: 'overview',
          path: 'overview',
          component: Overview,
          meta: { title: 'Overview', requiresAuth: true }
        },
        {
          name: 'referral',
          path: 'referral',
          component: Referral,
          meta: { title: 'Referral', requiresAuth: true }
        },
        {
          name: 'wallet',
          path: 'wallet',
          component: Wallet,
          meta: { title: 'My Wallet', requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { title: 'Order Placement', requiresAuth: true },
          children: [
            {
              name: 'domestic',
              path: 'domestic',
              component: Domestic,
              meta: { title: 'Domestic Shipping', requiresAuth: true }
            },
            {
              name: 'onlypurchesed',
              path: 'onlypurchesed',
              component: Onlypurchesed,
              meta: { title: 'Only purchesed', requiresAuth: true }
            },
            {
              name: 'onlyshipping',
              path: 'onlyshipping',
              component: Onlyshipping,
              meta: { title: 'Only shipping', requiresAuth: true }
            },
            {
              name: 'purchaseshipping',
              path: 'purchaseshipping',
              component: Purchaseshipping,
              meta: { title: 'Purchase shipping', requiresAuth: true }
            }
          ]
        },
        {
          name: 'account_history',
          path: 'account_history',
          component: Account_history,
          meta: { title: 'Account History', requiresAuth: true }
        },
        {
          name: 'settings',
          path: 'settings',
          component: Settings,
          meta: { title: 'Account Settings', requiresAuth: true }
        },
      ]
    },
    {
      path: '/admin/:id',
      name: 'Admin',
      beforeEnter: routeAuth,
      component: Admin,
      meta: { title: 'Dashboard'},
      props: true,
      children: [
        {
          name: 'adminoverview',
          path: 'overview',
          component: Adminoverview,
          meta: { title: 'Admin Overview', requiresAuth: true }
        },
        {
          name: 'users',
          path: 'users',
          component: Adminusers,
          meta: { title: 'All Users', requiresAuth: true }
        },
        {
          name: 'adminorders',
          path: 'orders',
          component: Adminorders,
          meta: { title: 'All Placed Orders', requiresAuth: true }
        },
        {
          name: 'products',
          path: 'products',
          component: Adminproducts,
          meta: { title: 'All Products', requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: isAuth,
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      beforeEnter: isAuth,
      component: Register
    },
    {
      path: '/adminlogin',
      name: 'Adminlogin',
      beforeEnter: isAuth,
      component: Adminlogin
    },
    {
      path: '/adminregister',
      name: 'Adminregister',
      beforeEnter: isAuth,
      component: Adminregister
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/servicefee',
      name: 'Servicefee',
      component: Servicefee
    },
    {
      path: '/Costcalculator',
      name: 'Costcalculator',
      component: Costcalculator
    },
    {
      path: '/Exchangerate',
      name: 'Exchangerate',
      component: Exchangerate
    },
    {
      path: '/trackitems',
      name: 'Trackitems',
      component: Trackitems
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/faqs',
      name: 'FAQs',
      component: Faqs
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('isAuthorized')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

function routeAuth(to, from, next) {
  if (localStorage.getItem('isAuthorized')) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}

function isAuth(to, from, next) {
  if (localStorage.getItem('isAuthorized')) {
    next('/'); // allow to enter route
  }
  else {
    next(); // go to '/login';
  }
}

export default router