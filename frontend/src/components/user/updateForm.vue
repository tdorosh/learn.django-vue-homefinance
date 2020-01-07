<template>
  <div>
    <b-alert show variant="info">Profile updating will require re-authentication</b-alert>
    <b-form class="form" @submit.prevent="onSubmit">
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          required
        ></b-form-input>
        <b-badge variant="secondary">At least three letters characters at the begining</b-badge>
        <b-list-group v-if="usernameErrors">
          <b-list-group-item 
            v-for="error in usernameErrors"
            v-bind:key="error.id"
            variant="danger">
            {{ error }}
          </b-list-group-item>
        </b-list-group>
      </b-form-group>

      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
        ></b-form-input>
        <b-list-group v-if="emailErrors">
          <b-list-group-item 
            v-for="error in emailErrors"
            v-bind:key="error.id"
            variant="danger">
            {{ error }}
          </b-list-group-item>
        </b-list-group>
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
      usernameErrors: '',
      emailErrors: '',
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
          this.$store.dispatch('authLogout')
					.then(() => {
            this.$router.push('/user/login');
					})
        })
      }, (error) => {
          this.usernameErrors = error.response.data.username;
          this.emailErrors = error.response.data.email;
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


