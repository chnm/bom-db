<template>
  <div class="overflow-y-auto h-36 px-4 py-4">
    <div
      :id="accordionid"
      class="accordion accordion-flush border-2 border-slate-300"
    >
      <div class="accordion-item rounded-none">
        <h2 id="parish-headingOne" class="accordion-header mb-0">
          <button
            class="
              accordion-button
              collapsed
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {{ title }}
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse border-0 collapse show"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body py-4 px-5">
            <ul
              class="dropdown-menu"
              aria-labelledby="option-value"
            >
              <li v-for="(name, index) in parishNames" :key="index">
                <input
                  :id="name.name"
                  v-model="filteredParishNames"
                  :value="name.name"
                  name="parish"
                  type="checkbox"
                  class="dropdown-item"
                />
                <label :for="name.name"
                  ><span>{{ name.name }}</span></label
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    parishNames: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      accordionID: 'options-accordion',
      parishSelectMenuID: 'options-select-menu',
      filteredValues: []
    };
  },
  computed: {
    parishNamesFiltered() {
      return this.parishNames.filter(parish => {
        return parish.name.toLowerCase().includes(this.filteredParishNames);
      });
    }
  },
  methods: {
    updateFilteredParishNames(event) {
      this.filteredParishNames = event.target.value;
    }
  }
};
</script>
