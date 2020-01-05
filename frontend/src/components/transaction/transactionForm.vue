<template>
  <div class="container">
    <b-alert v-if="eventError" v-model="eventError" variant="danger" dismissible>{{ eventError }}</b-alert>
    <b-row>
      <b-col cols="12">
        <b-form @submit="onSubmit">
          <b-row>
            <b-col cols=4>
              <b-form-group label="Amount*" label-for="amount">
                <b-form-input 
                  id="amount" 
                  v-model="form.amount"
                  type="number"
                  min=".01"
                  step=".01"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols=4>
              <b-form-group label="Currency*" label-for="currency">
                <b-form-select 
                  id="currency" 
                    v-model="form.currency"
                    :options="getTargets(currencies)"
                    required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=4>
              <b-form-group label="Type*" label-for="trans_type">
                <b-form-select 
                  id="trans_type" 
                  v-model="form.trans_type"
                  :options="transactionTypes"
                  @change="setNullAccountsSubcat()"
                  required
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
              <b-form-group :label="getFromLabel()" label-for="from_account">
                <b-form-select 
                  id="from_account" 
                  v-model="form.from_account"
                  :options="getTargets(getFilterAccounts(form.currency))"
                  :disabled="form.trans_type === 'INC'"
                  :required="form.trans_type === 'EXP' || form.trans_type === 'TEC'"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group :label="getOnLabel()"  label-for="on_account">
                <b-form-select 
                  id="on_account" 
                  v-model="form.on_account"
                  :options="getTargets(getFilterAccounts(form.currency))"
                  :disabled="form.trans_type === 'EXP'"
                  :required="form.trans_type === 'INC' || form.trans_type === 'TEC'"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="Date and Time" label-for="create_datetime">
                <date-picker 
                  id="create_datetime" 
                  v-model="form.create_datetime"
                  :config="options"
                ></date-picker>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="Place" label-for="place">
                <b-form-select 
                  id="place" 
                  v-model="form.place"
                  :options="getTargets(places)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=12>
              <b-form-group label="Notes" label-for="notes">
                <b-form-textarea 
                  id="notes" 
                  v-model="form.notes"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
          <b-button @click="$bvModal.hide('transactionForm')">Cancel</b-button>
          
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
import { getTargets, convertDateToISOString } from '@/utils.js';

export default {
  name: 'transactionForm',
  props: ['transactionId', 'action'],
  components: {
    datePicker,
  },
  data() {
    return {
      form: {
        amount: null,
        currency: null,
        trans_type: null,
        category: null,
        subcategory: null,
        from_account: null,
        on_account: null,
        create_datetime: new Date(),
        place: null,
        notes: '',
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
      eventError: '',
    }
  },
  computed: {
    ...mapGetters([
        'transaction', 'accounts', 'currencies', 'categories',
          'subcategories', 'places',
      ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.action === 'create') {
          const data = {
            amount: this.form.amount,
            currency: this.form.currency,
            trans_type: this.form.trans_type,
            category: this.form.category,
            subcategory: this.form.subcategory,
            from_account: this.form.from_account,
            on_account: this.form.on_account,
            create_datetime: convertDateToISOString(this.form.create_datetime),
            place: this.form.place,
            notes: this.form.notes,
          };

        this.$store.dispatch('createTransaction', data)
          .then(() => {
            this.$store.dispatch('getTransactions');
            this.$bvModal.hide('transactionForm');
            this.$emit('showSuccessAlert');
          }, (error) => {
            this.eventError = error.response.data;
          });
      } else if (this.action === 'update') {
          const transactionData = {
            id: this.transactionId,
            data: {
              amount: this.form.amount,
              currency: this.form.currency,
              trans_type: this.form.trans_type,
              category: this.form.category,
              subcategory: this.form.subcategory,
              from_account: this.form.from_account,
              on_account: this.form.on_account,
              create_datetime: convertDateToISOString(this.form.create_datetime),
              place: this.form.place,
              notes: this.form.notes,
            },
          };
          this.$store.dispatch('updateTransaction', transactionData)
            .then(() => {
              this.$store.dispatch('getTransactions');
              this.$bvModal.hide('transactionForm');
              this.$emit('showInfoAlert');
            }, (error) => {
                this.eventError = error.response.data;
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        this.$store.dispatch('getTransaction', this.transactionId)
          .then(() => {
            const transaction = this.transaction;
            this.form.amount = transaction.amount;
            this.form.currency = transaction.currency;
            this.form.trans_type = transaction.trans_type;
            this.form.category = transaction.category;
            this.form.subcategory = transaction.subcategory;
            this.form.from_account = transaction.from_account;
            this.form.on_account = transaction.on_account;
            this.form.create_datetime = transaction.create_datetime;
            this.form.place = transaction.place;
            this.form.notes = transaction.notes;
          });
      } else {
          return null
        }  
    },
    getTargets: getTargets,
    convertDateToISOString: convertDateToISOString,
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
          return subcategory.category.id === category;
      });
      } else {
        return this.subcategories;
      }
    },
    setNullAccountsSubcat() {
      this.form.subcategory = null;
      if (this.form.trans_type === 'INC') {
        this.form.from_account = null;
      } else if (this.form.trans_type === 'EXP') {
        this.form.on_account = null;
      }
    },
    getFromLabel() {
      if (this.form.trans_type === 'EXP' || this.form.trans_type === 'TEC') {
        return 'From Account*';
      } else if (this.form.trans_type === 'INC' || this.form.trans_type === null) {
        return 'From Account';
      }
    },
    getOnLabel() {
      if (this.form.trans_type === 'INC' || this.form.trans_type === 'TEC') {
        return 'On Account*';
      } else if (this.form.trans_type === 'EXP' || this.form.trans_type === null) {
        return 'On Account';
      }
    },
  },
  beforeMount() {
    //Get data for selects from api
    this.$store.dispatch('getAccounts', { params: {'get_all': 'true'}});
    this.$store.dispatch('getCurrencies', { params: {'get_all': 'true'}});
    this.$store.dispatch('getCategories', { params: {'get_all': 'true'}});
    this.$store.dispatch('getSubcategories', { params: {'get_all': 'true'}});
    this.$store.dispatch('getPlaces', { params: {'get_all': 'true'}});
    this.updateFormData();
  }
}
</script>