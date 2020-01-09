<template>
  <div>
    <b-form class="form" @submit.prevent="registration">
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          placeholder="Your username"
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
          placeholder="Your email"
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

      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Your password"
          required
        ></b-form-input>
        <b-badge variant="secondary">At least five not only digital characters</b-badge>
        <b-list-group v-if="passwordErrors">
          <b-list-group-item 
            v-for="error in passwordErrors"
            v-bind:key="error.id"
            variant="danger">
            {{ error }}
          </b-list-group-item>
        </b-list-group>
      </b-form-group>

      <b-form-group label="Confirm Password" label-for="confirm-password">
        <b-form-input
          id="confirm-password"
          v-model="confirm_password"
          type="password"
          placeholder="Confirm your password here"
          required
        ></b-form-input>
        <p v-if="!isPasswordsEqual()" class="alert alert-danger">Passwords must be the same</p>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!isPasswordsEqual()">Register</b-button>&nbsp;
      <b-button @click="$bvModal.hide('registrationForm')">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  name: 'registrationForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      usernameErrors: '',
      emailErrors: '',
      passwordErrors:'',
    }
  },
  methods: {
    registration() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('createUser', data)
      .then(() => {
        this.$bvModal.hide('registrationForm');
        this.$emit('showSuccessAlert');
      }, (error) => {
          this.usernameErrors = error.response.data.username;
          this.emailErrors = error.response.data.email;
          this.passwordErrors = error.response.data.password;
      })
      
    },
    isPasswordsEqual() {
      return this.confirm_password === this.password;
    }
  },
}
</script>


