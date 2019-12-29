<template>
  <div>
    <b-form class="form" @submit.prevent="onSubmit">
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Update data</b-button>&nbsp;
      <b-button @click="$bvModal.hide('updateUserForm')">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>


export default {
  name: 'updateUserForm',
  data() {
    return {
      username: '',
      email: '',
    }
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser[0];
    }
  },
  methods: {
    onSubmit() {
      const userData = {
        id: this.authUser.id,
        data: {
          username: this.username,
          email: this.email,
        }
      };
      this.$store.dispatch('updateUser', userData)
      .then(() => {
        this.$store.dispatch('getUser')
        .then(() => {
          this.$bvModal.hide('updateUserForm');
        })
      });
    },
    updateFormData() {
      this.username = this.authUser.username;
      this.email = this.authUser.email;
		},
  },
  beforeMount() {
    this.updateFormData();
  },
}
</script>


