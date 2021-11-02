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
              <li v-for="(name, index) in parishRows" :key="index">
                <input 
                  :id="name.parish"
                  v-model="filteredParishNames" 
                  :value="name.parish" 
                  name="parish" 
                  type="checkbox" 
                />
                <label :for="name.parish"><span>{{name.parish}}</span></label>
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
        </div>
        <!-- <button class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-gray-300" @click="checkAll">Check all</button> -->
        <div>
          <vue-good-table
            :columns="parishColumns"
            :rows="filteredData"
            max-height="600px"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'parish', type: 'asc'}}"
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
      loading: true,
      checked: false,
      errors: [],
      // totalParishes: [],
      // filteredParishes: [],
      filteredYears: [1640, 1790],
      filteredParishNames: [],
      parishColumns: [
        {
          label: 'Parish',
          field: 'parish',
          filterOptions: {
            enabled: true,
            placeholder: "Search for parish name"
          }
        },
        {
          label: 'Burials',
          field: 'burials',
          type: 'number',
        },
        {
          label: 'Plague',
          field: 'plague',
          type: 'number',
        },
        {
          label: 'Year',
          field: 'year',
          type: 'date',
          dateInputFormat: 'yyyy',
          dateOutputFormat: 'yyyy',
          filterOptions: {
            enabled: true,
            placeholder: "Filter by year",
            filterFn: this.dateRangeFilter
          }
        },
      ],
      parishRows: [
        {"parish":"St ALban Woodstreet","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Barking","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Breadstreet","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alha••ows Great","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Honylane","burials":0,"plague":0,"year":1644,"span":"1664-12-20--1664-12-27"},{"parish":"Al••llows Lesse","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"A••allows Lumbardstreet","burials":2,"plague":0,"year":1673,"span":"1664-12-20--1664-12-27"},{"parish":"Alh•llows Staining","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"A••allows the Wall","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Alphage","burials":0,"plague":0,"year":1673,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Hubbard","burials":1,"plague":0,"year":1644,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Undershaft","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Wardrobe","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Ann Aldersgate","burials":1,"plague":0,"year":1644,"span":"1664-12-20--1664-12-27"},{"parish":"St Ann Blackfryers","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Antholins Parish","burials":0,"plague":0,"year":1701,"span":"1664-12-20--1664-12-27"},{"parish":"St Austins Parish","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bartholomew Exchange","burials":0,"plague":0,"year":1701,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Fynck","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Gracechurch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Paulswharf","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Sherehog","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Botolph Billingsgate","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Christs Church","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Christophers","burials":0,"plague":0,"year":1701,"span":"1664-12-20--1664-12-27"},{"parish":"St Clement Eastcheap","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Dionis Backchurch","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Dunstan East","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Edmund Lumbardstr","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Ethelborough","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Faith","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Foster","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Gabriel Fenchurch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Buried in the 97 Parishes within the Walls","burials":60,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Holborn","burials":19,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bartholomew Great","burials":5,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bartholomew Lesse","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bridget","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Bridewel Precinct","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Botolph Aldersgate","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Buried in the 16 Parishes without the Walls, and at the Pesthouse","burials":125,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Gile• in the fields","burials":14,"plague":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Hackney Parish","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St James Clerkenwel","burials":8,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Kath. near the Tower","burials":4,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Buried in the 12 out Parishes in Middlesex and Surry","burials":67,"plague":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Clement Danes","burials":8,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Paul Covent Garden","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St George Borolphlane","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Gregory by St Pauls","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Hellen","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St James Dukes place","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St James Garlickhithe","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Baptist","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Evangelist","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Zachary","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Katharine Coleman","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Katharine Crechurch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Lawrence Jewry","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Lawrence Pountney","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Leonard Eastcheap","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Leonard Fosterlane","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Magnus Parish","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Lothbury","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Moses","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Newfishstreet","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Pattons","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Abchurch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Aldermanbury","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Aldermary","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary le Bow","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Bothaw","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Colechurch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Hill","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Mounthaw","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Sommerset","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Stayning","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Woolchurch","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Woolnoth","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Iremongerlane","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Botolph Aldgate","burials":12,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Botolph Bishopsgate","burials":9,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Dunstan West","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St George Southwark","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Giles Cripplegate","burials":27,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Southwark","burials":14,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Lambeth Parish","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Leonard Shoreditch","burials":9,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Magdalen Bermondsey","burials":4,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Newington","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin in the fields","burials":17,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Savoy","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Ludgate","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Orgars","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Outwitch","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Vintrey","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Matthew Fridaystreet","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Maudlin Milkstreet","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Maudlin Oldfishstreet","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Bassishaw","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Cornhil","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Crookedlane","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Queenhithe","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Quern","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Royal","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Woodstreet","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mildred Breadstreet","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mildred Poultrey","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Acons","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Coleabby","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Olaves","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Hartstreet","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Jewry","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Silverstreet","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Panc•as Soperlane","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Cheap","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Cornhil","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Paulswharf","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Poor","burials":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Steven Colemanstreet","burials":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Steven Walbrook","burials":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Swithin","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Thomas Apostle","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Trinity Parish","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Saviours Southwark","burials":8,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"S. Sepulchres Parish","burials":21,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Thomas Southwark","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Trinity Minories","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"At the Pesthouse","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Islington","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Whitechappel","burials":8,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Rothorith Parish","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Stepney Parish","burials":18,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Westminster","burials":14,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Whereof at the Pesthouse","burials":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"}
      ]
      ,
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
      const filteredParishNames = this.filteredParishNames;
      const filteredYears = this.filteredYears;

      const result = this.parishRows.filter(row => {
        if (filteredParishNames.length === 0 && filteredYears === [1640, 1790]) {
          return this.parishRows;
        } else if (filteredParishNames.length > 0) {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.parish);
        } else {
          return row.year >= filteredYears[0] && row.year <= filteredYears[1];
        }
      });

      return result;

    }
  },
  mounted() {
    axios 
        .get('') // API url
        .then(response => {
          this.totalParishes = response.data
        })
        .catch(e => {
          this.errors.push(e)
          // eslint-disable-next-line no-console
          console.log(this.errors)
        })
  },
  methods: {
    // testing -- delete before prod
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