<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch" @reset="onSearchReset">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in accounts" label-for="search">
                <b-row>
                  <b-col cols=6>
                    <b-form-input id="search" type="search" v-model="form.search"></b-form-input>
                  </b-col>
                  <b-col cols=4>
                    <b-button type="submit" variant="primary">Search</b-button>
                  </b-col>
                  <b-col cols=2>
                    <b-button type="reset" variant="danger">&times;</b-button>
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
        <b-form @submit="onFilter" @reset="onFilterReset">
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
            <b-col cols=12>
              <b-form-group label="Currency" label-for="currency">
                <b-form-select 
                  id="currency"
                  v-model="form.currency"
                  :options="getTargets(currencies)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="From date" label-for="from_create_date">
                <date-picker 
                  id="from_create_date" 
                  v-model="form.from_create_date"
                  :config="options"
                ></date-picker>
              </b-form-group>
            </b-col>

            <b-col cols=6>
              <b-form-group label="To date" label-for="to_create_date">
                <date-picker 
                  id="to_create_date" 
                  v-model="form.to_create_date"
                  :config="options"
                ></date-picker>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Filter</b-button>&nbsp;
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
        from_create_date: null,
        to_create_date: null,
        search: null,
      },
      options: {
        format: 'DD.MM.YYYY',
      },
    }
  },
  computed: {
    accountsOrdering() {
      return this.$store.getters.ordering.accounts;
    },
    accountsFilters() {
      return this.$store.getters.filter.accounts;
    },
    accountsSearch() {
      return this.$store.getters.search.accounts;
    },
    ...mapGetters([
        'currencies',
    ]),
  },
  methods: {
    onFilter(evt) {
      evt.preventDefault();
      const params = {params: {
        from_amount: this.form.from_amount,
        to_amount: this.form.to_amount,
        currency: this.form.currency,
        from_create_date: this.form.from_create_date,
        to_create_date: this.form.to_create_date,
        ordering: this.accountsOrdering,
        search: this.form.search,
      }};
      this.$store.commit('SET_FILTER', {
        item: 'accounts',
        filters: {
          from_amount: this.form.from_amount,
          to_amount: this.form.to_amount,
          currency: this.form.currency,
          from_create_date: this.form.from_create_date,
          to_create_date: this.form.to_create_date,
        }
      })
      this.$store.dispatch('getAccounts', params);
    },
    onFilterReset(evt) {
      evt.preventDefault();
      this.form.from_amount = null,
      this.form.to_amount = null,
      this.form.currency = null;
      this.form.from_create_date = null;
      this.form.to_create_date = null;
      this.$store.commit('RESET_FILTER', 'accounts');
      this.$store.dispatch('getAccounts', {params: {
        ordering: this.accountsOrdering,
        search: this.form.search,
      }});
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
        ordering: this.accountsOrdering,
        ...this.accountsFilters,
      }};
      this.$store.commit('SET_SEARCH', {
        item: 'accounts',
        search: this.form.search,
      });
      this.$store.dispatch('getAccounts', params);
    },
    onSearchReset(evt) {
      evt.preventDefault();
      this.form.search = null;
      this.$store.commit('RESET_SEARCH', 'accounts')
      this.$store.dispatch('getAccounts', {params: {
        ordering: this.accountsOrdering,
        ...this.accountsFilters,
      }});
    },
    updateFilterSearchData() {
      this.form.from_amount = this.accountsFilters.from_amount;
      this.form.to_amount = this.accountsFilters.to_amount;
      this.form.currency = this.accountsFilters.currency;
      this.form.from_create_date = this.accountsFilters.from_create_date;
      this.form.to_create_date = this.accountsFilters.to_create_date;
      this.form.search = this.accountsSearch;
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getCurrencies', { params: {'get_all': 'true'}});
    this.updateFilterSearchData()
  }
}
</script>