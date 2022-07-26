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
                    <div
      id="accordionParishes"
      class="accordion accordion-flush border-2 border-slate-300"
    >
      <div class="accordion-item rounded-none">
        <h2 id="parish-headingOne" class="accordion-header mb-0">
          <button
            class="
              accordion-button
              collapsed
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Causes of Death
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse border-0 collapse show"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body py-4 px-5">
            <ul class="dropdown-menu" aria-labelledby="parish-selection-menu">
              <li v-for="(cause, index) in totalDeaths" :key="index">
                <input
                  :id="cause.death_id"
                  v-model="filteredCauseIDs"
                  :value="cause.death"
                  name="causes"
                  type="checkbox"
                  class="dropdown-item"
                  @change="$emit('check', $event)"
                />
                <label :for="cause.death_id"
                  ><span>{{ cause.death }}</span></label
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
                          />
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
      :columns="columns"
      :rows="totalDeaths"
      max-height="600px"
      :fixed-header="true"
      :pagination-options="{
        enabled: true,
      }"
    />
  </div>
</template>

<script>
import axios from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "DeathCausesTable",
  components: {
    VueSlider,
  },
  data() {
    return {
      totalDeaths: [],
      columns: [
        {
          label: "Cause",
          field: "death",
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
      // Always show vue-slider tooltips
      dotOptions: [
        {
          tooltip: "always",
        },
        {
          tooltip: "always",
        },
      ],
      filteredYears: [1640, 1754],
      filteredCauseIDs: [],
      serverParams: {
        limit: 25,
        offset: 0,
        causes: "",
        year: [1640, 1754],
        perPage: 25, 
        page: 1
      }
    };
  },
  mounted() {
    axios
      .get("https://data.chnm.org/bom/causes")
      .then((response) => {
        this.totalDeaths = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    loadItems() {
      return axios
        .get(
          "http://localhost:8090/bom/bills?start-year=" +
            this.serverParams.year[0] +
            "&end-year=" +
            this.serverParams.year[1] +
            "&bill-type=" +
            this.serverParams.bill_type +
            // if count-type is All, don't include it in the URL to get the right query
            (this.serverParams.count_type === "All" || this.serverParams.count_type === "Total"
              ? ""
              : "&count-type=" + this.serverParams.count_type) +
            // if parish is not empty, use it in the URL to send a query
            (this.serverParams.parishes === ""
              ? ""
              : "&parishes=" + this.serverParams.parishes) +
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
    // When the user clicks the Apply Filters button, we use the 
    // v-model data in filteredParishIDs, filteredYears, and 
    // filteredCountType to update the serverParams.parishes, serverParams.year, and
    // serverParams.count_type arrays. Then we submit a new request to the server.
    applyFilters() {
      this.updateParams({
        causes: this.filteredCauseIDs,
        year: this.filteredYears,
      });
      this.loadItems();
    },

    // When a user clicks the Reset Filters button, we return the data to their defaults.
    resetFilters() {
      this.filteredParishIDs = [];
      this.filteredYears = [1640, 1754];
      this.filteredCountType = "Total";
      this.updateParams({
        causes: [],
        year: [1640, 1754],
      });
      this.loadItems();
    },
  },
};
</script>
