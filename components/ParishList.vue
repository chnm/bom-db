<template>
  <div>
    <div
      id="accordionParishes"
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
            Parishes
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse border-0 collapse show"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body py-4 px-5">
            <ul class="dropdown-menu" aria-labelledby="parish-selection-menu">
              <li v-for="(name, index) in parishList" :key="index">
                <input
                  :id="name.canonical_name"
                  v-model="filteredParish"
                  :value="name.canonical_name"
                  name="parish"
                  type="checkbox"
                  class="dropdown-item"
                  @change="$emit('check', $event)"
                />
                <label :for="name.canonical_name"
                  ><span>{{ name.canonical_name }}</span></label
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
import axios from "axios";

export default {
  name: "ParishList",
  props: {
    value: {
        type: String,
        default: ""
    },
    checked: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      parishList: [],
      filteredParish: [],
      filteredYears: [1640, 1754],
      countType: ["All", "Buried", "Plague"],
      countDefault: "All",
    };
  },
  mounted() {
    axios
      .get("https://data.chnm.org/bom/parishes")
      .then((response) => {
        this.parishList = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
        // eslint-disable-next-line no-console
        console.log(this.errors);
      });
  },
  methods: {
    check(event) {
      if (event.target.checked) {
        this.filteredParish.push(event.target.id);
      } else {
        this.filteredParish.splice(
          this.filteredParish.indexOf(event.target.id),
          1
        );
      }
    },
  },
};
</script>
