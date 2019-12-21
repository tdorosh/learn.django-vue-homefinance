import axios from 'axios'

import {
  SET_OBJECTS_COUNT,
  SET_TRANSACTIONS, SET_TRANSACTION, CREATE_TRANSACTION, UPDATE_TRANSACTION, REMOVE_TRANSACTION,
  SET_ACCOUNTS, SET_ACCOUNT, CREATE_ACCOUNT, REMOVE_ACCOUNT,
  SET_JOURNALS,
  SET_CURRENCIES, ADD_CURRENCY, REMOVE_CURRENCY,
  SET_CATEGORIES, CREATE_CATEGORY, REMOVE_CATEGORY,
  SET_SUBCATEGORIES, CREATE_SUBCATEGORY, REMOVE_SUBCATEGORY,
  SET_PLACES, ADD_PLACE, REMOVE_PLACE,
} from './mutation-types.js'

const HTTP = axios.create({
  baseURL:'http://127.0.0.1:8000/'
})

const actions = {

  //Transactions actions
  async getTransactions ({ commit }, params) {
    const response = await HTTP.get('transactions/', params);
    if (response.status === 200) {
      commit(SET_TRANSACTIONS, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'transactions', countNumber: response.data.count })
    }
  },
  async getTransaction({ commit }, transactionId) {
    const response = await HTTP.get(`transactions/${transactionId}`)
    if (response.status === 200) {
      commit(SET_TRANSACTION, response.data)
    }
  },
  async createTransaction ({ commit }, transactionData) {
    const response = await HTTP.post('transactions/', transactionData);
    if (response.status === 201) {
      commit(CREATE_TRANSACTION, response.data)
    }
  },
  async updateTransaction ({ commit }, transactionData) {
    const response = await HTTP.put(`transactions/${transactionData.id}/`, transactionData.data);
    if (response.status === 200) {
      commit(UPDATE_TRANSACTION)
    }
  },
  async deleteTransaction ({ commit }, transactionId) {
    const response = await HTTP.delete(`transactions/${transactionId}/`);
    if (response.status === 204) {
      commit(REMOVE_TRANSACTION, transactionId)
    }
  },

  //Accounts actions
  async getAccounts ({ commit }, params) {
    const response = await HTTP.get('accounts/', params);
    if (response.status === 200) {
      commit(SET_ACCOUNTS, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'accounts', countNumber: response.data.count })
    }
  },
  async getAccount({ commit }, accountId) {
    const response = await HTTP.get(`accounts/${accountId}`)
    if (response.status === 200) {
      commit(SET_ACCOUNT, response.data)
    }
  },
  async createAccount ({ commit }, accountData) {
    const response = await HTTP.post('accounts/', accountData);
    if (response.status === 201) {
      commit(CREATE_ACCOUNT, response.data)
    }
  },
  async updateAccount ({ dispatch }, accountData) {
    const response = await HTTP.put(`accounts/${accountData.id}/`, accountData.data);
    if (response.status === 200) {
      dispatch('getAccounts')
    }
  },
  async deleteAccount ({ commit }, accountId) {
    const response = await HTTP.delete(`accounts/${accountId}/`);
    if (response.status === 204) {
      commit(REMOVE_ACCOUNT, accountId)
    }
  },
  //Accounts Journals actions
  async getJournals ({ commit }, params) {
    const response = await HTTP.get('journals/', params);
    if (response.status == 200) {
      commit(SET_JOURNALS, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'journals', countNumber: response.data.count })
    }
  },
  //Currencies actions
  async getCurrencies ({ commit }, params) {
    const response = await HTTP.get('currencies/', params);
    if (response.status === 200) {
      commit(SET_CURRENCIES, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'currencies', countNumber: response.data.count })
    }
  },
  async addCurrency ({ commit }, currencyData) {
    const response = await HTTP.post('currencies/', currencyData);
    if (response.status === 201) {
      commit(ADD_CURRENCY, response.data)
    }
  },
  async updateCurrency ({ dispatch }, currencyData) {
    const response = await HTTP.put(`currencies/${currencyData.id}/`, currencyData.data);
    if (response.status === 200) {
      dispatch('getCurrencies')
    }
  },
  async deleteCurrency ({ commit }, currencyId) {
    const response = await HTTP.delete(`currencies/${currencyId}/`);
    if (response.status === 204) {
      commit(REMOVE_CURRENCY, currencyId)
    }
  },
  //Categories actions
  async getCategories ({ commit }, params) {
    const response = await HTTP.get('categories/', params);
    if (response.status === 200) {
      commit(SET_CATEGORIES, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'categories', countNumber: response.data.count })
    }
  },
  async createCategory ({ commit }, categoryData) {
    const response = await HTTP.post('categories/', categoryData);
    if (response.status === 201) {
      commit(CREATE_CATEGORY, response.data)
    }
  },
  async updateCategory ({ dispatch }, categoryData) {
    const response = await HTTP.put(`categories/${categoryData.id}/`, categoryData.data);
    if (response.status === 200) {
      dispatch('getCategories')
    }
  },
  async deleteCategory ({ commit }, categoryId) {
    const response = await HTTP.delete(`categories/${categoryId}/`);
    if (response.status === 204) {
      commit(REMOVE_CATEGORY, categoryId)
    }
  },
  //Subcategories actions
  async getSubcategories ({ commit }, params) {
    const response = await HTTP.get('subcategories/', params);
    if (response.status === 200) {
      commit(SET_SUBCATEGORIES, response.data.results);
      commit(SET_OBJECTS_COUNT, { propertyName: 'subcategories', countNumber: response.data.count })
    }
  },
  async createSubcategory ({ commit }, subcategoryData) {
    const response = await HTTP.post('subcategories/', subcategoryData);
    if (response.status === 201) {
      commit(CREATE_SUBCATEGORY, response.data)
    }
  },
  async updateSubcategory ({ dispatch }, subcategoryData) {
    const response = await HTTP.put(`subcategories/${subcategoryData.id}/`, subcategoryData.data);
    if (response.status === 200) {
      dispatch('getSubcategories')
    }
  },
  async deleteSubcategory({ commit }, subcategoryId) {
    const response = await HTTP.delete(`subcategories/${subcategoryId}/`);
    if (response.status === 204) {
      commit(REMOVE_SUBCATEGORY, subcategoryId)
    }
  },
  //Places actions
  getPlaces ({ commit }, params) {
    return new Promise((resolve, reject) => {
      HTTP.get('places/', params)
        .then((response) => {
          commit(SET_PLACES, response.data.results);
          commit(SET_OBJECTS_COUNT, { propertyName: 'places', countNumber: response.data.count })
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addPlace ({ commit }, placeData) {
    return new Promise((resolve, reject) => {
      HTTP.post('places/', placeData)
        .then((response) => {
          commit(ADD_PLACE, response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updatePlace ({ dispatch }, placeData) {
    return new Promise((resolve, reject) => {
      HTTP.put(`places/${placeData.id}`, placeData.data)
        .then((response) => {
          dispatch('getPlaces');
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deletePlace ({ commit }, placeId) {
    return new Promise((resolve, reject) => {
      HTTP.delete(`places/${placeId}`)
        .then((response) => {
          commit(REMOVE_PLACE, placeId);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
}

export default actions;
