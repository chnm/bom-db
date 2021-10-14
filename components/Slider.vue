<template>
    <div>
        <vue-slider 
            v-model="yearValue"
            :min="1640"
            :max="1790"
            :interval="1"
            :enable-cross="false" 
            :lazy="true"
            @change="yearRangeValues"
        />
        <div><code>value: {{ yearValue }}</code></div>
    </div>
</template>

<script> 
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
    components: {
        VueSlider
    },
    data() {
        return {
            yearValue: [1640, 1790],
        }
    },
    methods: {
        yearRangeValues(value) {
            this.$emit('change', value)
        }
    }
}
</script>