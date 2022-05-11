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
        <DataFilters 
          :years='filteredYears'
          :parish-names='parishNames'
          :count-type-options='countTypeOptions'
          :count-type-default='countTypeDefault'
        />
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <WeeklyBillsTable 
            :years='filteredYears'
            :parish-names='parishNames'
            :count-type="countTypeDefault"
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
        <!-- start filters -->
        <DataFilters 
          :years='filteredYears'
          :parish-names='parishNames'
          :filtered-parishes='filteredParishes'
          :count-type-options='countTypeOptions'
          :count-type-default='countTypeDefault'
        />
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <GeneralBillsTable 
            :years='filteredYears'
            :parish-names='filteredParishes'
            :count-type="countTypeDefault"
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
        <DataFilters 
          :years='filteredYears'
          :parish-names='filteredParishes'
          :count-type-options='countTypeOptions'
          :count-type-default='countTypeDefault'
        />
        <death-causes-table/>
      </div>
      <div :class="{ hidden: openTab !== 4, block: openTab === 4 }">
        <div>
          <DataFilters 
          :years='filteredYears'
          :parish-names='filteredParishes'
          :count-type-options='countTypeOptions'
          :count-type-default='countTypeDefault'
          />
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
import axios from "axios";
import "vue-slider-component/theme/antd.css";
import DataFilters from "./DataFilters.vue";
import WeeklyBillsTable from "./WeeklyBillsTable.vue";
import GeneralBillsTable from "./GeneralBillsTable.vue";
import DeathCausesTable from "./DeathCausesTable.vue";
import ChristeningsDataTable from "./ChristeningsDataTable.vue";

export default {
  name: "BoM",
  components: {
    DataFilters,
    WeeklyBillsTable,
    GeneralBillsTable,
    DeathCausesTable,
    ChristeningsDataTable,
  },
  data() {
    return {
      isLoading: false,
      isLoaded: true,
      showModal: false,
      errors: [],
      // countTypeOptions: ["All", "Buried", "Plague"],
      // countTypeGeneral: ["All", "Total"],
      parishNames: [],
      // totalParishes: [],
      // filteredData: [],
      filteredParishes: [],
      filteredGeneralData: [],
      filteredYears: [1640, 1752],
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
    // create a button toggle to check or uncheck all parish checkboxes and handle the input
    // for the parish name filter.
    toggleAllParishCheckboxes() {
      this.parishNames = [];
    },
    // this function resets any filters that have been applied to their default values.
    resetFilters() {
      this.parishNames = [];
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