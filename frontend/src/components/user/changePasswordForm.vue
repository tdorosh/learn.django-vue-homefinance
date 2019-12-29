<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Old Password" label-for="old-password">
        <b-form-input
          id="old-password"
          v-model="old_password"
          type="password"
          placeholder="Your old password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="New Password" label-for="new-password">
        <b-form-input
          id="new-password"
          v-model="new_password"
          type="password"
          placeholder="Your new password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Confirm New Password" label-for="confirm-new-password">
        <b-form-input
          id="confirm-new-password"
          v-model="confirm_new_password"
          type="password"
          placeholder="Confirm your new password here"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Change password</b-button>&nbsp;
      <b-button @click="$bvModal.hide('changePasswordForm')">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>

import axiosInstance from '@/axios.js'

const HTTP = axiosInstance;

export default {
  name: 'changePasswordForm',
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
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
      return new Promise((resolve, reject) => {
        HTTP.put('users/profile/change-password/', data)
        .then((response) => {
          this.$bvModal.hide('changePasswordForm');
          this.$store.dispatch('authLogout')
            .then(() => {
              this.$router.push('/user/login');
            })
            resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
  },
}
</script>


