<!-- This component displays a data table of data returned from
the PostgreSQL API. -->
<template>
  <div class="flex flex-wrap">
    <div class="w-full px-12 py-8">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 1, 'text-white bg-indigo-600': openTab === 1}" @click="toggleTabs(1)">
            Weekly Bills
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 2, 'text-white bg-indigo-600': openTab === 2}" @click="toggleTabs(2)">
            General Bills
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 3, 'text-white bg-indigo-600': openTab === 3}" @click="toggleTabs(3)">
            Total Deaths
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 4, 'text-white bg-indigo-600': openTab === 4}" @click="toggleTabs(4)">
            Christenings
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 5, 'text-white bg-indigo-600': openTab === 5}" @click="toggleTabs(5)">
            Foodstuffs
          </a>
        </li>
      </ul>
      <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
        <div class="grid grid-cols-4 gap-4">
          <div class="overflow-y-auto h-32 w-80">
            <h3>Parishes</h3>
            <ul>
              <li v-for="(name, index) in parishNames" :key="index">
                <input 
                  :id="name.name"
                  v-model="filteredParishNames" 
                  :value="name.name" 
                  name="parish" 
                  type="checkbox" 
                />
                <label :for="name.name"><span>{{name.name}}</span></label>
              </li>
            </ul>
          </div>
          <div class="overflow-y-auto h-32 w-80">
            <h3>Years</h3>
              <div class="slider-container">
                <vue-slider 
                  v-model="filteredYears"
                  :min="1640"
                  :max="1754"
                  :interval="1"
                  :enable-cross="false" 
                  :lazy="true"
                />
              </div>
          </div>
           <div class="overflow-y-auto h-32 w-80">
            <h3>Count Type</h3>
            <div class="h-10 bg-white flex border border-gray-200 rounded items-center">
            <select v-model='filteredCountType' class="px-4 appearance-none outline-none text-gray-800 w-full">
              <option v-for="(name, index) in countType" :key="index">
                <value 
                  :id="name"
                  :value="name" 
                  name="countType" 
                />
                <text :for="countType"><span class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">{{name}}</span></text>
              </option>
            </select>
            </div>
          </div>
        </div>
        <!-- <button class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-gray-300" @click="checkAll">Check all</button> -->
        <div>
          <vue-good-table
            :is-loading.sync="isLoading"
            :columns="parishColumns"
            :rows="filteredData"
            max-height="600px"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'name', type: 'asc'}}"
            :fixed-header="true"
            :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 25,
                position: 'top',
                perPageDropdown: [25, 50, 100],
                dropdownAllowAll: false,
                setCurrentPage: 1,
                rowsPerPageLabel: 'Rows per page',
                allLabel: 'All records'
            }"
            style-class="vgt-table condensed striped"/>
        </div>
      </div>
      <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
        <div class="grid grid-cols-4 gap-4">
          <div class="overflow-y-auto h-32 w-80">
            <h3>Parishes</h3>
            <ul>
              <li v-for="(name, index) in parishNames" :key="index">
                <input 
                  :id="name.name"
                  v-model="filteredParishNames" 
                  :value="name.name" 
                  name="parish" 
                  type="checkbox" 
                />
                <label :for="name.name"><span>{{name.name}}</span></label>
              </li>
            </ul>
          </div>
          <div class="overflow-y-auto h-32 w-80">
            <h3>Years</h3>
              <div class="slider-container">
                <vue-slider 
                  v-model="filteredYears"
                  :min="1640"
                  :max="1754"
                  :interval="1"
                  :enable-cross="false" 
                  :lazy="true"
                />
              </div>
          </div>
           <div class="overflow-y-auto h-32 w-80">
            <h3>Count Type</h3>
            <div class="h-10 bg-white flex border border-gray-200 rounded items-center">
            <select v-model='filteredCountType' class="px-4 appearance-none outline-none text-gray-800 w-full">
              <option v-for="(name, index) in countType" :key="index">
                <value 
                  :id="name"
                  :value="name" 
                  name="countType" 
                />
                <text :for="countType"><span class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">{{name}}</span></text>
              </option>
            </select>
            </div>
          </div>
        </div>
        <!-- <button class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-gray-300" @click="checkAll">Check all</button> -->
        <div>
          <vue-good-table
            :is-loading.sync="isLoading"
            :columns="parishColumns"
            :rows="filteredData"
            max-height="600px"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'name', type: 'asc'}}"
            :fixed-header="true"
            :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 25,
                position: 'top',
                perPageDropdown: [25, 50, 100],
                dropdownAllowAll: false,
                setCurrentPage: 1,
                rowsPerPageLabel: 'Rows per page',
                allLabel: 'All records'
            }"
            style-class="vgt-table condensed striped"/>
        </div>
        <div>
          <!-- general bills -->
        </div>
      </div>
      <div :class="{'hidden': openTab !== 3, 'block': openTab === 3}"> 
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
                enabled: true
            }"/>
            <div slot="emptystate">
              No data available for the selected filters or search.
            </div>
          </div>
      </div>
      <div :class="{'hidden': openTab !== 4, 'block': openTab === 4}"> 
        <div>
          <ChristeningsDataTable />
        </div>
      </div>
      <div :class="{'hidden': openTab !== 5, 'block': openTab === 5}"> 
        <div>
          <!-- foodstuffs table -->
          <h3>Foodstuffs</h3>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import ChristeningsDataTable from './ChristeningsDataTable.vue';

