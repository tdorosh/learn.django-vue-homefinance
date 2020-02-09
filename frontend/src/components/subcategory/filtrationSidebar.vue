<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch" @reset="onSearchReset">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in subcategories" label-for="search">
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

          <b-button type="submit" variant="primary">Filter</b-button>&nbsp;
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
    subcategoriesFilters() {
      return this.$store.getters.filter.subcategories;
    },
    subcategoriesSearch() {
      return this.$store.getters.search.subcategories;
    },
    ...mapGetters([
        'categories',
    ]),
  },
  methods: {
    onFilter(evt) {
      evt.preventDefault();
      const params = {params: {
        category: this.form.category,
        search: this.form.search,
      }};
      this.$store.commit('SET_FILTER', {
        item: 'subcategories',
        filters: {
          category: this.form.category,
        }
      })
      this.$store.dispatch('getSubcategories', params);
    },
    onFilterReset(evt) {
      evt.preventDefault();
      this.form.category = null;
      this.$store.commit('RESET_FILTER', 'subcategories');
      this.$store.dispatch('getSubcategories', {params: {
        search: this.form.search,
      }});
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
        category: this.form.category,
      }};
      this.$store.commit('SET_SEARCH', {
        item: 'subcategories',
        search: this.form.search,
      });
      this.$store.dispatch('getSubcategories', params);
    },
    onSearchReset(evt) {
      evt.preventDefault();
      this.form.search = null;
      this.$store.commit('RESET_SEARCH', 'subcategories')
      this.$store.dispatch('getSubcategories', {params: {
        ...this.subcategoriesFilters,
      }});
    },
    updateFilterSearchData() {
      this.form.category = this.subcategoriesFilters.category;
      this.form.search = this.subcategoriesSearch;
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getCategories', { params: {'get_all': 'true'}});
    this.updateFilterSearchData()
  },
}
</script>