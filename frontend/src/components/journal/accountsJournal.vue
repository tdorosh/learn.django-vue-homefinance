<template>
  <div class="container">
    <b-row>
      <b-col cols="4">
        <h3>Accounts Journal</h3>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Ordering by" label-for="ordering">
          <b-form-select id="ordering" v-model="ordering" @change="onOrdering">
            <option value="amount_before">Amount before-ascending</option>
            <option value="-amount_before">Amount before-descending</option>
            <option value="amount_after">Amount after-ascending</option>
            <option value="-amount_after">Amount after-descending</option>
            <option value="timestamp">Timestamp-ascending</option>
            <option value="-timestamp">Timestamp-descending</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
      
    <b-row>
      <b-col cols="7">
        <b-row>
          <b-table :items="journal" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(timestamp)="data">
              <p>{{ getDate(data.value) }}</p>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <paginateNav :property="'journal'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { getDate } from '@/utils.js';

import filtrationSidebar from '@/components/journal/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'accountsJournal',
  components: {
    filtrationSidebar,
    paginateNav,
  },
  data() {
    return {
      fields: [
        'account',
        'amount_before',
        'amount_after',
        'timestamp',
      ],
      ordering: '-timestamp',
    };
  },
  computed: {
    journalFilters() {
      return this.$store.getters.filter.journal;
    },
    ...mapGetters([
        'journal' ,'transactions', 'accounts',
    ]),
  },
  methods: {
    onDelete(categoryId) {
      this.$store.dispatch('deleteCategory', categoryId)
    },
    onOrdering(ordering) {
      const params = { params: {
        ordering: ordering,
        ...this.journalFilters,
      }};
      this.$store.commit('SET_ORDERING', {
        item: 'journal',
        ordering: ordering,
      })
      this.$store.dispatch('getJournal', params);
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Create Category'
      this.$bvModal.show('categoryForm');
    },
    showEditModal(categoryId) {
      this.action = 'update';
      this.categoryId = categoryId;
      this.modalTitle = 'Edit Category'
      this.$bvModal.show('categoryForm');
    },
    showDeleteModal(categoryId) {
      this.categoryId = categoryId;
      this.$bvModal.show('deleteCategory');
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
        ...this.journalFilters,
        ordering: this.ordering,
      }};
      this.$store.dispatch('getJournal', params);
    },
    getDate: getDate,
  },

  beforeMount() {
    this.$store.dispatch('getTransactions');
    this.$store.dispatch('getAccounts');
    this.$store.dispatch('getJournal');
  },  
}
</script>
