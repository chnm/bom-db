<template>
  <footer class="relative bg-gray-300 pt-8 pb-6">
    
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
          <p>Bills of Mortality is generously funded in part by the <a href="https://www.nsf.gov/">National Science Foundation</a> and developed by the <a href="https://rrchnm.org/">Roy Rosenzweig Center for History and New Media</a> at <a href="https://www2.gmu.edu/">George Mason University</a>.</p>
          <div class="logos row">
              <a href="https://rrchnm.org/"><img class="rrchnm-logo" src="~/assets/img/rrchnm-logo.png" alt="Roy Rosenzweig Center for History and New Media logo" /></a>
              <a href="https://www2.gmu.edu/"><img class="gmu-logo" src="~/assets/img/gmu-logo.png" alt="George Mason University logo" /></a>
              <a href="https://www.nsf.gov/"><img class="nsf-logo" src="~/assets/img/nsf-logo.png" alt="National Science Foundation logo" /></a>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span
                class="block uppercase text-gray-600 text-sm font-semibold mb-2"
                >Navigation</span
              >
              <ul class="list-unstyled">
                <li>
                  <a
                    target="_window"
                    class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    href="https://deathbynumbers.org"
                    >About</a
                  >
                </li>
                <li>
                  <a
                    target="_window"
                    class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    href="https://deathbynumbers.org/posts/"
                    >Blog</a
                  >
                </li>
                <li>
                  <a
                    class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    href="/"
                    >Database</a
                  >
                </li>
                <li>
                  <a
                    target="_window"
                    class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    href="https://github.com/chnm/bom-db"
                    >Github</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-400" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-gray-600 font-semibold py-1">
            Copyright © {{date}} Roy Rosenzweig Center for History and New Media.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
