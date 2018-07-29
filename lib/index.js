import vueCountryDataSelect from '../src/vueCountryDataSelect.vue'

const countryDataSelect = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('vueCountryDataSelect', vueCountryDataSelect)
  }
}

export default countryDataSelect