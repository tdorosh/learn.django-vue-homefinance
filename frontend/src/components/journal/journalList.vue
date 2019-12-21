<template>
  <div class="container">
      <h3>Journals List</h3>
    <b-row>
      <b-col cols="9">
        <b-table :items="journals" :fields="fields" responsive primary-key="id">
          <template v-slot:cell(timestamp)="data">
            <p>{{ new Date(data.value) }}</p>
          </template>
        </b-table>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
    <paginateNav :property="'journals'" @set-page-request="setPaginationRequest" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

import filtrationSidebar from '@/components/journal/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'journalList',
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
    };
  },
  computed: {
    ...mapGetters([
        'journals' ,'transactions', 'accounts',
    ]),
  },
  methods: {
    onDelete(categoryId) {
      this.$store.dispatch('deleteCategory', categoryId)
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
      }};
      this.$store.dispatch('getJournals', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getTransactions');
    this.$store.dispatch('getAccounts');
    this.$store.dispatch('getJournals');
  },  
}
</script>
