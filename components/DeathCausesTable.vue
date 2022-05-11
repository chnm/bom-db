<template>
    <div>
        <vue-good-table
            :columns="columns"
            :rows="totalDeaths"
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
  name: 'DeathCausesTable',
  data(){
      return {
        totalDeaths: [],
        columns: [
        {
          label: 'Cause',
          field: 'death',
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
      .get('https://data.chnm.org/bom/causes')
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
