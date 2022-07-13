<template>
  <div class="flex flex-wrap">
    <div class="w-full px-12 py-8">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              rounded
              block
              leading-normal
              border-solid border-2 border-indigo-600
            "
            :class="{
              'text-indigo-600 bg-white': openTab !== 1,
              'text-white bg-indigo-600': openTab === 1,
            }"
            @click="toggleTabs(1)"
          >
            Weekly Bills
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              rounded
              block
              leading-normal
              border-solid border-2 border-indigo-600
            "
            :class="{
              'text-indigo-600 bg-white': openTab !== 2,
              'text-white bg-indigo-600': openTab === 2,
            }"
            @click="toggleTabs(2)"
          >
            General Bills
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              rounded
              block
              leading-normal
              border-solid border-2 border-indigo-600
            "
            :class="{
              'text-indigo-600 bg-white': openTab !== 3,
              'text-white bg-indigo-600': openTab === 3,
            }"
            @click="toggleTabs(3)"
          >
            Total Deaths
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              rounded
              block
              leading-normal
              border-solid border-2 border-indigo-600
            "
            :class="{
              'text-indigo-600 bg-white': openTab !== 4,
              'text-white bg-indigo-600': openTab === 4,
            }"
            @click="toggleTabs(4)"
          >
            Christenings
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              rounded
              block
              leading-normal
              border-solid border-2 border-indigo-600
            "
            :class="{
              'text-indigo-600 bg-white': openTab !== 5,
              'text-white bg-indigo-600': openTab === 5,
            }"
            @click="toggleTabs(5)"
          >
            Foodstuffs
          </a>
        </li>
      </ul>
      <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
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
                    <div
                      id="accordionParishes"
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
                    >
                      <div class="accordion-item rounded-none">
                        <h2
                          id="parish-headingOne"
                          class="accordion-header mb-0"
                        >
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
                              <li
                                v-for="(name, index) in parishNames"
                                :key="index"
                              >
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
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
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
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
                    >
                      <div class="accordion-item rounded-none">
                        <h2 id="count-headingOne" class="accordion-header mb-0">
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
                                v-model="filteredCountType"
                                class="
                                  dropdown-toggle
                                  px-6
                                  py-2.5
                                  bg-indigo-600
                                  text-white
                                  font-medium
                                  text-s
                                  leading-tight
                                  rounded
                                  shadow-md
                                  hover:bg-indigo-700 hover:shadow-lg
                                  focus:bg-indigo-700
                                  focus:shadow-lg
                                  focus:outline-none
                                  focus:ring-0
                                  active:bg-indigo-800
                                  active:shadow-lg
                                  active:text-white
                                  transition
                                  duration-150
                                  ease-in-out
                                  flex
                                  items-center
                                  whitespace-nowrap
                                "
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
                                  class="
                                    dropdown-menu
                                    min-w-max
                                    text-base
                                    float-left
                                  "
                                  @change="reloadData"
                                >
                                 
                                  <text :for="countType"
                                    ><span
                                      class="
                                        text-sm
                                        hover:bg-gray-100
                                        text-gray-700
                                        block
                                        px-4
                                        py-2
                                      "
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
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-3
                        m-0.5
                        w-40
                        rounded
                        block
                        leading-normal
                        border-solid border-2 border-indigo-600
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                      "
                      @click="resetFilters"
                    >
                      Reset Filters
                    </button>

                    <button
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-3
                        m-0.5
                        w-40
                        rounded
                        block
                        leading-normal
                        border-solid border-2 border-indigo-600
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                      "
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
          :columns="parishColumns"
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
              <span
                class="hint--bottom"
                aria-label="The names of the parishes."
              >
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
              <span
                class="hint--bottom"
                aria-label="The week number in the year."
              >
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
      <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
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
                    <div
                      id="accordionParishes"
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
                    >
                      <div class="accordion-item rounded-none">
                        <h2
                          id="parish-headingOne"
                          class="accordion-header mb-0"
                        >
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
                              <li
                                v-for="(name, index) in parishNames"
                                :key="index"
                              >
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
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
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
                    <div
                      id="accordionCount"
                      class="
                        accordion accordion-flush
                        border-2 border-slate-300
                      "
                    >
                      <div class="accordion-item rounded-none">
                        <h2 id="count-headingOne" class="accordion-header mb-0">
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
                                v-model="filteredCountType"
                                class="
                                  dropdown-toggle
                                  px-6
                                  py-2.5
                                  bg-indigo-600
                                  text-white
                                  font-medium
                                  text-s
                                  leading-tight
                                  rounded
                                  shadow-md
                                  hover:bg-indigo-700 hover:shadow-lg
                                  focus:bg-indigo-700
                                  focus:shadow-lg
                                  focus:outline-none
                                  focus:ring-0
                                  active:bg-indigo-800
                                  active:shadow-lg
                                  active:text-white
                                  transition
                                  duration-150
                                  ease-in-out
                                  flex
                                  items-center
                                  whitespace-nowrap
                                "
                                data-bs-toggle="dropdown"
                                arias-expanded="false"
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
                                  v-for="(name, index) in countTypeGeneral"
                                  :key="index"
                                  :value="name"
                                  class="
                                    dropdown-menu
                                    min-w-max
                                    text-base
                                    float-left
                                  "
                                >
                                  <text :for="countTypeGeneral"
                                    ><span
                                      class="
                                        text-sm
                                        hover:bg-gray-100
                                        text-gray-700
                                        block
                                        px-4
                                        py-2
                                      "
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
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-3
                        m-0.5
                        w-40
                        rounded
                        block
                        leading-normal
                        border-solid border-2 border-indigo-600
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                      "
                      @click="resetFilters"
                    >
                      Reset Filters
                    </button>

                    <button
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-3
                        m-0.5
                        w-40
                        rounded
                        block
                        leading-normal
                        border-solid border-2 border-indigo-600
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                      "
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
        <div>
          <vue-good-table
            :columns="generalBillColumns"
            :rows="filteredGeneralData"
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
              rowsPerPageLabel: 'Bills per page',
              allLabel: 'All bills',
            }"
            style-class="vgt-table condensed striped"
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
        <div>
          <DeathCausesTable />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 4, block: openTab === 4 }">
        <div>
          <ChristeningsDataTable />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 5, block: openTab === 5 }">
        <div>
          <!-- foodstuffs table -->
          <h3>Foodstuffs</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import ChristeningsDataTable from "./ChristeningsDataTable.vue";
