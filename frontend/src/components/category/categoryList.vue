<template>
  <div class="container">
      <h3>Categories List</h3>
      <b-button @click="showCreateModal()" variant="info">Create</b-button>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-table :items="categories" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(cat_type)="data">
              <p>{{ getCategory(data.value) }}</p>
            </template>
            <template v-slot:cell(actions)="data">
              <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
              <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <paginateNav :property="'categories'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
    <b-modal 
      id="categoryForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <categoryForm :action="action" :categoryId="categoryId"/>
    </b-modal>
    <b-modal 
      id="deleteCategory" 
      title="Delete Category" 
      ok-title="Delete" 
      @ok="onDelete(categoryId)">
      <p>Are you sure to delete the category?</p>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

import categoryForm from '@/components/category/categoryForm.vue';
import filtrationSidebar from '@/components/category/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'categoryList',
  components: {
    categoryForm,
    filtrationSidebar,
    paginateNav,
  },
  data() {
    return {
      categoryId: null,
        action: '',
        modalTitle: '',
        fields: [
          'name',
          {key: 'cat_type', label: 'Category Type'},
          'actions',
        ],
    };
  },
  computed: {
    ...mapGetters([
        'categories',
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
      this.$store.dispatch('getCategories', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getCategories');
  },  
}
</script>
