<!-- This component displays a data table of data returned from
the PostgreSQL API. -->
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
        <!-- start filters -->
        <DataFilters />
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <WeeklyBillsTable 
            :years='filteredYears'
            :parish-names='filteredParishNames'
            :count-type="countTypeDefault"
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
        <!-- start filters -->
        <DataFilters />
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <GeneralBillsTable 
            :years='filteredYears'
            :parish-names='filteredParishNames'
            :count-type="countTypeDefault"
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
        <div>
          <vue-good-table
            :columns="totalColumns"
            :rows="totalRows"
            max-height="600px"
            :fixed-header="true"
            :search-options="{
              enabled: true,
            }"
            :pagination-options="{
              enabled: true,
            }"
          />
          <div slot="emptystate">
            No data available for the selected filters or search.
          </div>
        </div>
      </div>
      <div :class="{ hidden: openTab !== 4, block: openTab === 4 }">
        <div>
          <DataFilters />
          <ChristeningsDataTable :years='filteredYears' />
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
import "vue-slider-component/theme/antd.css";
import DataFilters from "./DataFilters.vue";
import WeeklyBillsTable from "./WeeklyBillsTable.vue";
import GeneralBillsTable from "./GeneralBillsTable.vue";
import ChristeningsDataTable from "./ChristeningsDataTable.vue";

