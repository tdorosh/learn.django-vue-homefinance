<template>
  <div class="container">
      <h3>Subcategories List</h3>
      <b-button @click="showCreateModal()" variant="info">Create</b-button>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-table :items="subcategories" :fields="fields" responsive primary-key="id">
            <template v-slot:cell(actions)="data">
              <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
              <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <paginateNav :property="'subcategories'" @set-page-request="setPaginationRequest" />
        </b-row>
      </b-col>
      <b-col cols="3">
        <filtrationSidebar/>
      </b-col>
    </b-row>
    <b-modal 
      id="subcategoryForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <subcategoryForm :action="action" :subcategoryId="subcategoryId"/>
    </b-modal>
    <b-modal 
      id="deleteSubcategory" 
      title="Delete Subcategory" 
      ok-title="Delete" 
      @ok="onDelete(subcategoryId)">
      <p>Are you sure to delete the subcategory?</p>
    </b-modal>
  </div>
</template>

<script>

import subcategoryForm from '@/components/subcategory/subcategoryForm.vue';
import filtrationSidebar from '@/components/subcategory/filtrationSidebar.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'subcategoryList',
  components: {
    subcategoryForm,
    filtrationSidebar,
    paginateNav,
  },
  data() {
    return {
        subcategoryId: null,
        action: '',
        modalTitle: '',
        fields: [
          'name',
          'category',
          'actions',
        ],
    };
  },
  computed: {
    subcategories() {
      const rawSubcategories = this.$store.getters.subcategories;
      const subcategories = []
      rawSubcategories.forEach(rawSubcategory => {
        const subcategory = {
          id: rawSubcategory.id, 
          name: rawSubcategory.name,
          category: rawSubcategory.category.string_repr, 
        };
        subcategories.push(subcategory);
      })
      return subcategories;
    },
  },
  methods: {
    onDelete(subcategoryId) {
      this.$store.dispatch('deleteSubcategory', subcategoryId)
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Create Subcategory'
      this.$bvModal.show('subcategoryForm');
    },
    showEditModal(subcategoryId) {
      this.action = 'update';
      this.subcategoryId = subcategoryId;
      this.modalTitle = 'Edit Subcategory'
      this.$bvModal.show('subcategoryForm');
    },
    showDeleteModal(subcategoryId) {
      this.subcategoryId = subcategoryId;
      this.$bvModal.show('deleteSubcategory');
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
      }};
      this.$store.dispatch('getSubcategories', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getSubcategories');
  },  
}
</script>
