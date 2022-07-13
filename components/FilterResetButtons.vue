<template>
  <div>
    <button class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700 "
      @click="resetFilters"
    >
      Reset Filters
    </button>

    <button class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700 "
      @click="applyFilters()"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "ResetButtons",
  props: {
    appliedFilters: {
      type: Array,
      default: () => [],
    },
    clearFilters: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    applyFilters() {
      // eslint-disable-next-line no-console
      console.log("applyFilters");
    },
    resetFilters() {
      this.$emit(
        "reset-filters",
        // reset filteredParishArray to empty array
        []
      );
    },
  },
};
</script>