<!-- this component filters the parish data and emits that data for use in the data table. -->
<template>
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
                    data-bs-parent="#accordionFlush"
                  >
                    <div class="accordion-body py-4 px-5">
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="parishSelectMenu"
                      >
                        <li v-for="(name, index) in parishNames" :key="index">
                          <input
                            :id="name.canonical_name"
                            v-model="filteredParishNames"
                            :value="name.canonical_name"
                            name="parish"
                            type="checkbox"
                            class="dropdown-item"
                            @click="reloadData"
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
                    data-bs-parent="#accordionFlush"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="slider-container">
                        <vue-slider
                          v-model="defaultYears"
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
                <div
                  style="min-height: 150px"
                  class="accordion-item rounded-none"
                >
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
                    data-bs-parent="#accordionFlush"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="dropdown relative">
                        <select
                          v-model="selected"
                          class="dropdown-toggle px-6 py-2.5 bg-indigo-600 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                          data-bs-toggle="dropdown"
                          arias-expanded="false"
                          @change="setCountType"
                          @input="$emit('input', selected)"
                        >
                          <!-- <option v-for="(name, index) in countType" :key="index"> -->
                          <!-- Build an option with v-for but hide where the value is "Total" -->
                          <option
                            v-for="(name, index) in countTypeWeekly"
                            :key="index"
                            :value="name"
                            class="dropdown-menu min-w-max text-base float-left"
                            @change="$emit('input', selected)"
                          >{{ name }}
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
                class="text-xs font-bold uppercase px-5 py-3 m-0.5 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600"
                @click="resetFilters"
              >
                Reset Filters
              </button>

              <button
                class="text-xs font-bold uppercase px-5 py-3 m-0.5 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600"
                @click="toggleAllParishCheckboxes"
              >
                Uncheck all parishes
              </button>

              <button
                class="text-xs font-bold uppercase px-5 py-3 rounded block leading-normal border-solid border-2 border-indigo-600 text-white bg-indigo-600"
                @click="$emit('apply-filters')"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import VueSlider from "vue-slider-component";

export default {
  name: "DataFilters",
  components: {
    VueSlider,
  },
  props: {
    years: {
      type: Array,
      required: true
    },
    parishNames: {
      type: Array,
      required: true
    },
    filteredParishes: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      selected: 'All',
      defaultYears: [1640, 1752],
      totalParishes: [],
      countTypeWeekly: ["All", "Buried", "Plague"],
      countTypeGeneral: ["All", "Total"],
      // Always show vue-slider tooltips
      dotOptions: [
        {
          tooltip: "always",
        },
        {
          tooltip: "always",
        },
      ],
    }
  },
  methods: {
    toggleAllParishCheckboxes() {
      // reset checkboxes to unchecked and emit to parent 
      this.$emit('toggle-all-parish-checkboxes');
    },
    // change the count type value in the parent component and emit to parent
    setCountType() {
      // eslint-disable-next-line no-console
      this.$emit('set-count-type', console.log(this.selected));
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
    applyFilters() {
      this.$emit('apply-filters', this.filteredYears, this.filteredCountType, this.filteredParishNames);
    },
    resetFilters() {
      this.filteredCountType = 'All';
      this.filteredParishNames = [];
      this.filteredYears = [1640, 1752];
      this.$emit('reset-filters');
    },
    reloadData() {
      this.$emit('reload-data', this.filteredYears, this.filteredCountType, this.filteredParishNames);
    }
  }
}
</script>
