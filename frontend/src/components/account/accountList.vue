<template>
  <div class="container">

    <b-row>
      <b-col cols="6">
        <h3>Accounts List</h3>
      <b-button @click="showCreateModal()" variant="info">Create</b-button>
      </b-col>

      <b-col cols="3">
        <b-form-group label="Ordering by" label-for="ordering">
          <b-form-select id="ordering" v-model="ordering" @change="onOrdering">
            <option value="amount">Amount-ascending</option>
            <option value="-amount">Amount-descending</option>
            <option value="create_datetime">Create date-ascending</option>
            <option value="-create_datetime">Create date-descending</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-alert variant="success" :show="showSuccessAlert" dismissible>Account was created successfully.</b-alert>
      <b-alert variant="info" :show="showInfoAlert" dismissible>Account was updated successfully.</b-alert>
      <b-alert variant="warning" :show="showWarningAlert" dismissible>Account was deleted successfully.</b-alert>
    </b-row>
      
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
        ordering: '-create_datetime',
    };
  },
  computed: {
    accountsFilters() {
      return this.$store.getters.filter.accounts;
    },
    accountsSearch() {
      return this.$store.getters.search.accounts;
    },
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
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
        ordering: this.ordering,
        ...this.accountsFilters,
        search: this.accountsSearch,
      }};
      this.$store.dispatch('getAccounts', params);
    },
    onOrdering(ordering) {
      const params = { params: {
        ordering: ordering,
        ...this.accountsFilters,
        search: this.accountsSearch,
      }};
      this.$store.commit('SET_ORDERING', {
        item: 'accounts',
        ordering: ordering,
      })
      this.$store.dispatch('getAccounts', params);
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
    getDate: getDate,
  },

  beforeMount() {
    this.$store.dispatch('getAccounts');
  },  
}
</script>