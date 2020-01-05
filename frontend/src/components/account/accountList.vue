<template>
  <div class="container">
      <h3>Accounts List</h3>
      <b-button @click="showCreateModal()" variant="info">Create</b-button>
      <b-alert variant="success" :show="showSuccessAlert" dismissible>Account was created successfully.</b-alert>
      <b-alert variant="info" :show="showInfoAlert" dismissible>Account was updated successfully.</b-alert>
      <b-alert variant="warning" :show="showWarningAlert" dismissible>Account was deleted successfully.</b-alert>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-table :items="accounts" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(create_datetime)="data">
              <p>{{ getDate(data.value) }}</p>
            </template>
            <template v-slot:cell(actions)="data">
              <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
              <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <paginateNav :property="'accounts'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
    <b-modal 
      id="accountForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <accountForm 
        :action="action" 
        :accountId="accountId"
        @showSuccessAlert="showSuccessAlert=true"
        @showInfoAlert="showInfoAlert=true"/>
    </b-modal>
    <b-modal 
      id="deleteAccount" 
      title="Delete Account" 
      ok-title="Delete" 
      @ok="onDelete(accountId)">
      <p>Are you sure you want to delete the account?</p>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { getDate } from '@/utils.js';

import accountForm from '@/components/account/accountForm.vue';
import filtrationSidebar from '@/components/account/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'accountList',
  components: {
    accountForm,
    filtrationSidebar,
    paginateNav,
  },
  data() {
    return {
      accountId: null,
        action: '',
        modalTitle: '',
        showSuccessAlert: false,
        showInfoAlert: false,
        showWarningAlert: false,
        fields: [
          'title',
          'amount',
          'currency',
          'notes',
          'create_datetime',
          'actions',
        ],
    };
  },
  computed: {
    ...mapGetters([
        'accounts',
    ]),
  },
  methods: {
    onDelete(accountId) {
      this.$store.dispatch('deleteAccount', accountId)
      .then(() => {
        this.showWarningAlert=true;
      })
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Create Account'
      this.$bvModal.show('accountForm');
    },
    showEditModal(accountId) {
      this.action = 'update';
      this.accountId = accountId;
      this.modalTitle = 'Edit Account'
      this.$bvModal.show('accountForm');
    },
    showDeleteModal(accountId) {
      this.accountId = accountId;
      this.$bvModal.show('deleteAccount');
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
      }};
      this.$store.dispatch('getAccounts', params);
    },
    getDate: getDate,
  },

  beforeMount() {
    this.$store.dispatch('getAccounts');
  },  
}
</script>