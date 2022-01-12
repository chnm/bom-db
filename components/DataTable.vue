<!-- This component displays a data table of data returned from
the PostgreSQL API. -->
<template>
  <div class="flex flex-wrap">
    <div class="w-full px-12 py-8">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 1, 'text-white bg-indigo-600': openTab === 1}" @click="toggleTabs(1)">
            Locations
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 2, 'text-white bg-indigo-600': openTab === 2}" @click="toggleTabs(2)">
            Total Deaths
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 3, 'text-white bg-indigo-600': openTab === 3}" @click="toggleTabs(3)">
            Christenings
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 4, 'text-white bg-indigo-600': openTab === 4}" @click="toggleTabs(4)">
            Foodstuffs
          </a>
        </li>
      </ul>
      <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
        <div class="grid grid-cols-4 gap-4">
          <div class="overflow-y-auto h-32 w-80">
            <h3>Parishes</h3>
            <ul>
              <li v-for="(name, index) in uniqueParishes" :key="index">
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
                  :max="1790"
                  :interval="1"
                  :enable-cross="false" 
                  :lazy="true"
                />
              </div>
          </div>
           <div class="overflow-y-auto h-32 w-80">
            <h3>Count Type</h3>
            <ul>
              <li v-for="(name, index) in countType" :key="index">
                <input 
                  :id="name"
                  v-model="filteredParishNames"
                  :value="name" 
                  name="countType" 
                  type="checkbox"
                />
                <label :for="countType"><span>{{name}}</span></label>
              </li>
            </ul>
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
        <div>
          <vue-good-table
            :columns="columnsChristenings"
            :rows="filteredChristenings"
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

      <div :class="{'hidden': openTab !== 3, 'block': openTab === 3}"> 
        <div>
          <vue-good-table
            :columns="columnsChristenings"
            :rows="rowsChristenings"
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
  </div>
</div>
</template>

<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'BoM',
  components: {
    VueSlider
  },
  data(){
    return {
      isLoading: false,
      checked: false,
      errors: [],
      totalParishes: [],
      totalChristenings: [],
      // filteredParishes: [],
      filteredYears: [1640, 1752],
      countType: ['Buried', 'Plague'],
      filteredParishNames: [],
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
      columnsChristenings: [
        {
          label: 'Description',
          field: 'christenings_desc',
          filterOptions: {
            enabled: true,
            placeholder: "Search for parish name"
          }
        },
        {
          label: 'Count',
          field: 'count',
          type: 'number',
        },
        {
          label: 'Year',
          field: 'year',
          type: 'date',
          dateInputFormat: 'yyyy',
          dateOutputFormat: 'yyyy',
        },
      ],
      openTab: 1,
    }
  },
  computed: {
    filteredData() {
      // The following returns the dataset based on choices made by the user. 
      // 1. If no filters are chosen by parish name or year range, all the data is returned. 
      // 2. If only parish names are selected, the data is filtered by the chosen parish names.
      // 3. If only the year range is selected, the data is filtered by the chosen year range.
      // We then return an array of the filtered data from this.totalParishes.
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.filteredYears;
      // const filteredCountType = this.countType;

      const result = this.totalParishes.filter(row => {
        if (filteredParishNames.length === 0 && filteredYears === [1640, 1790]) {
          // if filteredCountType.length === 2 {
          //   return row.count >= filteredCountType[0] && row.count <= filteredCountType[1];
          // } else {
          //   return row.count === filteredCountType[0];
          // }
          return this.totalParishes;
        } else if (filteredParishNames.length > 0) {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.name);
        } else {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1];
        }
      });

      return result;

    },
    filteredChristenings() {
      // The following returns the dataset based on choices made by the user. 
      // 1. If no filters are chosen by parish name or year range, all the data is returned. 
      // 2. If only parish names are selected, the data is filtered by the chosen parish names.
      // 3. If only the year range is selected, the data is filtered by the chosen year range.
      // We then return an array of the filtered data from this.totalParishes.
      const filteredYears = this.filteredYears;
      // const filteredCountType = this.countType;

      const result = this.totalChristenings.filter(row => {
        if (filteredYears === [1640, 1790]) {
          return this.totalChristenings;
        } else  {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1];
        }
      });

      return result;

    },
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
        .get('http://localhost:8090/bom/bills?startYear=' + this.filteredYears[0] + '&endYear=' + this.filteredYears[1]) // Data API url
        .then(response => {
          this.totalParishes = response.data
        })
        .catch(e => {
          this.errors.push(e)
          // eslint-disable-next-line no-console
          console.log(this.errors)
        })
    axios
      .get('http://localhost:8090/bom/christenings?startYear=' + this.filteredYears[0] + '&endYear=' + this.filteredYears[1]) // Data API url
      .then(response => {
        this.totalChristenings = response.data
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
    dateRangeFilter(data, filterString) {
      const dateRange = filterString.split(',')
      const startDate = Date.parse(dateRange[0])
      const endDate = Date.parse(dateRange[1])

      return (data =
        Date.parse(data) >= startDate && Date.parse(data) <= endDate);
    },
    onRangeUpdate(value) {
      this.fromChild = value
    },
    updateYearValue(arr) {
      this.filteredYears = arr;
      // eslint-disable-next-line no-console
      console.log("arr", arr);
    },
    changeYears() {
      this.$emit('changeYears', this.filteredYears)
    }
    // checkAll() {
    //   this.parishRows = this.parishRows.map(parish => {...parish, checked:!this.isAllChecked})
    //   this.isAllChecked = !this.isAllChecked
    // }
  }
};
</script>