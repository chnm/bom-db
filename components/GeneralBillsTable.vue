<template>
  <div>
    <!-- start of filters -->
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
                <ParishList @check="updateSelectedParishes" />
              </div>
              <div class="overflow-y-auto h-34 px-4 py-4">
                <div
                  id="accordionYears"
                  class="accordion accordion-flush border-2 border-slate-300"
                >
                  <div class="accordion-item rounded-none">
                    <h2 id="years-headingOne" class="accordion-header mb-0">
                      <button
                        class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
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
                            @change="reloadData"
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
                  <div class="accordion-item rounded-none">
                    <h2 id="count-headingOne" class="accordion-header mb-0">
                      <button
                        class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
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
                            class="dropdown-toggle px-6 py-2.5 bg-indigo-600 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                            data-bs-toggle="dropdown"
                            arias-expanded="false"
                            @change="reloadData"
                          >
                            Dropdown button
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="caret-down"
                              class="w-2 ml-2"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                            >
                              <path
                                fill="currentColor"
                                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                              ></path>
                            </svg>
                            <!-- <option v-for="(name, index) in countType" :key="index"> -->
                            <!-- Build an option with v-for but hide where the value is "Total" -->
                            <option
                              v-for="(name, index) in countType"
                              :key="index"
                              :value="name"
                              class="dropdown-menu min-w-max text-base float-left"
                              @change="reloadData"
                            >
                              <text :for="countType"
                                ><span
                                  class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                                  >{{ name }}</span
                                ></text
                              >
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="overflow-y-auto h-34 px-4 py-4">
                <button
                  class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
                  @click="resetFilters"
                >
                  Reset Filters
                </button>

                <button
                  class="text-xs font-bold uppercase px-5 py-3 m-0.5 w-40 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700"
                  @click="applyFilters()"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of filter -->
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="filteredData"
      :total-rows="totalRecords"
      max-height="600px"
      :fixed-header="true"
      :pagination-options="{
        enabled: true,
        position: 'bottom',
        perPageDropdown: [25, 50, 100],
        dropdownAllowAll: false,
        firstLabel: 'First page',
        lastLable: 'Last page',
        nextLabel: 'Next page',
        previousLabel: 'Previous page',
        rowsPerPageLabel: 'Bills per page',
      }"
      :sort-options="{ enabled: false }"
      :search-options="{ enabled: false }"
      style-class="vgt-table condensed striped"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-row-click="onRowClick"
      @on-per-page-change="onPerPageChange"
    >
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label == 'Parish'">
          <span class="hint--bottom" aria-label="The names of the parishes.">
            {{ props.column.label }}
          </span>
        </span>
        <span v-else-if="props.column.label == 'Count Type'">
          <span
            class="hint--bottom"
            aria-label="The count type, either by the number in the parish with plague or the number buried in the parish."
          >
            {{ props.column.label }}
          </span>
        </span>
        <span v-else-if="props.column.label == 'Count'">
          <span
            class="hint--bottom"
            aria-label="The number of plague or buried in the parish."
          >
            {{ props.column.label }}
          </span>
        </span>
        <span v-else-if="props.column.label == 'Week Number'">
          <span class="hint--bottom" aria-label="The week number in the year.">
            {{ props.column.label }}
          </span>
        </span>
        <span v-else-if="props.column.label == 'Year'">
          <span class="hint--bottom" aria-label="The year for the data.">
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
  name: "GeneralBillsTable",
  components: {
    VueSlider
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
      totalBills: [],
      countType: ["All", "Buried", "Plague"],
      countTypeGeneral: ["All", "Total"],
      defaultCount: "All",
      filteredBillsData: [],
      totalParishes: [],
      filteredParishNames: [],
      parishNames: [],
      generalBills: [],
      totalRecords: 10000,
      filteredYears: [1640, 1754],
      // Always show vue-slider tooltips
      dotOptions: [
        {
          tooltip: "always",
        },
        {
          tooltip: "always",
        },
      ],
      serverParams: {
        limit: 50,
        offset: 0,
        perPage: 25, 
        page: 1
      }
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
      // We then return an array of the filtered data from this.generalBills.
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.filteredYears;
      const defaultCount = this.countType;

      const dataFilteredByCountType = this.generalBills.filter((parish) => {
        if (defaultCount === "All") {
          return parish;
        } else if (defaultCount === "Buried") {
          return parish.count_type === "Buried";
        } else if (defaultCount === "Plague") {
          return parish.count_type === "Plague";
        } else if (defaultCount === "Total") {
          return parish.count_type === "Total";
        }

        return parish;
      });

      const result = dataFilteredByCountType.filter((row) => {
        if (
          filteredParishNames.length === 0 &&
          filteredYears === [1640, 1790] &&
          defaultCount === "All"
        ) {
          return this.generalBills;
        } else if (
          filteredParishNames.length > 0 &&
          defaultCount === "All"
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
        "https://data.chnm.org/bom/generalbills?startYear=" +
          this.filteredYears[0] +
          "&endYear=" +
          this.filteredYears[1]
      )
      .then((response) => {
        this.generalBills = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
  },
  methods: {
     reloadData() {
      // Anytime a user changes the year range, parish names, or count type, hide the table
      // and display the loading message.
      this.isLoading = true;
      this.isLoaded = false;

      // After the filter is done, the table is displayed.
      setTimeout(() => {
        this.isLoading = false;
        this.isLoaded = true;
      }, 1000);
    },
    onRowClick(params) {
      // eslint-disable-next-line no-console
      console.log("row clicked", params);
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument
      // indicates selected or not
      // params.event - click event
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({
        page: params.currentPage,
        offset: (params.currentPage - 1) * params.currentPerPage,
      });
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
      this.loadItems();
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params.sortType,
            field: this.parishColumns[params.columnIndex].name,
          },
        ],
      });
      this.loadItems();
    },
    loadItems() {
      return axios
        .get(
          "http://localhost:8090/bom/generalbills?startYear=" +
            this.filteredYears[0] +
            "&endYear=" +
            this.filteredYears[1] +
            "&limit=" +
            this.serverParams.limit +
            "&offset=" +
            this.serverParams.offset
        )
        .then((response) => {
          this.totalParishes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
          // eslint-disable-next-line no-console
          console.log(this.errors);
        });
    },
    applyFilters() {
      // when the user clicks the apply filters button, the table is updated
      // with the filtered data.
      return this.filteredData;
    },
    resetFilters() {
      this.$emit(
        "reset-filters",
        (this.defaultCount = "All"),
        (this.filteredParishNames = []),
        (this.filteredYears = [1640, 1752])
      );
    },
  }
};
</script>
