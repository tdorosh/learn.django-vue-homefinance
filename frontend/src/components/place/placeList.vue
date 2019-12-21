<template>
  <div class="container">
      <h3>Places List</h3>
      <b-button @click="showCreateModal()" variant="info">Add</b-button>
    <b-row>
      <b-col cols="12">
        <b-table :items="places" :fields="fields" responsive primary-key="id">
          <template v-slot:cell(actions)="data">
            <b-button @click="showEditModal(data.item.id)" variant="warning" size="sm">Edit</b-button>&nbsp;
            <b-button @click="showDeleteModal(data.item.id)" variant="danger" size="sm">Delete</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <paginateNav :property="'places'" @set-page-request="setPaginationRequest" />
    <b-modal 
      id="placeForm" 
      :title="modalTitle" 
      hide-footer no-close-on-backdrop>
      <placeForm :action="action" :placeId="placeId"/>
    </b-modal>
    <b-modal 
      id="deletePlace" 
      title="Delete Place" 
      ok-title="Delete" 
      @ok="onDelete(placeId)">
      <p>Are you sure to delete the place?</p>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

import placeForm from '@/components/place/placeForm.vue';
import paginateNav from '@/components/paginate.vue';

export default {
  name: 'placeList',
  components: {
    placeForm,
    paginateNav,
  },
  data() {
    return {
        placeId: null,
        action: '',
        modalTitle: '',
        fields: [
          'name',
          'actions',
        ],
    };
  },
  computed: {
    ...mapGetters([
        'places',
    ]),
  },
  methods: {
    onDelete(placeId) {
      this.$store.dispatch('deletePlace', placeId)
    },
    showCreateModal() {
      this.action = 'create';
      this.modalTitle = 'Add Place'
      this.$bvModal.show('placeForm');
    },
    showEditModal(placeId) {
      this.action = 'update';
      this.placeId = placeId;
      this.modalTitle = 'Edit Place'
      this.$bvModal.show('placeForm');
    },
    showDeleteModal(placeId) {
      this.placeId = placeId;
      this.$bvModal.show('deletePlace');
    },
    setPaginationRequest(page) {
      const params = { params: {
        page: page,
      }};
      this.$store.dispatch('getPlaces', params);
    },
  },

  beforeMount() {
    this.$store.dispatch('getPlaces');
  },  
}
</script>