export default {
  name: "BoM",
  components: {
    DataFilters,
    WeeklyBillsTable,
    GeneralBillsTable,
    ChristeningsDataTable,
  },
  data() {
    return {
      isLoading: false,
      isLoaded: true,
      showModal: false,
      // errors: [],
      countType: ["All", "Buried", "Plague"],
      countTypeDefault: "All",
      filteredParishNames: [],
      totalParishes: [],
      filteredData: [],
      filteredGeneralData: [],
      filteredYears: [1640, 1752],
      totalGeneralBills: [],
      totalRecords: 0,
      countTypeGeneral: ["All", "Total"],
      // parishColumns: [
      //   {
      //     label: "Parish",
      //     field: "name",
      //     filterOptions: {
      //       enabled: true,
      //       placeholder: "Search for parish name",
      //     },
      //   },
      //   {
      //     label: "Count Type",
      //     field: "count_type",
      //   },
      //   {
      //     label: "Count",
      //     field: "count",
      //     type: "number",
      //   },
      //   {
      //     label: "Week Number",
      //     field: "week_no",
      //     type: "number",
      //   },
      //   {
      //     label: "Year",
      //     field: "year",
      //     type: "date",
      //     dateInputFormat: "yyyy",
      //     dateOutputFormat: "yyyy",
      //   },
      // ],
      // generalBillColumns: [
      //   {
      //     label: "Parish",
      //     field: "name",
      //     filterOptions: {
      //       enabled: true,
      //       placeholder: "Search for parish name",
      //     },
      //   },
      //   {
      //     label: "Count Type",
      //     field: "count_type",
      //   },
      //   {
      //     label: "Count",
      //     field: "count",
      //     type: "number",
      //   },
      //   {
      //     label: "Week Number",
      //     field: "week_no",
      //     type: "number",
      //   },
      //   {
      //     label: "Year",
      //     field: "year",
      //     type: "date",
      //     dateInputFormat: "yyyy",
      //     dateOutputFormat: "yyyy",
      //   },
      // ],
      totalColumns: [
        {
          label: "Death",
          field: "type",
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: "Abortive", text: "Abortive" },
              { value: "Childbed", text: "Childbed" },
              { value: "Flux", text: "Flux" },
            ],
          },
        },
        {
          label: "Total count for time period",
          field: "count",
          type: "number",
        },
        {
          label: "Year",
          field: "year",
        },
        {
          label: "Date span",
          field: "span",
        },
      ],
      totalRows: [
        {
          type: "Abortive",
          count: 4,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        { type: "Aged", count: 21, year: 1664, span: "1664-12-20--1664-12-27" },
        {
          type: "Childbed",
          count: 7,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Chrisomes",
          count: 12,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Consumption",
          count: 57,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Convulsion",
          count: 26,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Dropsie",
          count: 24,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Drowned 2, one at St. Magdalen Bermondsey, and one at St. Clement Danes",
          count: 2,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Feaver",
          count: 33,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Flox and Small-pox",
          count: 38,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        { type: "Flux", count: 1, year: 1664, span: "1664-12-20--1664-12-27" },
        {
          type: "French-pox",
          count: 3,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Gangrene",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Griping in the Guts",
          count: 17,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Imposthume",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Infants",
          count: 13,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Killed 2, one at St. Giles in the Fields, and one by a fall from a Mast at St. Mary VVhite∣chapel",
          count: 2,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Kingsevil",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Measles",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Overlaid",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Palsie",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Rickets",
          count: 9,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Rising of the Lights",
          count: 7,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Rupture",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Scowring",
          count: 2,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Spotted Feaver",
          count: 5,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Stilborn",
          count: 8,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        { type: "Stone", count: 3, year: 1664, span: "1664-12-20--1664-12-27" },
        {
          type: "Stopping of the stomach",
          count: 5,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Suddenly",
          count: 3,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Surfeit",
          count: 5,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Teeth",
          count: 23,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Thrush",
          count: 1,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Timpany",
          count: 2,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        {
          type: "Tissick",
          count: 5,
          year: 1664,
          span: "1664-12-20--1664-12-27",
        },
        { type: "Ulcer", count: 1, year: 1664, span: "1664-12-20--1664-12-27" },
        { type: "Winde", count: 3, year: 1664, span: "1664-12-20--1664-12-27" },
      ],
      openTab: 1,
    };
  },
  computed: {
    allData() {
      return this.totalParishes;
    },
    // TODO: REMOVE THIS--This function filters the data based on the countType chosen by the user from totalParishes.
    // The three options are 'All', 'Burial,' or 'Plague'. If the user chooses 'All', the data is returned.
    // If the user chooses 'Burial', the data is filtered by the 'Burial' count. If the user chooses
    // 'Plague', the data is filtered by the 'Plague' count type.
    // uniqueParishes() {
    //   // The following returns an array of unique parish names from the dataset.
    //   return this.totalParishes.reduce((seed, current) => {
    //     return Object.assign(seed, {
    //       [current.name]: current,
    //     });
    //   }, {});
    // },
  },
  mounted() {
    // axios
    //   .get(
    //     "https://data.chnm.org/bom/bills?startYear=" +
    //       this.filteredYears[0] +
    //       "&endYear=" +
    //       this.filteredYears[1]
    //   )
    //   .then((response) => {
    //     this.totalParishes = response.data;
    //   })
    //   .catch((e) => {
    //     this.errors.push(e);
    //     // eslint-disable-next-line no-console
    //     console.log(this.errors);
    //   });
    // axios
    //   .get(
    //     "https://data.chnm.org/bom/generalbills?startYear=" +
    //       this.filteredYears[0] +
    //       "&endYear=" +
    //       this.filteredYears[1]
    //   )
    //   .then((response) => {
    //     this.totalGeneralBills = response.data;
    //   })
    //   .catch((e) => {
    //     this.errors.push(e);
    //     // eslint-disable-next-line no-console
    //     console.log(this.errors);
    //   });
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
    // reloadData() {
    //   // Anytime a user changes the year range, parish names, or count type, hide the table
    //   // and display the loading message.
    //   this.isLoading = true;
    //   this.isLoaded = false;

    //   // After the filter is done, the table is displayed.
    //   setTimeout(() => {
    //     this.isLoading = false;
    //     this.isLoaded = true;
    //   }, 1000);
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
    // create a button toggle to check or uncheck all parish checkboxes and handle the input
    // for the parish name filter.
    toggleAllParishCheckboxes() {
      this.filteredParishNames = [];
    },
    // this function resets any filters that have been applied to their default values.
    resetFilters() {
      this.filteredParishNames = [];
      this.filteredYears = [1640, 1752];
      this.filteredCountType = "All";
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