import DeathCausesTable from "./DeathCausesTable.vue";

export default {
  name: "BoM",
  components: {
    VueSlider,
    ChristeningsDataTable,
    DeathCausesTable
  },
  data() {
    return {
      isLoading: false,
      isLoaded: true,
      checked: false,
      showModal: false,
      // Always show vue-slider tooltips
      dotOptions: [
        {
          tooltip: "always",
        },
        {
          tooltip: "always",
        },
      ],
      errors: [],
      countType: ["All", "Buried", "Plague"],
      filteredCountType: "All",
      filteredParishNames: [],
      totalParishes: [],
      parishNames: [],
      totalGeneralBills: [],
      totalRecords: 100000,
      filteredYears: [1640, 1752],
      countTypeGeneral: ["All", "Total"],
      parishColumns: [
        {
          label: "Parish",
          field: "name",
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
      generalBillColumns: [
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
      totalDeaths: [],
      causesofDeathColumns: [
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
      openTab: 1,
      serverParams: {
        limit: 50,
        offset: 0,
        perPage: 25,
        page: 1,
      },
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
      // We then return an array of the filtered data from this.totalParishes.
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.filteredYears;
      const filteredCountType = this.filteredCountType;

      const dataFilteredByCountType = this.totalParishes.filter((parish) => {
        if (filteredCountType === "All") {
          return parish;
        } else if (filteredCountType === "Buried") {
          return parish.count_type === "Buried";
        } else if (filteredCountType === "Plague") {
          return parish.count_type === "Plague";
        } else if (filteredCountType === "Total") {
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
          return this.totalParishes;
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
    filteredGeneralData() {
      // The following returns the dataset based on choices made by the user.
      // 1. If no filters are chosen by parish name, count type, or year range, all the data is returned.
      // 2. If only parish names are selected, the data is filtered by the chosen parish names.
      // 3. If only the year range is selected, the data is filtered by the chosen year range.
      // 4. If a count type is selected, the data is filtered by the chosen count type. 'All' returns all
      //    the data. 'Buried' or 'Plague' returns the data filtered by the chosen count type.
      // We then return an array of the filtered data from this.totalParishes.
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.filteredYears;
      const filteredCountType = this.filteredCountType;

      const dataFilteredByCountType = this.totalGeneralBills.filter(
        (parish) => {
          if (filteredCountType === "All") {
            return parish;
          } else if (filteredCountType === "Buried") {
            return parish.count_type === "Buried";
          } else if (filteredCountType === "Plague") {
            return parish.count_type === "Plague";
          }

          return parish;
        }
      );

      const result = dataFilteredByCountType.filter((row) => {
        if (
          filteredParishNames.length === 0 &&
          filteredYears === [1640, 1790] &&
          filteredCountType === "All"
        ) {
          return this.totalGeneralBills;
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
    axios
      .get(
        "https://data.chnm.org/bom/generalbills?startYear=" +
          this.filteredYears[0] +
          "&endYear=" +
          this.filteredYears[1]
      )
      .then((response) => {
        this.totalGeneralBills = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
    // axios
    //   .get(
    //     "https://data.chnm.org/bom/christenings?startYear=" +
    //       this.filteredYears[0] +
    //       "&endYear=" +
    //       this.filteredYears[1]
    //   ) // Data API url
    //   .then((response) => {
    //     this.totalChristenings = response.data;
    //   })
    //   .catch((e) => {
    //     this.errors.push(e);
    //     // eslint-disable-next-line no-console
    //     console.log(this.errors);
    //   });
    axios
      .get("https://data.chnm.org/bom/parishes") // Data API url
      .then((response) => {
        this.parishNames = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
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
    // TODO: testing -- delete before prod
    log(item) {
      // eslint-disable-next-line no-console
      console.log(item);
    },
    toggleTabs(tabNum) {
      this.openTab = tabNum;
    },
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
      // eslint-disable-next-line no-console
      console.log("serverParams", this.serverParams);
      // eslint-disable-next-line no-console
      console.log("newProps", newProps);
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
          "http://localhost:8090/bom/bills?startYear=" +
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
          // eslint-disable-next-line no-console
          console.log(
            `http://localhost:8090/bom/bills?startYear=${this.filteredYears[0]}&endYear=${this.filteredYears[1]}&limit=${this.serverParams.limit}&offset=${this.serverParams.offset}`
          );
        })
        .catch((e) => {
          this.errors.push(e);
          // eslint-disable-next-line no-console
          console.log(this.errors);
        });
    },
    // applyUpdate is called when the user clicks the "Update" button and returns the vmodel
    // data in filteredData() to the table.
    applyFilters() {
      // eslint-disable-next-line no-console
      console.log("applied");
    },
    // this function resets any filters that have been applied to their default values.
    resetFilters() {
      this.$emit(
        "reset-filters",
        (this.filteredCountType = "All"),
        (this.filteredParishNames = []),
        (this.filteredYears = [1640, 1752])
      );
    },
  },
};
</script>

<style scoped>
/** https://loading.io/css/ */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ddd;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>