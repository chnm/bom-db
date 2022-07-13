<template>
  <div>
    <!-- start of filters -->
    <div id="accordionExample" class="accordion">
      <div class="accordion-item bg-white border border-gray-200">
        <h2 id="headingOne" class="accordion-header mb-0">
          <button
            class="
              accordion-button
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
                <filter-reset-buttons
                  @reset="resetFilters"
                  @apply="applyFilters"
                />
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
import ParishList from "./ParishList.vue";
import FilterResetButtons from "./FilterResetButtons.vue";

export default {
  name: "DeathCausesTable",
  components: {
    VueSlider,
    ParishList,
    FilterResetButtons,
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
      filteredYears: [1640, 1754],
      checkedParishes: [],
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
    // store the checked parishes in the checkedParishes array
    updateSelectedParishes(parish) {
      if (this.checkedParishes.includes(parish)) {
        this.checkedParishes.splice(this.checkedParishes.indexOf(parish), 1);
      } else {
        this.checkedParishes.push(parish);
      }
    },
  },
};
</script>
