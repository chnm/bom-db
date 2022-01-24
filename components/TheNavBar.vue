<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <NuxtLink id="site-title" class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" to="/">London Bills of Mortality</NuxtLink>
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" @click="toggleNavbar()">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div :class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
              <NuxtLink to="/blog/" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2">Blog</NuxtLink>
          </li>
          <li class="nav-item">
              <NuxtLink to="/database/" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2">Database</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/visualizations/" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2">Visualizations</NuxtLink>
          </li>
          <div class="relative inline-flex align-middle w-full">
            <li ref="btnDropdownRef" class="nav-item" @click="toggleDropdown()">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#">
                    <span class="ml-2">About</span>
                </a>
            </li>
            <div ref="popoverDropdownRef" :class="{'hidden': !dropdownPopoverShow, 'block': dropdownPopoverShow}" class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" style="min-width:12rem">
                <NuxtLink to="/team/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-blueGray-700">
                    Project team
                </NuxtLink>
                <NuxtLink to="/about/data/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-blueGray-700">
                    About the data
                </NuxtLink>
                <NuxtLink to="about/contact/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-blueGray-700">
                    Contact
                </NuxtLink>
                <div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
                <a href="https://github.com/chnm/bom-db/issues" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-blueGray-700">
                    Report an issue
                </a>
                </div>
            </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  name: "IndigoNavbar",
  data() {
    return {
      showMenu: false,
      dropdownPopoverShow: false,
    }
  },
  methods: {
    toggleNavbar(){
      this.showMenu = !this.showMenu;
    },
    toggleDropdown(){
        if(this.dropdownPopoverShow){
            this.dropdownPopoverShow = false;
        }else{
            this.dropdownPopoverShow = true;
            createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                placement: 'bottom-start',
        });
    }
    }
  }
}
</script>
