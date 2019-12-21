import Vue from 'vue'
import Vuex from 'vuex'

import mutations from '@/store/mutations';
import actions from '@/store/actions';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectsCount: [
      { transactions: null },
      { accounts: null },
      { journals: null },
      { currencies: null },
      { categories: null },
      { subcategories: null },
      { places: null },
    ],
    transactions: [],
    transaction: null,
    accounts: [],
    account: null,
    journals: [],
    currencies: [],
    categories: [],
    subcategories: [],
    places: [],
  },
  getters: {
    objectsCount: state => state.objectsCount,
    transactions: state => state.transactions,
    transaction: state => state.transaction,
    accounts: state => state.accounts,
    account: state => state.account,
    journals: state => state.journals,
    currencies: state => state.currencies,
    categories: state => state.categories,
    subcategories: state => state.subcategories,
    places: state => state.places,
  },
  mutations: Object.assign(mutations),
  actions: Object.assign(actions),
});