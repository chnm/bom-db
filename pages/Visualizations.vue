<template>
      <div id="visualizations">
        <TheNavBar />
        <div class="flex min-h-screen items-center justify-start bg-white">
          <BarChart title="Bar Chart" xKey="year" yKey="count" :data="data"/>

            <div class="mx-auto w-full max-w-lg">
                <h2 class="text-4xl font-medium">Visualizations</h2>

                <p><strong>Coming soon</strong>. Visualizing, mapping, and aggregating data about the London Bills of Mortality.</p>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script type="text/javascript">
import axios from "axios";
import * as d3 from "d3";
import BarChart from "~/components/BarChart.vue";
import TheNavBar from "~/components/TheNavBar.vue";
import TheFooter from "~/components/TheFooter.vue";

export default {
  components: {
    TheNavBar,
    TheFooter,
    BarChart
  },
  data() {
    return {
      data: [],
      chart: d3.select("#chart").append("g").attr("transform", `translate(${this.margin.left}, ${this.margin.top})`),
      x: d3.scaleLinear().range([0, this.width - this.margin.left - this.margin.right]),
      y: d3.scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]),
      xAxis: this.chart.append("g").attr("transform", `translate(0, ${this.height - this.margin.top - this.margin.bottom})`),
      yAxis: this.chart.append("g"),
      whales: [
        { age: 13, weight: 114 },
        { age: 33, weight: 101 },
        { age: 52, weight: 139 }
    ],
    width: 500,
    height: 500,
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 60
    },
      serverParams: {
          limit: 25,
          offset: 0,
          count_type: "Total",
          bill_type: "General",
          parishes: "",
          year: [1640, 1754],
          perPage: 25,
          page: 1,
        },
    };
  },
  computed: {
    // we want to sum the total number of bills for each year
    sumData() {
      return this.data.reduce((acc, cur) => {
        const year = cur.year;
        if (acc[year]) {
          acc[year] += cur.count;
        } else {
          acc[year] = cur.count;
        }
        // eslint-disable-next-line no-console
        console.log("summed: ", acc);
        return acc;
      }, {});
    },
  },
  watch: {
    whales: {
      deep: true,
      handler() { this.plot(); }
    }
  },
  mounted() {
    // plot();

    axios
        .get(
          "https://data.chnm.org/bom/bills?start-year=" +
            this.serverParams.year[0] +
            "&end-year=" +
            this.serverParams.year[1] +
            "&bill-type=" +
            this.serverParams.bill_type +
            // if count-type is All, don't include it in the URL to get the right query
            (this.serverParams.count_type === "All" ||
            this.serverParams.count_type === "Total"
              ? ""
              : "&count-type=" + this.serverParams.count_type) +
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
          this.data = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
          // eslint-disable-next-line no-console
          console.log(this.errors);
        });
  },
  methods: {
    plot() {
      this.x.domain([0, d3.max(this.whales, d => d.age)]);
      this.y.domain([0, d3.max(this.whales, d => d.weight)]);
      this.xAxis.call(d3.axisBottom(this.x));
      this.yAxis.call(d3.axisLeft(this.y));
    }
  },
};
</script>