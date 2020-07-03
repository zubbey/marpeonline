import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const Home = () => import('@/views/Home.vue');
const Product = () => import('@/views/Product.vue');
const User = () => import('@/views/User.vue');
const Overview = () => import('@/views/Overview.vue');
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Contact = () => import('@/views/Contact.vue');
const Checkout = () => import('@/views/Checkout.vue');
const Service_fee = () => import('@/views/Service_fee.vue');
const Cost_convert = () => import('@/views/Cost_convert.vue');
const Track_items = () => import('@/views/Track_items.vue');
const Faqs = () => import('@/views/Faqs.vue');
const Referral = () => import('@/views/Referral.vue');
const Wallet = () => import('@/views/Wallet.vue');
const Orders = () => import('@/views/Orders.vue');
const Account_history = () => import('@/views/Account_history.vue');
const Settings = () => import('@/views/Settings.vue');

//admin
const Admin = () => import('@/views/Admin.vue');
const Adminoverview = () => import('@/views/Adminoverview.vue');
const Adminusers = () => import('@/views/Adminusers.vue');
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
          meta: { title: 'Order Placement', requiresAuth: true }
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
      path: '/service_fee',
      name: 'Service_fee',
      component: Service_fee
    },
    {
      path: '/cost_convert',
      name: 'Cost_convert',
      component: Cost_convert
    },
    {
      path: '/track_items',
      name: 'Track_items',
      component: Track_items
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/faqs',
      name: 'Faqs',
      component: Faqs
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