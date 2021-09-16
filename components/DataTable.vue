<!-- This component displays a data table of data returned from
the PostgreSQL API. -->
<template>
  <div class="flex flex-wrap">
    <div class="w-full px-12 py-8">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 1, 'text-white bg-indigo-600': openTab === 1}" @click="toggleTabs(1)">
            Parishes
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-indigo-600 bg-white': openTab !== 2, 'text-white bg-indigo-600': openTab === 2}" @click="toggleTabs(2)">
            Total Deaths
          </a>
        </li>
      </ul>
      <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
        <div>
          <vue-good-table
            :columns="parishColumns"
            :rows="parishRows"
            max-height="600px"
            :fixed-header="true"
              :search-options="{
              enabled: true,
              }"
              :pagination-options="{
                  enabled: true
              }"/>
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
          </div>
      </div>
  </div>
</div>

</template>
<script>
export default {
  name: 'BoM',
  data(){
    return {
      parishColumns: [
        {
          label: 'Parish',
          field: 'parish',
        },
        {
          label: 'Burials',
          field: 'buried',
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
        },
        {
          label: 'Date span',
          field: 'span',
        }
      ],
      parishRows: [{"parish":"St ALban Woodstreet","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Barking","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Breadstreet","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alha••ows Great","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alhallows Honylane","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Al••llows Lesse","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"A••allows Lumbardstreet","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Alh•llows Staining","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"A••allows the Wall","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Alphage","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Hubbard","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Undershaft","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Andrew Wardrobe","buried":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Ann Aldersgate","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Ann Blackfryers","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Antholins Parish","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Austins Parish","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bartholomew Exchange","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Fynck","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Gracechurch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Paulswharf","buried":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Bennet Sherehog","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Botolph Billingsgate","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Christs Church","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Christophers","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Clement Eastcheap","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Dionis Backchurch","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Dunstan East","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Edmund Lumbardstr","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Ethelborough","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Faith","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Foster","buried":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Gabriel Fenchurch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St George Borolphlane","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Gregory by St Pauls","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Hellen","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St James Dukes place","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St James Garlickhithe","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Baptist","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Evangelist","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St John Zachary","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Katharine Coleman","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Katharine Crechurch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Lawrence Jewry","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Lawrence Pountney","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Leonard Eastcheap","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Leonard Fosterlane","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Magnus Parish","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Lothbury","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Moses","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Newfishstreet","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Margaret Pattons","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Abchurch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Aldermanbury","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Aldermary","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary le Bow","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Bothaw","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Colechurch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Hill","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Mounthaw","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Sommerset","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Stayning","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Woolchurch","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mary Woolnoth","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Iremongerlane","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Ludgate","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Orgars","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Outwitch","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Martin Vintrey","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Matthew Fridaystreet","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Maudlin Milkstreet","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Maudlin Oldfishstreet","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Bassishaw","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Cornhil","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Crookedlane","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Queenhithe","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Quern","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Royal","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Michael Woodstreet","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mildred Breadstreet","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Mildred Poultrey","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Acons","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Coleabby","buried":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Nicholas Olaves","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Hartstreet","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Jewry","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Olave Silverstreet","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Panc•as Soperlane","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Cheap","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Cornhil","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Paulswharf","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Peter Poor","buried":2,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Steven Colemanstreet","buried":3,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Steven Walbrook","buried":1,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Swithin","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"St Thomas Apostle","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"},{"parish":"Trinity Parish","buried":0,"plague":0,"year":1664,"span":"1664-12-20--1664-12-27"}],
      totalColumns: [
        {
          label: 'Death',
          field: 'type'
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
      totalRows: [{"type":"Abortive","count":4,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Aged","count":21,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Childbed","count":7,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Chrisomes","count":12,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Consumption","count":57,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Convulsion","count":26,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Dropsie","count":24,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Drowned 2, one at St. Magdalen Bermondsey, and one at St. Clement Danes","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Feaver","count":33,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Flox and Small-pox","count":38,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Flux","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"French-pox","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Gangrene","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Griping in the Guts","count":17,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Imposthume","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Infants","count":13,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Killed 2, one at St. Giles in the Fields, and one by a fall from a Mast at St. Mary VVhite∣chapel","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Kingsevil","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Measles","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Overlaid","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Palsie","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rickets","count":9,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rising of the Lights","count":7,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Rupture","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Scowring","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Spotted Feaver","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stilborn","count":8,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stone","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Stopping of the stomach","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Suddenly","count":3,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Surfeit","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Teeth","count":23,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Thrush","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Timpany","count":2,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Tissick","count":5,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Ulcer","count":1,"year":1664,"span":"1664-12-20--1664-12-27"},{"type":"Winde","count":3,"year":1664,"span":"1664-12-20--1664-12-27"}],
      openTab: 1,
    }
  },
  methods: {
    toggleTabs(tabNum) {
      this.openTab = tabNum
    },
  }
};
</script>