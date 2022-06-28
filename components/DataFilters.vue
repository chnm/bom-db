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
                            v-model="filteredParishNames"
                            :value="name.canonical_name"
                            name="parish"
                            type="checkbox"
                            class="dropdown-item"
                            
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
                @click = "handleAppliedFilters()">
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
// import { mapState } from 'pinia'
// import { mapWritableState } from 'pinia'
// import { filterSelections }  from '@/stores/billsFilterStore'

export default {
  name: "DataFilters",
  components: {
    VueSlider,
  },
  props: {
    years: {
      type: Array,
      required: true,
    },
    parishNames: {
      type: Array,
      required: true,
    },
    countTypeOptions: {
      type: Array,
      required: true,
    },
    countTypeDefault: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filteredParishNames: this.parishNames,
      defaultCount: this.countTypeDefault,
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
    }
  },
  computed: {
    // ...mapWritableState(filterSelections, ['yearRange', 'parishes', 'countType']),
  },
  methods: {
    // applyFilters() {
    //   this.$emit('apply-filters', {
    //     years: this.filteredYears,
    //     parishNames: this.filteredParishNames,
    //     countType: this.defaultCount,
    //   });
    // },
    resetFilters() {
      this.$emit('reset-filters',
      this.defaultCount = 'All',
      this.filteredParishNames = [],
      this.filteredYears = [1640, 1752],

      // eslint-disable-next-line no-console
      console.log('resetFilters() DataFilters.vue : filteredParishNames', this.filteredParishNames),
      // eslint-disable-next-line no-console
      console.log('resetFilters() DataFilters.vue : filteredYears', this.filteredYears),
      // eslint-disable-next-line no-console
      console.log('resetFilters() DataFilters.vue : defaultCount', this.defaultCount),
      );
    },
  }
}
</script>
