<template>
  <div id="visualizations">
    <TheNavBar />
    <div class="flex min-h-screen items-center justify-start bg-white">
      <div class="mx-auto w-full max-w-lg">
        <h2 class="text-4xl font-medium">Visualizations</h2>
               <BarChart />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script type="text/javascript">
// import axios from "axios";
// import * as d3 from "d3";
import BarChart from "~/components/Chart.vue";
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
      data: [],
      serverParams: {
        limit: 500,
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
};
</script>

<style scoped>
.chart {
    /* margin: 120px auto; */
    display: block;
}
</style>