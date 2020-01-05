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
      
      <b-form-group label="Category" label-for="category">
        <b-form-select 
          id="category" 
          v-model="form.category"
          :options="getTargets(categories)"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
      <b-button @click="$bvModal.hide('subcategoryForm')">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
import { getTargets } from '@/utils.js';

export default {
  name: 'subcategoryForm',
  props: ['subcategoryId', 'action'],
  data() {
    return {
      form: {
        name: null,
        category: null,
      },
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.action === 'create') {
          const data = {
            name: this.form.name,
            category: this.form.category,
          };

        this.$store.dispatch('createSubcategory', data)
          .then(() => {
            this.$store.dispatch('getSubcategories');
            this.$bvModal.hide('subcategoryForm');
            this.$emit('showSuccessAlert');
          });
                
      } else if (this.action === 'update') {
          const subcategoryData = {
            id: this.subcategoryId,
            data: {
              name: this.form.name,
              category: this.form.category,
            },
          };
          this.$store.dispatch('updateSubcategory', subcategoryData)
            .then(() => {
              this.$store.dispatch('getSubcategories');
              this.$bvModal.hide('subcategoryForm');
              this.$emit('showInfoAlert');
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        const subcategory = this.$store.getters.subcategories.filter(subcategory => {
          return subcategory.id == this.subcategoryId;
        })[0];
        this.form.name = subcategory.name;
        this.form.category = subcategory.category.id;
      } else {
        return null
      }  
    },
    getTargets: getTargets,
  },
  beforeMount() {
    this.$store.dispatch('getCategories', { params: {'get_all': 'true'}});
    this.updateFormData();
  }
}
</script>