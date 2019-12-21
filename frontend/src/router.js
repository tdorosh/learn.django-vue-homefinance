import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

const transactionList = () => import(/* */ '@/components/transaction/transactionList.vue')
const accountList = () => import(/* */ '@/components/account/accountList.vue')
const journalList = () => import(/* */ '@/components/journal/journalList.vue')
const currencyList = () => import(/* */ '@/components/currency/currencyList.vue')
const categoryList = () => import(/* */ '@/components/category/categoryList.vue')
const subcategoryList = () => import(/* */ '@/components/subcategory/subcategoryList.vue')
const placeList = () => import(/* */ '@/components/place/placeList.vue')

Vue.use(VueRouter)

export default new VueRouter({
    
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // User routes
    {
      path: '/accounts/login',
      name: 'login',
      //component: ,
    },
    {
      path: '/accounts/logout',
      name: 'logout',
      //component: ,
    },
    {
      path: '/accounts/profile',
      name: 'profile',
      //component: ,
    },

    // Accounting routes
    {
      path: '/accounting/transactions',
      name: 'transactions',
      component: transactionList,
    },
    {
      path: '/accounting/accounts',
      name: 'accounts',
      component: accountList,
    },
    {
      path: '/accounting/journal',
      name: 'journal',
      component: journalList,
    },
    {
      path: '/accounting/currencies',
      name: 'currencies',
      component: currencyList,
    },
    {
      path: '/accounting/categories',
      name: 'categories',
      component: categoryList,
    },
    {
      path: '/accounting/subcategories',
      name: 'subcategories',
      component: subcategoryList,
    },
    {
        path: '/accounting/places',
        name: 'places',
        component: placeList,
    },
        
    // Planning routes
    {
        path: '/planning',
        name: 'planning',
        //component: ,
    },
    // Statistics routes
    {
      path: '/statistics/per-month',
      name: 'month',
      //component: ,
    },
    {
      path: '/statistics/quarterly',
      name: 'quarter',
      //component: ,
    },
    {
      path: '/statistics/annual',
      name: 'annual',
      //component: ,
    },
    {
        path: '/statistics/semiannual',
        name: 'semiannual',
        //component: ,
    },
  ],
});