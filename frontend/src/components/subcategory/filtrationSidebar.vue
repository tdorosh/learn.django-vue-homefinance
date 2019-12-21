<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in subcategories" label-for="search">
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
            <b-col cols=12>
              <b-form-group label="Category" label-for="category">
                <b-form-select 
                  id="category"
                  v-model="form.category"
                  :options="getTargets(categories)"
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

import { mapGetters } from 'vuex';
import { getTargets } from '@/utils.js';

export default {
  name: 'filtrationSidebar',
  data() {
    return {
      form: {
        category: null,
        search: '',
      },
    }
  },
  computed: {
    ...mapGetters([
        'categories',
    ]),
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        category: this.form.category,
      }}
      this.$store.dispatch('getSubcategories', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.category = null;
      this.$store.dispatch('getSubcategories');
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
      }}
      this.$store.dispatch('getSubcategories', params);
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getCategories');
  },
}
</script>