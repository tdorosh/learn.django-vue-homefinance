<template>
  <div class="container">
    <h3>Transactions List</h3>
    <b-button @click="showCreateModal()" variant="info">Create</b-button>
    <b-alert variant="success" :show="showSuccessAlert" dismissible>Transaction was created successfully.</b-alert>
    <b-alert variant="info" :show="showInfoAlert" dismissible>Transaction was updated successfully.</b-alert>
    <b-alert variant="warning" :show="showWarningAlert" dismissible>Transaction was deleted successfully.</b-alert>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-table :items="transactions" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(trans_type)="data">
              <p>{{ getCategory(data.value) }}</p>
            </template>
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
          <paginateNav :property="'transactions'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
    <b-modal 
      id="transactionForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <transactionForm 
        :action="action" 
        :transactionId="transactionId" 
        @showSuccessAlert="showSuccessAlert=true"
        @showInfoAlert="showInfoAlert=true"/>
    </b-modal>
    <b-modal 
      id="deleteTransaction" 
      title="Delete Transaction" 
      ok-title="Delete" 
      @ok.prevent="onDelete(transactionId)">
      <b-alert 
        v-if="eventError" 
        v-model="eventError" 
        variant="danger" 
        dismissible>
        {{ eventError }}
      </b-alert>
      <p>Are you sure you want to delete the transaction?</p>
    </b-modal>
  </div>
</template>

<script>

import { getDate } from '@/utils.js';

import transactionForm from '@/components/transaction/transactionForm.vue';
import filtrationSidebar from '@/components/transaction/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'transactionList',
  components: {
    transactionForm,
    filtrationSidebar,
    paginateNav,
  },
  data() {
    return {
      transactionId: null,
        action: '',
        modalTitle: '',
        showSuccessAlert: false,
        showInfoAlert: false,
        showWarningAlert: false,
        fields: [
          'amount',
          'currency',
          {key: 'trans_type', label: 'Type'},
          'category',
          'subcategory',
          'from_account',
          'on_account',
          'create_datetime',
          'place',
          'notes',
          'actions',
        ],
        eventError: null,
      };
  },
  computed: {
    transactions() {
      const rawTransactions = this.$store.getters.transactions;
      const transactions = []
      rawTransactions.forEach(rawTransaction => {
        const transaction = {
          id: rawTransaction.id, 
          amount: rawTransaction.amount,
          currency: rawTransaction.currency,
          trans_type: rawTransaction.trans_type,
          category: rawTransaction.category, 
          subcategory: rawTransaction.subcategory,
          from_account: rawTransaction.from_account,
          on_account: rawTransaction.on_account,
          place: rawTransaction.place,
          create_datetime: rawTransaction.create_datetime,
          notes: rawTransaction.notes,
        };
        const foreignkeyAttributesObject = {
          currency: rawTransaction.currency,
          category: rawTransaction.category, 
          subcategory: rawTransaction.subcategory,
          from_account: rawTransaction.from_account,
          on_account: rawTransaction.on_account,
          place: rawTransaction.place
        }
        for (const key in foreignkeyAttributesObject) {
          if (foreignkeyAttributesObject[key] === null) {
            transaction[key] === null;
          } else {
            transaction[key] = foreignkeyAttributesObject[key].string_repr;
          }
        }
        transactions.push(transaction);
      })
      return transactions;
    },
  },
  methods: {
    onDelete(transactionId) {
      this.$store.dispatch('deleteTransaction', transactionId)
      .then(() => {
        this.$store.dispatch('getTransactions');
        this.$bvModal.hide('deleteTransaction');
        this.showWarningAlert=true;

      }, (error) => {
        this.eventError = error.response.data;
      })
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Create Transaction'
      this.$bvModal.show('transactionForm');
    },
    showEditModal(transactionId) {
      this.action = 'update';
      this.transactionId = transactionId;
      this.modalTitle = 'Edit Transaction'
      this.$bvModal.show('transactionForm');
    },
    showDeleteModal(transactionId) {
      this.transactionId = transactionId;
      this.eventError = null;
      this.$bvModal.show('deleteTransaction');
    },
    getCategory(cat_value) {
      if (cat_value === 'INC') {
        return 'Income';
      } else if (cat_value === 'EXP') {
        return 'Expences';
      } else {
        return 'Technical';
      }
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
      }};
      this.$store.dispatch('getTransactions', params);
    },
    getDate: getDate,
  },
  beforeMount() {
    this.$store.dispatch('getTransactions');
  },  
}
</script>
