<template>
  <div>
    <b-alert show variant="info">Password changing will require re-authentication</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Old Password" label-for="old-password">
        <b-form-input
          id="old-password"
          v-model="old_password"
          type="password"
          placeholder="Your old password"
          required
        ></b-form-input>
        <b-list-group v-if="oldPasswordError">
          <b-list-group-item variant="danger"> {{ oldPasswordError }}
          </b-list-group-item>
        </b-list-group>
      </b-form-group>

      <b-form-group label="New Password" label-for="new-password">
        <b-form-input
          id="new-password"
          v-model="new_password"
          type="password"
          placeholder="Your new password"
          required
        ></b-form-input>
        <b-list-group v-if="newPasswordErrors">
          <b-list-group-item 
            v-for="error in passwordErrors"
            v-bind:key="error.id"
            variant="danger">
            {{ error }}
          </b-list-group-item>
        </b-list-group>
      </b-form-group>

      <b-form-group label="Confirm New Password" label-for="confirm-new-password">
        <b-form-input
          id="confirm-new-password"
          v-model="confirm_new_password"
          type="password"
          placeholder="Confirm your new password here"
          required
        ></b-form-input>
        <p v-if="!isPasswordsEqual()" class="alert alert-danger">Passwords must be the same</p>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!isPasswordsEqual()">Change password</b-button>&nbsp;
      <b-button @click="$bvModal.hide('changePasswordForm')">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  name: 'changePasswordForm',
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
      oldPasswordError: '',
      newPasswordErrors: '',
    }
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser[0];
    }
  },
  methods: {
    onSubmit() {
      const data = {
        old_password: this.old_password,
        new_password: this.new_password,
      };
      this.$store.dispatch('changePassword', data)
        .then(() => {
          this.$bvModal.hide('changePasswordForm');
          this.$store.dispatch('authLogout')
            .then(() => {
              this.$router.push('/user/login');
          })
        }, (error) => {
            this.oldPasswordError = error.response.data.old_password[0];
            this.newPasswordErrors = error.response.data.new_password;
        })
    },
    isPasswordsEqual() {
      return this.confirm_new_password === this.new_password;
    }
  },
}
</script>


