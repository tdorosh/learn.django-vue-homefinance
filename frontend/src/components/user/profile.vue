<template>
  <div class="container">
    <b-row>
      <b-col cols=6>
        <b-table-simple>
          <b-tbody>
            <b-tr>
              <b-th>Username</b-th>
              <b-td>{{ authUser.username }}</b-td>
            </b-tr>
            <b-tr>
              <b-th>Email</b-th>
              <b-td>{{ authUser.email }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols=6>
        <b-button @click="showUpdateUserForm" variant="outline-primary">Update User</b-button>&nbsp;
        <b-button @click="showChangePasswordForm" variant="warning">Change password</b-button>&nbsp;
        <b-button @click="showConfirmDeleteUser" variant="danger">Delete User</b-button>&nbsp;
      </b-col>
    </b-row>

		<b-modal 
      id="updateUserForm" 
      title="Update user data" 
      hide-footer no-close-on-backdrop>
      <updateUserForm />
    </b-modal>

		<b-modal 
      id="changePasswordForm" 
      title="Change Password" 
      hide-footer no-close-on-backdrop>
      <changePasswordForm />
    </b-modal>

    <b-modal 
      id="deleteUser" 
      title="Delete User Account" 
      ok-title="Delete" 
      @ok="onDelete(authUser)">
      <p>Are you sure you want to delete your user account? All your data will be permanently deleted</p>
    </b-modal>

  </div>
</template>

<script>

import updateUserForm from '@/components/user/updateForm.vue';
import changePasswordForm from '@/components/user/changePasswordForm.vue';

export default {
	name: 'profile',
	components: {
    updateUserForm,
    changePasswordForm,
	},
	data() {
		return {

		}
	},
	computed: {
		authUser() {
			return this.$store.getters.authUser[0];
		}
	},
	methods: {
		onDelete(authUser) {
			this.$store.dispatch('deleteUser', authUser.id)
			.then(() => {
				this.$bvModal.hide('deleteUser');
				this.$store.dispatch('authLogout')
					.then(() => {
            this.$router.push('/user/login');
					})
			})
		},
		showUpdateUserForm() {
			this.$bvModal.show('updateUserForm');
		},
		showChangePasswordForm(){
			this.$bvModal.show('changePasswordForm');
		},
		showConfirmDeleteUser() {
			this.$bvModal.show('deleteUser');
		},
  },
  beforeMount() {
    this.$store.dispatch('getUser');
  },
}
</script>