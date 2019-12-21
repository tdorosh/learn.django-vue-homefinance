<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in notes" label-for="search">
                <b-row>
                  <b-col cols=8>
                    <b-form-input id="search" type="search" v-model="form.search"></b-form-input>
                  </b-col>
                  <b-col cols=4>
                    <b-button type="submit" variant="primary">Search</b-button>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row>
            <b-col cols=6>
              <b-form-group label="From Amount" label-for="fromAmount">
                <b-form-input
                  type="number"
                  id="fromAmount"
                  v-model="form.from_amount"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="To Amount" label-for="toAmount">
                <b-form-input
                  type="number"
                  id="toAmount"
                  v-model="form.to_amount"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="Currency" label-for="currency">
                <b-form-select 
                  id="currency"
                  v-model="form.currency"
                  :options="getTargets(currencies)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="Type" label-for="trans_type">
                <b-form-select 
                  id="trans_type"
                  v-model="form.trans_type"
                  :options="transactionTypes"
                  @change="setNullAccounts()"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="Category" label-for="category">
                <b-form-select 
                  id="category" 
                  v-model="form.category"
                  :options="getTargets(getFilterCategories(form.trans_type))"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="Subcategory" label-for="subcategory">
                <b-form-select 
                  id="subcategory" 
                  v-model="form.subcategory"
                  :options="getTargets(getFilterSubcategories(form.category))"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="From" label-for="from_account">
                <b-form-select 
                  id="from_account" 
                  v-model="form.from_account"
                  :options="getTargets(getFilterAccounts(form.currency))"
                  :disabled="form.trans_type === 'INC'"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="On" label-for="on_account">
                <b-form-select 
                  id="on_account" 
                  v-model="form.on_account"
                  :options="getTargets(getFilterAccounts(form.currency))"
                  :disabled="form.trans_type === 'EXP'"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=12>
              <b-form-group label="Date and Time" label-for="create_datetime">
                <date-picker 
                  id="create_datetime" 
                  v-model="form.create_datetime"
                  :config="options"
                ></date-picker>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=12>
              <b-form-group label="Place" label-for="place">
                <b-form-select 
                  id="place" 
                  v-model="form.place"
                  :options="getTargets(places)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

import { mapGetters } from 'vuex';
import { getTargets } from '@/utils.js';

export default {
  name: 'filtrationSidebar',
  components: {
    datePicker,
  },
  data() {
    return {
      form: {
        from_amount: null,
        to_amount: null,
        currency: null,
        trans_type: null,
        category: null,
        subcategory: null,
        from_account: null,
        on_account: null,
        create_datetime: null,
        place: null,
        search: '',
      },
      transactionTypes: [
        {value: null, text: '--Select item--'},
        { value: 'INC', text: 'Income'},
        { value: 'EXP', text: 'Expences'},
        { value: 'TEC', text: 'Technical'},
      ],
      options: {
        format: 'DD.MM.YYYY, HH:mm:ss',
      },
    }
  },
  computed: {
    ...mapGetters([
        'accounts', 'currencies', 'categories',
        'subcategories', 'places',
    ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        from_amount: this.form.from_amount,
        to_amount: this.form.to_amount,
        currency: this.form.currency,
        trans_type: this.form.trans_type,
        category: this.form.category,
        subcategory: this.form.subcategory,
        from_account: this.form.from_account,
        on_account: this.form.on_account,
        create_datetime: this.form.create_datetime,
        place: this.form.place,
      }}
      this.$store.dispatch('getTransactions', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.from_amount = null,
      this.form.to_amount = null,
      this.form.currency = null;
      this.form.trans_type = null;
      this.form.category = null;
      this.form.subcategory = null;
      this.form.from_account = null;
      this.form.on_account = null;
      this.form.create_datetime = null;
      this.form.place = null;
      this.$store.dispatch('getTransactions');
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
      }}
      this.$store.dispatch('getTransactions', params);
    },
    getTargets: getTargets,
    getFilterAccounts(currencyId) {
      if (currencyId) {
        const currency = this.currencies.filter(currency => {
          return currency.id === currencyId;
        })[0].name;
        return this.accounts.filter(account => {
          return account.currency === currency;
      });
      } else {
        return this.accounts;
      }
    },
    getFilterCategories(trans_type) {
      if (trans_type) {
        return this.categories.filter(category => {
          return category.cat_type === trans_type;
      });
      } else {
        return this.categories;
      }
    },
    getFilterSubcategories(category) {
      if (category) {
        return this.subcategories.filter(subcategory => {
          return subcategory.category === category;
      });
      } else {
        return this.subcategories;
      }
    },
    setNullAccounts() {
      if (this.form.trans_type === 'INC') {
        this.form.from_account = null;
      } else if (this.form.trans_type === 'EXP') {
        this.form.on_account = null;
      }
    },
  },
  beforeMount() {
    //Get data for selects from api
    this.$store.dispatch('getAccounts');
    this.$store.dispatch('getCurrencies');
    this.$store.dispatch('getCategories', { params: {no_page: 'yes'}});
    this.$store.dispatch('getSubcategories');
    this.$store.dispatch('getPlaces');
  },
}
</script>