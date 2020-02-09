<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch" @reset="onSearchReset">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in categories" label-for="search">
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
              <b-form-group label="Type" label-for="cat_type">
                <b-form-select 
                  id="cat_type"
                  v-model="form.cat_type"
                  :options="categoryTypes"
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

export default {
  name: 'filtrationSidebar',
  data() {
    return {
      form: {
        cat_type: null,
        search: null,
      },
      categoryTypes: [
        {value: null, text: '--Select item--'},
        { value: 'INC', text: 'Income'},
        { value: 'EXP', text: 'Expences'},
        { value: 'TEC', text: 'Technical'},
      ],
    }
  },
  computed: {
    categoriesFilters() {
      return this.$store.getters.filter.categories;
    },
    categoriesSearch() {
      return this.$store.getters.search.categories;
    },
  },
  methods: {
    onFilter(evt) {
      evt.preventDefault();
      const params = {params: {
        cat_type: this.form.cat_type,
        search: this.form.search,
      }};
      this.$store.commit('SET_FILTER', {
        item: 'categories',
        filters: {
          cat_type: this.form.cat_type,
        }
      })
      this.$store.dispatch('getCategories', params);
    },
    onFilterReset(evt) {
      evt.preventDefault();
      this.form.cat_type = null;
      this.$store.commit('RESET_FILTER', 'categories');
      this.$store.dispatch('getCategories', {params: {
        search: this.form.search,
      }});
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
        cat_type: this.form.cat_type,
      }};
      this.$store.commit('SET_SEARCH', {
        item: 'categories',
        search: this.form.search,
      });
      this.$store.dispatch('getCategories', params);
    },
    onSearchReset(evt) {
      evt.preventDefault();
      this.form.search = null;
      this.$store.commit('RESET_SEARCH', 'categories')
      this.$store.dispatch('getCategories', {params: {
        ...this.categoriesFilters,
      }});
    },
    updateFilterSearchData() {
      this.form.cat_type = this.categoriesFilters.cat_type;
      this.form.search = this.categoriesSearch;
    },
  },
  beforeMount() {
    this.updateFilterSearchData()
  }
}
</script>