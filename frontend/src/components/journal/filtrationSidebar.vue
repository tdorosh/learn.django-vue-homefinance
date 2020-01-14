<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row>
            <b-col cols=6>
              <b-form-group label="From Amount Before" label-for="fromAmountBefore">
                <b-form-input
                  type="number"
                  id="fromAmountBefore"
                  v-model="form.from_amount_before"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="To Amount Before" label-for="toAmountBefore">
                <b-form-input
                  type="number"
                  id="toAmountBefore"
                  v-model="form.to_amount_before"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols=6>
              <b-form-group label="From Amount After" label-for="fromAmountAfter">
                <b-form-input
                  type="number"
                  id="fromAmountAfter"
                  v-model="form.from_amount_after"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols=6>
              <b-form-group label="To Amount After" label-for="toAmountAfter">
                <b-form-input
                  type="number"
                  id="toAmountAfter"
                  v-model="form.to_amount_after"
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
              <b-form-group label="Date" label-for="create_date">
                <date-picker 
                  id="create_date" 
                  v-model="form.create_date"
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
        from_amount_before: null,
        to_amount_before: null,
        from_amount_after: null,
        to_amount_after: null,
        account: null,
        create_date: null,
      },
      options: {
        format: 'DD.MM.YYYY',
      },
    }
  },
  computed: {
    journalOrdering() {
      return this.$store.getters.ordering.journal;
    },
    ...mapGetters([
        'accounts',
    ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        from_amount_before: this.form.from_amount_before,
        to_amount_before: this.form.to_amount_before,
        from_amount_after: this.form.from_amount_after,
        to_amount_after: this.form.to_amount_after,
        account: this.form.account,
        create_date: this.form.create_date,
        ordering: this.journalOrdering,
      }};
      this.$store.commit('SET_FILTER', {
        item: 'journal',
        filters: {
          from_amount_before: this.form.from_amount_before,
          to_amount_before: this.form.to_amount_before,
          from_amount_after: this.form.from_amount_after,
          to_amount_after: this.form.to_amount_after,
          account: this.form.account,
          create_date: this.form.create_date,
        },
      });
      this.$store.dispatch('getJournal', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.from_amount_before = null;
      this.form.to_amount_before = null;
      this.form.from_amount_after = null;
      this.form.to_amount_after = null;
      this.form.account = null;
      this.form.create_date = null;
      this.$store.commit('RESET_FILTER', 'journal')
      this.$store.dispatch('getJournal', {params: { ordering: this.journalOrdering }});
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getAccounts', { params: {'get_all': 'true'}});
  }
}
</script>