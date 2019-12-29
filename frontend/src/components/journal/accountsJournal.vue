<template>
  <div class="container">
      <h3>Accounts Journal</h3>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-table :items="journal" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(timestamp)="data">
              <p>{{ new Date(data.value) }}</p>
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
    };
  },
  computed: {
    ...mapGetters([
        'journal' ,'transactions', 'accounts',
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
      this.$store.dispatch('getJournal', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getTransactions');
    this.$store.dispatch('getAccounts');
    this.$store.dispatch('getJournal');
  },  
}
</script>
