<template>
  <div class="container text-center bv-example-row bv-example-row-flex-cols">
    <b-row class="mt-5" align-h="center">
      <b-alert 
        variant="success" 
        :show="showSuccessAlert" 
        dismissible>
        New user was created successfully.
        Now you can sign in with your login and password.
      </b-alert>
      <b-alert 
        variant="info" 
        :show="isUpdated"
        dismissible>
        User was updated successfully.
      </b-alert>
      <b-alert 
        variant="warning" 
        :show="isDeleted"
        dismissible>
        User and data was deleted successfully.
      </b-alert>
      <b-alert 
        variant="info" 
        :show="isPasswordChanged"
        dismissible>
        Password was changed successfully.
      </b-alert>
    </b-row>
    <b-row class="mt-5" align-h="center">
      <b-form @submit.prevent="login">
        <h3>Login</h3>
        <b-alert :show="isError" variant="warning" dismissible>Authentication error</b-alert>
        <b-form-group class="text-left" label="Username" label-for="username" >
          <b-form-input
            id="username"
            v-model="username"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="text-left" label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <p>Do not have an account? <b-link @click.prevent="showRegistrationForm">Registration</b-link></p>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-row>
    <b-modal 
      id="registrationForm" 
      title="Register a new user" 
      hide-footer no-close-on-backdrop>
      <registrationForm @showSuccessAlert="showSuccessAlert=true" />
    </b-modal>
  </div>
</template>

<script>
import registrationForm from '@/components/user/registrationForm.vue';

export default {
  name: 'Login',
  components: {
    registrationForm,
  },
  data() {
    return {
      username: '',
      password: '',
      showSuccessAlert: false,
      showInfoAlert: false,
    }
  },
  computed: {
    isError() {
      return this.$store.getters.authStatus === 'error';
    },
    isDeleted() {
      return this.$store.getters.userEvent === 'delete';
    },
    isUpdated() {
      return this.$store.getters.userEvent === 'update';
    },
    isPasswordChanged() {
      return this.$store.getters.userEvent === 'change-pasword';
    },
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$store.dispatch('authRequest', { username, password })
      .then(() => {
        this.$router.push('/home');
        this.$store.dispatch('getUser')
      });
    },
    showRegistrationForm() {
      this.$bvModal.show('registrationForm');
    },
  },
}
</script>


