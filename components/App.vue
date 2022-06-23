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
              'text-indigo-600 bg-white': openTab !== 2,
              'text-white bg-indigo-600': openTab === 2,
            }"
            @click="toggleTabs(2)"
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
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <GeneralBillsTable 
            :years='filteredYears'
            :parish-names='filteredParishes'
            :count-type='countTypeDefault'
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
        <div v-if="isLoading" id="loading">
          <h1>Loading...</h1>
        </div>
        <div v-show="isLoaded" id="loaded" @load="isLoaded">
          <WeeklyBillsTable
            :parish-names='parishNames'
            :count-type-options='countTypeWeeklyOptions'
            :count-type-default='countTypeDefault'
            :years='filteredYears'
          />
        </div>
      </div>
      <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
        <DataFilters 
          :years='filteredYears'
          :parish-names='parishNames'
          :filtered-parishes='filteredParishes'
          :count-type-options='countTypeGeneralOptions'
          :count-type-default='countTypeDefault'
        />
        <DeathCausesTable
          :years='filteredYears'
          :parish-names='filteredParishes'
          :count-type='countTypeDefault'
        />
      </div>
      <div :class="{ hidden: openTab !== 4, block: openTab === 4 }">
        <div>
        <DataFilters 
          :years='filteredYears'
          :parish-names='parishNames'
          :filtered-parishes='filteredParishes'
          :count-type-options='countTypeGeneralOptions'
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
      countTypeWeeklyOptions: ["All", "Buried", "Plague"],
      countTypeGeneralOptions: ["All", "Total"],
      countTypeDefault: 'All',
      parishNames: [],
      totalParishes: [],
      filteredParishes: [],
      filteredYears: [1640, 1752],
      openTab: 1,
    };
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
  },
  methods: {
    toggleTabs(tabNum) {
      this.openTab = tabNum;
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