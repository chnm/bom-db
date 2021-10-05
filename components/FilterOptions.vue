<template>
    <!-- Filter options from data table-->
    <div class="accordion">
        <div class="accordion-header" @click="active = !active">
            <span>{{ filter.name }}</span>
            <span class="accordion-icon">
                <i class="fas fa-chevron-down"></i>
            </span>
        </div>
        <div v-if="active" class="accordion-body">
            <div class="accordion-body-content">
                <div 
                    v-for="option in filter.options"
                    :key="option.id"
                    class="accordion-body-content-item">
                    <input :id="option.name" v-model="option.selected" type="checkbox" :value="option.name">
                    <label :for="option.name">{{ option.name }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FilterOptions',
    props: {
        filter: {
            type: Object,
            required: true
        }
    },
  data() {
      return {
          active: false
      }
  }
};
</script>