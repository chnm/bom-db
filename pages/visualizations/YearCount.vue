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
                />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
// import * as d3 from "d3";
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
      data: [],
      margin: {
        top: 0,
        right: 40,
        bottom: 40,
        left: 10,
      },
      width: 900,
      height: 400,
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
  mounted() {
    axios
      .get(
        "https://data.chnm.org/bom/causes?start-year=" +
          this.serverParams.year[0] +
          "&end-year=" +
          this.serverParams.year[1] +
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

  //     // D3 viz
  //   this.svg = d3.select("#visualization")

  //   // eslint-disable-next-line no-console
  //   console.log('length', this.data);

  //   const xScale = d3.scaleBand()
  //     .domain(d3.range(this.data.length))
  //     .range([0, this.width])
  //     .padding(0.1);

  //   const xAxis = d3.axisBottom()
  //     .scale(xScale)
  //     // .tickValues(xScale.domain().filter((d, i) => !((i + 0) % 5)))
  //     .tickFormat((i) => this.data[i].year);

  //   const yScale = d3.scaleLinear(
  //     [0, d3.max(this.data, (d) => d.n)],
  //     [this.height, 0],
  //   );

  //   const yAxis = d3.axisLeft()
  //     .scale(yScale)
  //     .ticks(10);
    
  //   const svg = d3.select('#visualization')
  //     .append('g')
  //     .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    
  //   const viz = svg;
    
  //   viz
  //     .append('g')
  //     .attr('class', 'x axis')
  //     .attr('transform', `translate(0,${this.height})`)
  //     .call(xAxis);

  //   viz
  //     .append('g')
  //     .attr('class', 'y axis')
  //     .attr('transform', `translate(${this.width},0)`)
  //     .call(yAxis);

  //   viz
  //     .selectAll('rect')
  //     .data(this.data)
  //     .enter().append('rect')
  //     .attr('x', (d, i) => xScale(i))
  //     .attr('y', (d) => yScale(d.year))
  //     .attr('width', xScale.bandwidth())
  //     .attr('height', (d) => yScale(0) - yScale(d.count));
  }
};
</script>

<style scoped>
.chart {
    /* margin: 120px auto; */
    display: block;
}
</style>