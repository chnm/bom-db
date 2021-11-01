<template>
  <div id="app">
    <NavBar />
    <!-- <Landing /> -->
    <DataTable />
    <Footer />
  </div>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue";
// import Landing from "@/src/views/Landing.vue";
import DataTable from "@/components/DataTable.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    NavBar,
    // Landing,
    DataTable,
    Footer,
  },
};
</script>