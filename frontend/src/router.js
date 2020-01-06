import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './views/Login.vue'
import Home from '@/views/Home.vue'
import profile from '@/components/user/profile.vue'
import transactionList from '@/components/transaction/transactionList.vue'
import accountList from '@/components/account/accountList.vue'
import accountsJournal from '@/components/journal/accountsJournal.vue'
import currencyList from '@/components/currency/currencyList.vue'
import categoryList from '@/components/category/categoryList.vue'
import subcategoryList from '@/components/subcategory/subcategoryList.vue'
import placeList from '@/components/place/placeList.vue'

import store from './store'



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