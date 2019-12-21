<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
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
            <b-col cols=12>
              <b-form-group label="Account" label-for="account">
                <b-form-select 
                  id="account" 
                  v-model="form.account"
                  :options="getTargets(accounts)"
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
        account: null,
        create_datetime: null,
      },
      options: {
        format: 'DD.MM.YYYY, HH:mm:ss',
      },
    }
  },
  computed: {
    ...mapGetters([
        'accounts',
    ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        from_amount: this.form.from_amount,
        to_amount: this.form.to_amount,
        account: this.form.account,
        create_datetime: this.form.create_datetime,
      }}
      this.$store.dispatch('getJournals', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.from_amount = null,
      this.form.to_amount = null,
      this.form.account = null;
      this.form.create_datetime = null;
      this.$store.dispatch('getJournals');
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getAccounts');
  }
}
</script>