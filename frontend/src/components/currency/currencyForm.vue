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

      <b-form-group label="Full name" label-for="full_name">
        <b-form-input 
          id="full_name" 
          v-model="form.full_name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
      <b-button @click="$bvModal.hide('currencyForm')">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'currencyForm',
  props: ['currencyId', 'action'],
  data() {
    return {
      form: {
        name: null,
        full_name: null,
      },
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.action === 'create') {
          const data = {
            name: this.form.name,
            full_name: this.form.full_name,
          };
        this.$store.dispatch('addCurrency', data)
          .then(() => {
            this.$store.dispatch('getCurrencies');
            this.$bvModal.hide('currencyForm');
          });
                
      } else if (this.action === 'update') {
          const currencyData = {
            id: this.currencyId,
            data: {
              name: this.form.name,
              full_name: this.form.full_name,
            },
          };
          this.$store.dispatch('updateCurrency', currencyData)
            .then(() => {
              this.$store.dispatch('getCurrencies');
              this.$bvModal.hide('currencyForm');
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        const currency = this.$store.getters.currencies.filter(currency => {
          return currency.id == this.currencyId;
        })[0];
        this.form.name = currency.name;
        this.form.full_name = currency.full_name;
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