<template>
  <div class="container">
    <b-row><b-col cols=12><h3>Filtration Sidebar</h3></b-col></b-row>
    <b-row>
      <b-col cols=12>
        <b-form @submit="onSearch">
          <b-row>
            <b-col cols=12>
              <b-form-group label="Search in categories" label-for="search">
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
              <b-form-group label="Type" label-for="cat_type">
                <b-form-select 
                  id="cat_type"
                  v-model="form.cat_type"
                  :options="categoryTypes"
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

export default {
  name: 'filtrationSidebar',
  data() {
    return {
      form: {
        cat_type: null,
        search: '',
      },
      categoryTypes: [
        {value: null, text: '--Select item--'},
        { value: 'INC', text: 'Income'},
        { value: 'EXP', text: 'Expences'},
        { value: 'TEC', text: 'Technical'},
      ],
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const params = {params: {
        cat_type: this.form.cat_type,
      }}
      this.$store.dispatch('getCategories', params);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.cat_type = null;
      this.$store.dispatch('getCategories');
    },
    onSearch(evt) {
      evt.preventDefault();
      const params = {params: {
        search: this.form.search,
      }}
      this.$store.dispatch('getCategories', params);
    },
  },
}
</script>