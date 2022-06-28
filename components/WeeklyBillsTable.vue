<template>
<div>
   <div id="accordionExample" class="accordion">
    <div class="accordion-item bg-white border border-gray-200">
      <h2 id="headingOne" class="accordion-header mb-0">
        <button
          class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Filter By
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionFilters"
      >
        <div class="accordion-body py-4 px-5">
          <div class="grid grid-cols-4 gap-4 pb-6">
            <div class="overflow-y-auto h-36 px-4 py-4">
              <div
                id="accordionParishes"
                class="accordion accordion-flush border-2 border-slate-300"
              >
                <div class="accordion-item rounded-none">
                  <h2 id="parish-headingOne" class="accordion-header mb-0">
                    <button
                      class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Parishes
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse border-0 collapse show"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="parishSelectMenu"
                      >
                      <li v-for="(name, index) in parishNames" :key="index">
                          <input
                            :id="name.canonical_name"
                            :value="name.canonical_name"
                            name="parish"
                            type="checkbox"
                            class="dropdown-item"
                            @click="() => {addToParishFilter(name.canonical_name)}"
                          />
                          <label :for="name.canonical_name"
                            ><span>{{ name.canonical_name }}</span></label
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-y-auto h-34 px-4 py-4">
              <div
                id="accordionYears"
                class="accordion accordion-flush border-2 border-slate-300"
              >
                <div
                  style="min-height: 150px"
                  class="accordion-item rounded-none"
                >
                  <h2 id="years-headingOne" class="accordion-header mb-0">
                    <button class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseYear"
                      aria-expanded="false"
                      aria-controls="flush-collapseYear"
                    >
                      Year Range
                    </button>
                  </h2>
                  <div
                    id="flush-collapseYear"
                    class="accordion-collapse border-0 collapse show"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="slider-container">
                        <vue-slider
                          v-model="filteredYears"
                          :min="1640"
                          :max="1754"
                          :interval="1"
                          :enable-cross="false"
                          :lazy="true"
                          :dot-options="dotOptions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-y-auto h-34 px-4 py-4">
              <div
                id="accordionCount"
                class="accordion accordion-flush border-2 border-slate-300"
              >
                <div
                  style="min-height: 150px"
                  class="accordion-item rounded-none"
                >
                  <h2 id="count-headingOne" class="accordion-header mb-0">
                    <button
                      class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseCount"
                      aria-expanded="false"
                      aria-controls="flush-collapseCount"
                    >
                      Count Type
                    </button>
                  </h2>
                  <div
                    id="flush-collapseCount"
                    class="accordion-collapse border-0 collapse show"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="dropdown relative">
                        <select
                          v-model="defaultCount"
                          class="dropdown-toggle px-6 py-2.5 bg-indigo-600 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap "
                          data-bs-toggle="dropdown"
                          arias-expanded="false"
                        >
                          <option
                            v-for="(name, index) in countTypeOptions"
                            :key="index"
                            :value="name"
                            class="dropdown-menu min-w-max text-base float-left">
                            <value 
                              :id="index" 
                              :value="name" 
                              name="count-type" 
                              class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent "/>
                            {{ name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-y-auto h-34 px-4 py-4">
              <button class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
                @click="resetFilters">
                Reset Filters
              </button>

              <button
                class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
                @click="applyFilters"
                >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
import VueSlider from "vue-slider-component";

export default {
  name: "WeeklyBillsTable",
  components: {
    VueSlider,
  },
  props: {
    years: {
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
      parishNames: [],
      defaultCount: 'All',
      countTypeOptions: ["All", "Plague", "Buried"],
      filteredParishNames: [],
      filteredYears: this.years,
      // Always show vue-slider tooltips
      dotOptions: [
        {
          tooltip: "always",
        },
        {
          tooltip: "always",
        },
      ],
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
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.years;
      const filteredCountType = this.defaultCount;

      const totalParishes = this.weeklyBills;

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
      
      return result;
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:8090/bom/bills?startYear=" +
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
        "http://localhost:8090/bom/parishes",
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
    onRowClick(params) {
       // eslint-disable-next-line no-console
       console.log("row clicked", params);
       // params.row - row object
       // params.pageIndex - index of this row on the current page.
       // params.selected - if selection is enabled this argument
       // indicates selected or not
       // params.event - click event
     },
    // when the user selects checkboxes for the parish names, we add those parishes 
    // to the filteredParishNames array. This array is used to filter the data.
    addToParishFilter(parish) {
      if (this.filteredParishNames.includes(parish)) {
        this.filteredParishNames.splice(
          this.filteredParishNames.indexOf(parish),
          1,
        );
      } else {
        this.filteredParishNames.push(parish);
      }
    },
    // when the user selects a year range, we add those years to the filteredYears array.
    // This array is used to filter the data.
    addToYearFilter(year) {
      if (this.filteredYears.includes(year)) {
        this.filteredYears.splice(this.filteredYears.indexOf(year), 1);
      } else {
        this.filteredYears.push(year);
      }
    },
    applyFilters() {
      // when the user clicks the apply filters button, the table is updated
      // with the filtered data.
      return this.filteredData;
    },
     resetFilters() {
      this.$emit('reset-filters',
      this.defaultCount = 'All',
      this.filteredParishNames = [],
      this.filteredYears = [1640, 1752],
      );
    },
  },
};
</script>