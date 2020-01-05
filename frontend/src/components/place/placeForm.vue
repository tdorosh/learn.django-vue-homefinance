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
      
      <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
      <b-button @click="$bvModal.hide('placeForm')">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'placeForm',
  props: ['placeId', 'action'],
  data() {
    return {
      form: {
        name: null,
      },
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.action === 'create') {
          const data = {
            name: this.form.name,
          };
        this.$store.dispatch('addPlace', data)
          .then(() => {
            this.$store.dispatch('getPlaces');
            this.$bvModal.hide('placeForm');
            this.$emit('showSuccessAlert');
          });
                
      } else if (this.action === 'update') {
          const placeData = {
            id: this.placeId,
            data: {
              name: this.form.name,
            },
          };
          this.$store.dispatch('updatePlace', placeData)
            .then(() => {
              this.$store.dispatch('getPlaces');
              this.$bvModal.hide('placeForm');
              this.$emit('showInfoAlert');
            }); 
          }
        },
    updateFormData() {
      if (this.action === 'update') {
        const place = this.$store.getters.places.filter(place => {
          return place.id == this.placeId;
        })[0];
        this.form.name = place.name;
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