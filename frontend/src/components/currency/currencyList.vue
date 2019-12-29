<template>
  <div class="container">
      <h3>Currencies List</h3>
      <b-button @click="showCreateModal()" variant="info">Create</b-button>
    <b-row>
      <b-col cols="8">
        <b-row>
          <b-table :items="currencies" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(actions)="data">
              <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
              <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <paginateNav :property="'currencies'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
    </b-row>
    <b-modal 
      id="currencyForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <currencyForm :action="action" :currencyId="currencyId"/>
    </b-modal>
    <b-modal 
      id="deleteCurrency" 
      title="Delete Currency" 
      ok-title="Delete" 
      @ok="onDelete(currencyId)">
      <p>Are you sure to delete the currency?</p>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

import currencyForm from '@/components/currency/currencyForm.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'currencyList',
  components: {
    currencyForm,
    paginateNav,
  },
  data() {
    return {
        currencyId: null,
        action: '',
        modalTitle: '',
        fields: [
          'name',
          'full_name',
          'actions',
        ],
    };
  },
  computed: {
    ...mapGetters([
        'currencies',
    ]),
  },
  methods: {
    onDelete(currencyId) {
      this.$store.dispatch('deleteCurrency', currencyId)
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Create Currency'
      this.$bvModal.show('currencyForm');
    },
    showEditModal(currencyId) {
      this.action = 'update';
      this.currencyId = currencyId;
      this.modalTitle = 'Edit Currency'
      this.$bvModal.show('currencyForm');
    },
    showDeleteModal(currencyId) {
      this.currencyId = currencyId;
      this.$bvModal.show('deleteCurrency');
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
      }};
      this.$store.dispatch('getCurrencies', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getCurrencies');
  },  
}
</script>
