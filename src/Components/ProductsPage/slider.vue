<template>
    <div @click="getValue('sli')">
      <vue-slider ref="sli" v-model="value" v-bind="options"></vue-slider>
      <span>${{ value.join(' ~  ') }}</span>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'slider',
  components: {
    vueSlider
  },
  data() {
    return {
      value: [
        100,
        100000
      ],
      options: {
      width: "auto",
      height: 4,
      dotSize: 10,
      min: 100,
      max: 100000,
      show: true,
      useKeyboard: true,
      tooltip: "hover",
      formatter: (v) => v,
      mergeFormatter: (v1, v2) => `${v1} ~ ${v2}`,
      processStyle: {
        "backgroundColor": "#999"
      }}
    }
  },
  methods: {
    getValue(name) {
      let slider = this.$refs[name]
      this.$emit('clicked', slider.getValue())
    }
  }
}
</script>
