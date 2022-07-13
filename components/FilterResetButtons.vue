<template>
  <div>
    <button
      class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
      @click="reset"
    >
      Reset Filters
    </button>

    <button
      class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
      @click="apply"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "ResetButtons",
  props: {
    filtersApplied: {
      type: Array,
      default: () => [],
    },
    filtersReset: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    apply() {
      // eslint-disable-next-line no-console
      console.log("applyFilters component: apply");
    },
    reset() {
      this.$emit(
        "reset-filters",
        // eslint-disable-next-line no-console
        console.log("resetFilters component: reset")
      );
    },
  },
};
</script>
