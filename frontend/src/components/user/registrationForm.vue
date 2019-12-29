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
        <b-link @click.prevent="checkUsername">Check</b-link>
      </b-form-group>

      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          placeholder="Your email"
          required
        ></b-form-input>
        <b-link @click.prevent="checkEmail">Check</b-link>
      </b-form-group>

      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Your password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Confirm Password" label-for="confirm-password">
        <b-form-input
          id="confirm-password"
          v-model="confirm_password"
          type="password"
          placeholder="Confirm your password here"
          @change="checkPasswordsEqual()"
          required
        ></b-form-input>
        <p v-if="!checkPasswordsEqual()">Passwords must be equal</p>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>&nbsp;
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
      });
    }, 
    checkUsername() {
    },
    checkEmail() {
    },
    checkPassword() {
    },
    checkPasswordsEqual() {
      return this.confirm_password === this.password;
    }
  },
}
</script>


