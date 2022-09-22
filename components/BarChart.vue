<template>
    <div>
        <h2>Completed Bills by Year</h2>
        <p>{{ msg }}</p>

        <svg
            id="chart"
            :height="height"
            :width="width"
        >
        <g transform="translate(50,50)">
            <g
            v-for="(d, i) in data"
            :key="i"
            >
            <rect
                :x="xScale(d.year)"
                :y="yScale(d.count)"
                :width="xScale.bandwidth()"
                :height="height - yScale(d.count)"
                :fill="colorScale(d)"
            />
          
            </g>
        </g>
        <g
            ref="xAxis"
            transform="translate(0, 400)"
        />
        <g
            ref="yAxis"
            transform="translate(50, 0)"
        />
        </svg>
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: "BarChart",
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            msg: "Displaying the total number of completed bills by year",
            // data: [{year: 1640, count: 40}, {year: 1641, count: 6}, {year: 1642, count: 30}, {year: 1643, count: 8}],
            width: 600,
            height: 600,
            xScale: d3.scaleBand(),
            yScale: d3.scaleLinear(),
            colorScale: d3.scaleLinear().range(["#9ed0e6ff", "#c75000ff"]),
        };
    },
    mounted() {
        this.xScale.range([0, 400]).domain(this.data.map((d, i) => d.year));
        this.yScale.range([400, 0]).domain([0, d3.max(this.data, (d) => d.count)]);
        this.colorScale.domain([0, d3.max(this.data, (d) => d.count)]);
        this.renderXAxis();
        this.renderYAxis();
    },
    methods: {
        renderXAxis() {
            d3.select(this.$refs.xAxis).call(d3.axisBottom(this.xScale));
        },
        renderYAxis() {
            d3.select(this.$refs.yAxis).call(d3.axisLeft(this.yScale));
        },
    },
};
</script>

<style scoped>

</style>