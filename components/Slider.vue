<template>
    <div>
        <vue-slider v-model="yearValue"
        :min="1640"
        :max="1790"
        :interval="1"
        :enable-cross="false" 
        @change="onChange"/>
        <div><pre><code>value: {{ yearValue }}</code></pre></div>
    </div>
</template>

<script> 
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'

export default {
    components: {
        VueSlider
    },
    data() {
        return {
            yearValue: [1640, 1790]
        }
    },
    methods: {
        onChange(value) {
            // eslint-disable-next-line no-console
            console.log(value)
        }
    }
}
</script>