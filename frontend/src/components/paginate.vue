<template>
	<div>
		<paginate
			:page-count="getPagesCount()"
			:click-handler="setPageRequest"
			:first-last-button="true"
			:prev-text="'<'"
			:next-text="'>'"
			:first-button-text="'<<'"
			:last-button-text="'>>'"
			:container-class="'pagination'"
			:page-class="'page-item'"
			:page-link-class="'page-link'"
			:prev-class="'page-item'"
			:next-class="'page-item'"
			:prev-link-class="'page-link'"
			:next-link-class="'page-link'"
			:active-class="'active'">
		</paginate>
	</div>
</template>

<script>

export default {
  name: 'paginateNav',
  props: [
    'property',
	],
  data() {
    return {
			countOnPage: 5,
    };
  },
  methods: {
    getCount(property) {
			const objectsCount = this.$store.getters.objectsCount;
			const object = objectsCount.filter(objectCount => {
				return property in objectCount;
			})[0];
			return object[property]
		},
		getPagesCount() {
			return Math.ceil(this.getCount(this.property) / this.countOnPage)
		},
		setPageRequest(page) {
			this.$emit('set-page-request', page);
		},
  }, 
}
</script>