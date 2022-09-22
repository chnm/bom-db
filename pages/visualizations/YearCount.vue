<template>
  <div id="visualizations">
    <TheNavBar />
    <div class="flex min-h-screen items-center justify-start bg-white">
      <div class="mx-auto w-full max-w-lg">
        <h2 class="text-4xl font-medium">Visualizations</h2>

               <BarChart
                class="chart"
                :height="400"
                :width="500"
                :data-set="data"
                :margin-left="40"
                :margin-top="40"
                :tick-count="5"
                :bar-padding="0.4"
                />

      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
import BarChart from "~/components/BarChart.vue";
import TheNavBar from "~/components/TheNavBar.vue";
import TheFooter from "~/components/TheFooter.vue";

export default {
  components: {
    TheNavBar,
    TheFooter,
    BarChart,
  },
  data() {
    return {
      data: [
          ["Bob", 33],
          ["Robin", 24],
          ["Mark", 22],
          ["Joe", 29],
          ["Eve", 38],
          ["Karen", 21],
          ["Kirsty", 25],
          ["Chris", 30],
        ],
        realdata: [],
      serverParams: {
        limit: 25,
        offset: 0,
        count_type: "All",
        bill_type: "Weekly",
        parishes: "",
        year: [1640, 1754],
        perPage: 25,
        page: 1,
      },
    };
  },
  computed: {
    // We sum the number of bills for each year
    // and return an array of objects with the year and the sum
    yearCount() {
      const yearCount = this.data.reduce((acc, bill) => {
        const year = bill.year;
        if (!acc[year]) {
          acc[year] = 0;
        }
        acc[year] += 1;
        return acc;
      }, {});
      return Object.keys(yearCount).map((year) => {
        return { year, count: yearCount[year] };
      });
    },
  },
  mounted() {
    axios
      .get(
        "https://data.chnm.org/bom/bills?start-year=" +
          this.serverParams.year[0] +
          "&end-year=" +
          this.serverParams.year[1] +
          "&bill-type=" +
          this.serverParams.bill_type +
          "&count-type=" +
          // if count-type is not All, don't include it in the URL
          (this.serverParams.count_type === "All" ||
          this.serverParams.count_type === "Total"
            ? ""
            : this.serverParams.count_type) +
          // if parish is not empty, use it in the URL to send a query
          (this.serverParams.parishes === ""
            ? ""
            : "&parishes=" + this.serverParams.parishes) +
          "&limit=" +
          this.serverParams.limit +
          "&offset=" +
          this.serverParams.offset
      )
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        this.realdata = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
  }
};
</script>

<style scoped>
.chart {
    margin: 120px auto;
    display: block;
}
</style>