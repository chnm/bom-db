<template>
    <div class="year-slider">
        <vue-slider 
            v-model="yearValue"
            :min="1640"
            :max="1790"
            :interval="1"
            :enable-cross="false" 
            :lazy="true"
            @change="changeYears"
        />
        <div><code>value: {{ yearValue }}</code></div>
    </div>
</template>

<script> 
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
    name: 'YearSlider',
    components: {
        VueSlider
    },
    prop: ['yearValue'],
    data() {
        return {
            yearValue: [1640, 1790],
        }
    },
    methods: {
        changeYears() {
            this.$emit('changeYears', this.yearValue)
        }
    }
}
</script>