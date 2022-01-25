<template>
  <div id="app">
    <TheNavBar />
    <!-- <Landing /> -->
    <DataTable />
    <TheFooter />
  </div>
</template>

<script type="text/javascript">
import TheNavBar from "~/components/TheNavBar.vue";
// import Landing from "@/src/views/Landing.vue";
import DataTable from "~/components/DataTable.vue";
import TheFooter from "~/components/TheFooter.vue";

export default {
  components: {
    TheNavBar,
    // Landing,
    DataTable,
    TheFooter,
  },
};
</script>