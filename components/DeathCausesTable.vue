<template>
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
</template>

<script>
export default {
    data() {
        return {
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
        }
    }
}
</script>

<style scoped>

</style>