<template>
  <div id="app">
    <vueCountryDataSelect v-model="input" width="150" height="30" mode="countryCallingCodes"></vueCountryDataSelect>
    <vueCountryDataSelect width="300" height="30" placeholder="search"></vueCountryDataSelect>
    <vueCountryDataSelect width="300" height="30" mode="countryCallingCodes"></vueCountryDataSelect>
  </div>
</template>

<script>
import vueCountryDataSelect from './vueCountryDataSelect'
export default {
  name: 'app',
  data () {
    return {
      input: '+86'
    }
  },
  components: {
    vueCountryDataSelect
  }
}
</script>

<style>
html, body {
  margin: 0;
}
#app {
  display: flex;
}
</style>
