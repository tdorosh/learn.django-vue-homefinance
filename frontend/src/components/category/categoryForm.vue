<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Name" label-for="name">
        <b-form-input 
          id="name" 
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group label="Category Type" label-for="cat_type">
        <b-form-select 
          id="cat_type" 
          v-model="form.cat_type"
          :options="transactionTypes"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
      <b-button @click="$bvModal.hide('categoryForm')">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'categoryForm',
  props: ['categoryId', 'action'],
  data() {
    return {
      form: {
        name: null,
        cat_type: null,
      },
      transactionTypes: [
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
      if (this.action === 'create') {
          const data = {
            name: this.form.name,
            cat_type: this.form.cat_type,
          };

        this.$store.dispatch('createCategory', data)
          .then(() => {
            this.$store.dispatch('getCategories');
            this.$bvModal.hide('categoryForm');
            this.$emit('showSuccessAlert');
          });
                
      } else if (this.action === 'update') {
          const categoryData = {
            id: this.categoryId,
            data: {
              name: this.form.name,
              cat_type: this.form.cat_type,
            },
          };
          this.$store.dispatch('updateCategory', categoryData)
            .then(() => {
              this.$store.dispatch('getCategories');
              this.$bvModal.hide('categoryForm');
              this.$emit('showInfoAlert');
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        const category = this.$store.getters.categories.filter(category => {
          return category.id == this.categoryId;
        })[0];
        this.form.name = category.name;
        this.form.cat_type = category.cat_type;
      } else {
        return null
      }  
    },
  },
  beforeMount() {
    this.updateFormData();
  }
}
</script>