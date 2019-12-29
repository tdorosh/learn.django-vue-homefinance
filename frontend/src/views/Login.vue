<template>
  <div class="container text-center bv-example-row bv-example-row-flex-cols">
    <b-row class="mt-5" align-h="center">
      <b-form @submit.prevent="login">
        <h3>Login</h3>
        <div v-if="isError" class="alert alert-danger" role="alert">Authentication error</div>
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
      <registrationForm />
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
    }
  },
  computed: {
    isError() {
      return this.$store.getters.authStatus === 'error';
    },
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$store.dispatch('authRequest', { username, password })
      .then(() => {
        this.$store.dispatch('getUser');
        this.$router.push('/home');
      });
    },
    showRegistrationForm() {
      this.$bvModal.show('registrationForm');
    },
  },
}
</script>