export default {
  name: 'BoM',
  components: {
    VueSlider,
    ChristeningsDataTable
  },
  data(){
    return {
      isLoading: false,
      checked: false,
      errors: [],
      parishNames: [],
      totalParishes: [],
      filteredYears: [1640, 1752],
      countType: ['All', 'Buried', 'Plague'],
      filteredParishNames: [],
      filteredCountType: 'All',
      parishColumns: [
        {
          label: 'Parish',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: "Search for parish name"
          }
        },
        {
          label: 'Count Type',
          field: 'count_type',
        },
        {
          label: 'Count',
          field: 'count',
          type: 'number',
        },
        {
          label: 'Week Number',
          field: 'week_no',
          type: 'number'
        },
        {
          label: 'Year',
          field: 'year',
          type: 'date',
          dateInputFormat: 'yyyy',
          dateOutputFormat: 'yyyy',
        },
      ],
      totalColumns: [
        {
          label: 'Death',
          field: 'type',
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: "Abortive", text: 'Abortive' },  
              { value: "Childbed", text: 'Childbed' },  
              { value: "Flux", text: 'Flux' }
            ]
          }
        },
        {
          label: 'Total count for time period',
          field: 'count',
          type: 'number'
        },
        {
          label: 'Year',
          field: 'year'
        },
        {
          label: 'Date span',
          field: 'span'
        }
      ],
      totalRows: [
        {"type":"Abortive","count":4,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Aged","count":21,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Childbed","count":7,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Chrisomes","count":12,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Consumption","count":57,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Convulsion","count":26,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Dropsie","count":24,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Drowned 2, one at St. Magdalen Bermondsey, and one at St. Clement Danes","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Feaver","count":33,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Flox and Small-pox","count":38,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Flux","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"French-pox","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Gangrene","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Griping in the Guts","count":17,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Imposthume","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Infants","count":13,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Killed 2, one at St. Giles in the Fields, and one by a fall from a Mast at St. Mary VVhite∣chapel","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Kingsevil","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Measles","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Overlaid","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Palsie","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rickets","count":9,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rising of the Lights","count":7,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rupture","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Scowring","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Spotted Feaver","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stilborn","count":8,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stone","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stopping of the stomach","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Suddenly","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Surfeit","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Teeth","count":23,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Thrush","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Timpany","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Tissick","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Ulcer","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Winde","count":3,"year":1664,"span":"1664-12-20--1664-12-27"}
      ],
      openTab: 1,
    }
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

      const dataFilteredByCountType = this.totalParishes.filter(parish => {
        if (filteredCountType === 'All') {
          return parish;
        } else if (filteredCountType === 'Buried') {
          return parish.count_type === 'Buried';
        } else if (filteredCountType === 'Plague') {
          return parish.count_type === 'Plague';
        }

        return parish;
      });
      
      const result = dataFilteredByCountType.filter(row => {
        if (filteredParishNames.length === 0 && filteredYears === [1640, 1790] && filteredCountType === 'All') {
          return this.totalParishes;        
        } else if (filteredParishNames.length > 0 && filteredCountType === 'All') {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.name);
        } else if (filteredParishNames.length > 0) {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.name);
        } else {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1];
        }
      });

      return result;

    },
    // This function filters the data based on the countType chosen by the user from totalParishes. 
    // The three options are 'All', 'Burial,' or 'Plague'. If the user chooses 'All', the data is returned. 
    // If the user chooses 'Burial', the data is filtered by the 'Burial' count. If the user chooses
    // 'Plague', the data is filtered by the 'Plague' count type.
    uniqueParishes() {
      // The following returns an array of unique parish names from the dataset.
      return this.totalParishes.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.name]: current
        });
      }, {});
    },
  },
  mounted() {
    axios 
        .get('https://data.chnm.org/bom/bills?startYear=' + this.filteredYears[0] + '&endYear=' + this.filteredYears[1]) // Data API url
        .then(response => {
          this.totalParishes = response.data
        })
        .catch(e => {
          this.errors.push(e)
          // eslint-disable-next-line no-console
          console.log(this.errors)
        })
    axios
      .get('https://data.chnm.org/bom/christenings?startYear=' + this.filteredYears[0] + '&endYear=' + this.filteredYears[1]) // Data API url
      .then(response => {
        this.totalChristenings = response.data
      })
      .catch(e => {
        this.errors.push(e)
        // eslint-disable-next-line no-console
        console.log(this.errors)
      })
    axios
      .get('https://data.chnm.org/bom/parishes') // Data API url
      .then(response => {
        this.parishNames = response.data
      })
      .catch(e => {
        this.errors.push(e)
        // eslint-disable-next-line no-console
        console.log(this.errors)
      })
  },
  methods: {
    // TODO: testing -- delete before prod
    log(item) {
      // eslint-disable-next-line no-console
      console.log(item)
    },
    toggleTabs(tabNum) {
      this.openTab = tabNum
    },
  }
};
</script>