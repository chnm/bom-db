<template>
    <div>
        <vue-good-table
            :columns="columnsChristenings"
            :rows="totalChristenings"
            max-height="600px"
            :fixed-header="true"
            :pagination-options="{
            enabled: true
        }"/>
        <div slot="emptystate">
        No data available for the selected filters or search.
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChristeningsTable',
  props: {
    years: {
      type: Array,
      required: true,
    }
  },
  data(){
      return {
        totalChristenings: [],
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
      }
  },
  mounted(){
    axios
      .get('https://data.chnm.org/bom/christenings?startYear=' + this.years[0] + '&endYear=' + this.years[1])
      .then(response => {
        this.totalChristenings = response.data
      })
      .catch(e => {
        this.errors.push(e)
        // eslint-disable-next-line no-console
        console.log(this.errors)
      })
  }
}
</script>
