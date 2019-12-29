import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import store from './store'

const Home = () => import(/* */ '@/views/Home.vue')
const profile = () => import(/* */ '@/components/user/profile.vue')
const transactionList = () => import(/* */ '@/components/transaction/transactionList.vue')
const accountList = () => import(/* */ '@/components/account/accountList.vue')
const accountsJournal = () => import(/* */ '@/components/journal/accountsJournal.vue')
const currencyList = () => import(/* */ '@/components/currency/currencyList.vue')
const categoryList = () => import(/* */ '@/components/category/categoryList.vue')
const subcategoryList = () => import(/* */ '@/components/subcategory/subcategoryList.vue')
const placeList = () => import(/* */ '@/components/place/placeList.vue')

Vue.use(VueRouter)

const ifNotAuthenticated = (to, form, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/home');
};

const ifAuthenticated = (to, form, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/user/login');
};


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    // User routes
    {
      path: '/user/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: profile,
      beforeEnter: ifAuthenticated,
    },

    // Accounting routes
    {
      path: '/accounting/transactions',
      name: 'transactions',
      component: transactionList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/accounts',
      name: 'accounts',
      component: accountList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/journal',
      name: 'journal',
      component: accountsJournal,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/currencies',
      name: 'currencies',
      component: currencyList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/categories',
      name: 'categories',
      component: categoryList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/subcategories',
      name: 'subcategories',
      component: subcategoryList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/accounting/places',
      name: 'places',
      component: placeList,
      beforeEnter: ifAuthenticated,
    },
        
    // Planning routes
    {
      path: '/planning',
      name: 'planning',
      //component: ,
      beforeEnter: ifAuthenticated,
    },
    // Statistics routes
    {
      path: '/statistics/per-month',
      name: 'month',
      //component: ,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/statistics/quarterly',
      name: 'quarter',
      //component: ,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/statistics/annual',
      name: 'annual',
      //component: ,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/statistics/semiannual',
      name: 'semiannual',
      //component: ,
      beforeEnter: ifAuthenticated,
    },
  ],
});