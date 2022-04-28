<template>
  <vue-good-table
    :columns="parishColumns"
    :rows="filteredData"
    max-height="600px"
    :sort-options="{
      enabled: true,
      initialSortBy: { field: 'name', type: 'asc' },
    }"
    :fixed-header="true"
    :pagination-options="{
      enabled: true,
      mode: 'records',
      perPage: 25,
      position: 'bottom',
      perPageDropdown: [25, 50, 100],
      dropdownAllowAll: false,
      setCurrentPage: 1,
      rowsPerPageLabel: 'Rows per page',
      allLabel: 'All records',
    }"
    style-class="vgt-table condensed striped"
    @on-row-click="onRowClick"
  >
    <template slot="table-column" slot-scope="props">
      <span v-if="props.column.label == 'Parish'">
        <span class="hint--top" aria-label="The names of the parishes.">
          {{ props.column.label }}
        </span>
      </span>
      <span v-else-if="props.column.label == 'Count Type'">
        <span
          class="hint--top"
          aria-label="The count type, either by the number in the parish with plague or the number buried in the parish."
        >
          {{ props.column.label }}
        </span>
      </span>
      <span v-else-if="props.column.label == 'Count'">
        <span
          class="hint--top"
          aria-label="The number of plague or buried in the parish."
        >
          {{ props.column.label }}
        </span>
      </span>
      <span v-else-if="props.column.label == 'Week Number'">
        <span class="hint--top" aria-label="The week number in the year.">
          {{ props.column.label }}
        </span>
      </span>
      <span v-else-if="props.column.label == 'Year'">
        <span class="hint--top" aria-label="The year for the data.">
          {{ props.column.label }}
        </span>
      </span>
      <span v-else>
        {{ props.column.label }}
      </span>
    </template>
  </vue-good-table>
</template>

<script>
import axios from "axios";

export default {
  name: "WeeklyBillsTable",
  props: {
    years: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredData: [],
      parishColumns: [
        {
          label: "Parish",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "Search for parish name",
          },
        },
        {
          label: "Count Type",
          field: "count_type",
          filterOptions: {
            enabled: true,
            placeholder: "Search for count type",
          },
        },
        {
          label: "Count",
          field: "count",
          type: "number",
        },
        {
          label: "Week Number",
          field: "week_no",
          type: "number",
        },
        {
          label: "Year",
          field: "year",
          type: "date",
          dateInputFormat: "yyyy",
          dateOutputFormat: "yyyy",
        },
      ],
      weeklyBills: [],
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.years);
  },
  mounted() {
    axios
      .get(
        "https://data.chnm.org/bom/bills?startYear=" +
          this.years[0] +
          "&endYear=" +
          this.years[1]
      )
      .then((response) => {
        this.weeklyBills = response.data;
      });
  },
  methods: {
    updateYears() {
      this.$emit("update-years", this.years);
    },
  },
};
</script>
