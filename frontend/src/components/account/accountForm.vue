<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Title" label-for="title">
        <b-form-input 
          id="title" 
          v-model="form.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-row>
        <b-col>
          <b-form-group label="Amount" label-for="amount">
            <b-form-input 
              id="amount" 
              v-model="form.amount"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Currency" label-for="currency">
            <b-form-select 
              id="currency" 
              v-model="form.currency"
              :options="getTargets(currencies)"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group label="Date and Time" label-for="create_datetime">
        <date-picker 
          id="create_datetime" 
          v-model="form.create_datetime"
          :config="options"
        ></date-picker>
      </b-form-group>

      <b-form-group label="Notes" label-for="notes">
        <b-form-textarea 
          id="notes" 
          v-model="form.notes"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
      <b-button @click="$bvModal.hide('accountForm')">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

import { mapGetters } from 'vuex';
import { getTargets, convertDateToISOString } from '@/utils.js';

export default {
  name: 'accountForm',
  props: ['accountId', 'action'],
  components: {
    datePicker,
  },
  data() {
    return {
      form: {
        title: null,
        amount: null,
        currency: null,
        notes: '',
        create_datetime: new Date(),
      },
      options: {
        format: 'DD.MM.YYYY, HH:mm:ss',
      },
    }
  },
  computed: {
    ...mapGetters([
        'account', 'currencies',
      ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.action === 'create') {
          const data = {
            title: this.form.title,
            amount: this.form.amount,
            currency: this.form.currency,
            notes: this.form.notes,
            create_datetime: convertDateToISOString(this.form.create_datetime),
          };

        this.$store.dispatch('createAccount', data)
          .then(() => {
            this.$store.dispatch('getAccounts');
            this.$bvModal.hide('accountForm');
            this.$emit('showSuccessAlert');
          });
                
      } else if (this.action === 'update') {
          const accountData = {
            id: this.accountId,
            data: {
              title: this.form.title,
              amount: this.form.amount,
              currency: this.form.currency,
              notes: this.form.notes,
              create_datetime: convertDateToISOString(this.form.create_datetime),
            },
          };
          this.$store.dispatch('updateAccount', accountData)
            .then(() => {
              this.$store.dispatch('getAccounts');
              this.$bvModal.hide('accountForm');
              this.$emit('showInfoAlert');
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        this.$store.dispatch('getAccount', this.accountId)
          .then(() => {
            const account = this.account;
            this.form.title = account.title;
            this.form.amount = account.amount;
            this.form.currency = account.currency;
            this.form.notes = account.notes;
            this.form.create_datetime = new Date(account.create_datetime);
          })
      } else {
        return null
      }  
    },
    getTargets: getTargets,
  },
  beforeMount() {
    //Get data for selects from api
    this.$store.dispatch('getCurrencies', { params: {'get_all': 'true'}});
    this.updateFormData();
  }
}
</script>