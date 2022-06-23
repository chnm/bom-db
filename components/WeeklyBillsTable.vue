<template>
<div>
  <data-filters 
    :years='years'
    :parish-names='parishNames'
    :count-type-options='countTypeOptions'
    :count-type-default='countTypeDefault'
  />

  <vue-good-table
    :columns="columns"
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
</div>
</template>

<script>
import axios from "axios";
import DataFilters from "./DataFilters.vue";

export default {
  name: "WeeklyBillsTable",
  components: {
    DataFilters,
  },
  props: {
    years: {
      type: Array,
      required: true,
    },
    // parishNames: {
    //   type: Array,
    //   required: true,
    // },
    // countTypeDefault: {
    //   type: String,
    //   required: true,
    // },
    countTypeOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      columns: [
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
      filterOptions: [],
      parishNames: [],
      countTypeDefault: 'All',
    };
  },
  computed: {
    filteredData() {
      // The following returns the dataset based on choices made by the user.
      // 1. If no filters are chosen by parish name, count type, or year range, all the data is returned.
      // 2. If only parish names are selected, the data is filtered by the chosen parish names.
      // 3. If only the year range is selected, the data is filtered by the chosen year range.
      // 4. If a count type is selected, the data is filtered by the chosen count type. 'All' returns all
      //    the data. 'Buried' or 'Plague' returns the data filtered by the chosen count type.
      // We then return an array of the filtered data from this.weeklyBills.
      const filteredParishNames = this.parishNames;
      const filteredYears = this.years;
      const filteredCountType = this.countTypeDefault;

      const totalParishes = this.weeklyBills;

      // eslint-disable-next-line no-console
      console.log('filteredData() | filteredParishes from weekly', filteredParishNames);
      // eslint-disable-next-line no-console
      console.log('filteredData() | filteredYears from weekly', filteredYears);
      // eslint-disable-next-line no-console
      console.log('filteredData() | filteredCountType from weekly', filteredCountType);

      const dataFilteredByCountType = totalParishes.filter((parish) => {
        if (filteredCountType === "All") {
          // eslint-disable-next-line no-console
          // console.log('filteredData() == filteredCountType is All');
          return parish;
        } else if (filteredCountType === "Buried") {
          // eslint-disable-next-line no-console
          // console.log('filteredData() == filteredCountType is Buried');
          return parish.count_type === "Buried";
        } else if (filteredCountType === "Plague") {
          // eslint-disable-next-line no-console
          // console.log('filteredData() == filteredCountType is Plague');
          return parish.count_type === "Plague";
        } else if (filteredCountType === "Total") {
          // eslint-disable-next-line no-console
          // console.log('filteredData() == filteredCountType is Total');
          return parish.count_type === "Total";
        }

        return parish;
      });

      const result = dataFilteredByCountType.filter((row) => {
        if (
          filteredParishNames.length === 0 &&
          filteredYears === [1640, 1790] &&
          filteredCountType === "All"
        ) {
          return filteredParishNames;
        } else if (
          filteredParishNames.length > 0 &&
          filteredCountType === "All"
        ) {
          return (
            row.year >= filteredYears[0] &&
            row.year <= filteredYears[1] &&
            filteredParishNames.includes(row.name)
          );
        } else if (filteredParishNames.length > 0) {
          return (
            row.year >= filteredYears[0] &&
            row.year <= filteredYears[1] &&
            filteredParishNames.includes(row.name)
          );
        } else {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1];
        }
      });

      // eslint-disable-next-line no-console
      // console.log('filteredData() | totalParishes from weekly', totalParishes);
      
      return result;
    },
  },
  mounted() {
    axios
      .get(
        "https://data.chnm.org/bom/generalbills?startYear=" +
          this.years[0] +
          "&endYear=" +
          this.years[1],
      )
      .then((response) => {
        this.weeklyBills = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
    axios
      .get(
        "https://data.chnm.org/bom/parishes",
      )
      .then((response) => {
        this.parishNames = response.data;
      })
      .catch(
        (e) => {
          this.errors.push(e);
          // eslint-disable-next-line no-console
          console.log(this.errors);
        },
      );
  },
  methods: {
    // updateData() {
    //   this.$emit("update-data", this.filteredData);
    // },
    onRowClick(params) {
       // eslint-disable-next-line no-console
       console.log("row clicked", params);
       // params.row - row object
       // params.pageIndex - index of this row on the current page.
       // params.selected - if selection is enabled this argument
       // indicates selected or not
       // params.event - click event
     },
     receiveFilterOptions(filterOptions) {
       // eslint-disable-next-line no-console
       console.log("receiveFilterOptions", filterOptions);
       this.filterOptions = filterOptions;
     },
  },
};
</script>