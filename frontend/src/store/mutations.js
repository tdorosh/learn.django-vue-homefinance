import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT,
  SET_USER, CREATE_USER, UPDATE_USER, DELETE_USER, CHANGE_USER_PASSWORD,
  SET_OBJECTS_COUNT,
  SET_TRANSACTIONS, SET_TRANSACTION, CREATE_TRANSACTION, UPDATE_TRANSACTION, REMOVE_TRANSACTION,
  SET_ACCOUNTS, SET_ACCOUNT, CREATE_ACCOUNT, REMOVE_ACCOUNT,
  SET_JOURNAL,
  SET_CURRENCIES, ADD_CURRENCY, REMOVE_CURRENCY,
  SET_CATEGORIES, CREATE_CATEGORY, REMOVE_CATEGORY,
  SET_SUBCATEGORIES, CREATE_SUBCATEGORY, REMOVE_SUBCATEGORY,
  SET_PLACES, ADD_PLACE, REMOVE_PLACE,
} from './mutation-types.js'

export default {
  // Auth mutations 
  [AUTH_REQUEST] (state){
    state.authStatus = 'loading';
    state.userEvent = '';
  },
  [AUTH_SUCCESS] (state, token){
    state.authStatus = 'success';
    state.accessToken = token.access;
    if (token.refresh) {
      state.refreshToken = token.refresh;
    }
  },
  [AUTH_ERROR] (state){
    state.authStatus = 'error';
  },
  [AUTH_LOGOUT] (state){
    state.authStatus = 'logout';
    state.accessToken = null;
    state.refreshToken = null;
  },
  // User mutations
  [SET_USER] (state, user) {
    state.authUser = user;
  },
  [CREATE_USER] (state) {
    state.userEvent = 'create';
  },
  [UPDATE_USER] (state) {
    state.userEvent = 'update';
  },
  [DELETE_USER] (state) {
    state.userEvent = 'delete';
  },
  [CHANGE_USER_PASSWORD] (state) {
    state.userEvent = 'change-password';
  },
  //Mutation for save objects count
  [SET_OBJECTS_COUNT] (state, payload) {
    const object = state.objectsCount.filter(objectCount => {
      return payload.propertyName in objectCount
    })[0];
    if (object[payload.propertyName] !== payload.countNumber) {
      object[payload.propertyName] = payload.countNumber;
    }
  },
  //Transactions mutations
  [SET_TRANSACTIONS] (state, transactions) {
    state.transactions = transactions;
  },
  [SET_TRANSACTION] (state, transaction) {
    state.transaction = transaction;
  },
  [UPDATE_TRANSACTION] (state) {// eslint-disable-line no-unused-vars
        
  },
  [CREATE_TRANSACTION] (state, transaction) {
    state.transactions = [transaction, ...state.transactions];
  },
  [REMOVE_TRANSACTION] (state,  transactionId ) {
    state.transactions = state.transactions.filter(transaction => {
      return transaction.id !== transactionId;
    })
  },

  //Accounts mutations
  [SET_ACCOUNTS] (state, accounts) {
    state.accounts = accounts;
  },
  [SET_ACCOUNT] (state, account) {
    state.account = account;
  },
  [CREATE_ACCOUNT] (state, account) {
    state.accounts.push(account);
  },
  [REMOVE_ACCOUNT] (state, accountId) {
    state.accounts = state.accounts.filter(account => {
      return account.id !== accountId;
    })
  },

  //Accounts Journals mutations
  [SET_JOURNAL] (state, journal) {
    state.journal = journal;
  },

  //Currencies mutations
  [SET_CURRENCIES] (state, currencies) {
    state.currencies = currencies;
  },
  [ADD_CURRENCY] (state, currency) {
    state.currencies.push(currency);
  },
  [REMOVE_CURRENCY] (state, currencyId) {
    state.currencies = state.currencies.filter(currency => {
      return currency.id !== currencyId;
    })
  },

  //Categories mutations
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories;
  },
  [CREATE_CATEGORY] (state, category) {
    state.categories.push(category);
  },
  [REMOVE_CATEGORY] (state, categoryId) {
    state.categories = state.categories.filter(category => {
      return category.id !== categoryId;
    })
  },

  //Subcategories mutations
  [SET_SUBCATEGORIES] (state, subcategories) {
    state.subcategories = subcategories;
  },
  [CREATE_SUBCATEGORY] (state, subcategory) {
    state.subcategories.push(subcategory);
  },
  [REMOVE_SUBCATEGORY] (state, subcategoryId) {
    state.subcategories = state.subcategories.filter(subcategory => {
      return subcategory.id !== subcategoryId;
    })
  },

  //Places mutations
  [SET_PLACES] (state, places) {
    state.places = places;
  },
  [ADD_PLACE] (state, place) {
    state.places.push(place);
  },
  [REMOVE_PLACE] (state, placeId) {
    state.places = state.places.filter(place => {
      return place.id !== placeId;
    })
  },
};