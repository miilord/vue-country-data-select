<template>
  <div :class="uiClass" :style="{width: width + 'px', height: height + 'px'}">
    <input type="text" v-model="input" placeholder="search..." @focus="active = true">
    <span v-if="emoji" :style="{top: height / 2 + 'px'}"> {{ emoji }} </span>
    <div class="list" :style="{minWidth: width + 'px', top: height - 1 + 'px'}">
      <p v-for="(i, index) in list" :key="index" @click="select(i)">
        <font v-if="i.emoji">{{ i.emoji }}</font>
        <font v-if="i.countryCallingCodes[0]">({{ i.countryCallingCodes[0] }})</font>
        <font v-if="i.name">{{ i.name }}</font>
      </p>
      <p v-show="!list[0]"><font>No results found.</font></p>
    </div>
    <i class="triangle" @click="active = !active" :style="{top: height / 2 + 'px'}"></i>
  </div>
</template>

<script>
const countries = require('country-data').countries
export default {
  name: 'vueCountryDataSelect',
  props: ['value', 'mode', 'width', 'height'],
  data () {
    return {
      countries: [],
      input: this.value,
      active: false
    }
  },
  computed: {
    uiClass () {
      return {
        'active': this.active,
        'ui': true
      }
    },
    list () {
      const arr = this.countries
      const input = this.input ? this.input.toLocaleUpperCase() : ''
      let list = []
      if (!input) return arr

      arr.map(x => {
        if (x.alpha2.indexOf(input) >= 0 || x.name.toLocaleUpperCase().indexOf(input) >= 0) {
          list.push(x)
          return
        }

        x.countryCallingCodes.map(c => {
          if (c.indexOf(input) >= 0) list.push(x)
        })
      })
      return list
    },
    emoji () {
      const arr = this.list
      const input = this.input ? this.input.toLocaleUpperCase() : ''
      let emoji = ''
      if (!input) return emoji
      arr.map(x => {
        if (x.alpha2 === input || x.name.toLocaleUpperCase() === input || x.countryCallingCodes[0] === input) emoji = x.emoji
      })
      return emoji
    }
  },
  watch: {
    input: function () {
      this.$emit('input', this.input)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let arr = [...new Set(countries.all)]
      if (this.mode === 'countryCallingCodes') {
        let arr2 = []
        arr.map(x => {
          if (x.countryCallingCodes[0]) arr2.push(x)
        })
        this.countries = arr2
        return
      }
      this.countries = arr
    },
    select (i) {
      const m = this.mode ? this.mode : 'name'
      this.input = m === 'countryCallingCodes' ? i[m][0] : i[m]
      this.active = false
    }
  },
  filters: {
  }
}
</script>

<style scoped>
.ui {
  position: relative;
}
.ui input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  word-wrap: break-word;
  line-height: 1;
  white-space: normal;
  outline: 0;
  background: #fff;
  display: inline-block;
  font-size: 1em;
  padding: .5em 1em .5em 2em;
  color: rgba(0,0,0,.87);
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
  transition: box-shadow .1s ease,width .1s ease;
  transition: box-shadow .1s ease,width .1s ease,-webkit-box-shadow .1s ease;
}
.ui span {
  position: absolute;
  left: .5em;
  margin-top: -0.5em;
  font-size: 1em;
  line-height: 1;
}
.triangle {
  font-style: normal;
  width: 0;
  height: 0;
  margin-top: -0.25em;
  border-top: .5em solid #666;
  border-bottom: .5em solid transparent;
  border-left: .5em solid transparent;
  border-right: .5em solid transparent;
  cursor: pointer;
  position: absolute;
  right: .5em;
}
.ui .list {
  display: none;
  box-sizing: border-box;
  max-height: 50vh;
  max-width: 100vw;
  overflow: auto;
  position: absolute;
  background-color: #fff;
  padding: .25em 0;
  left: 0;
  border: 1px solid #96c8da;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.08);
  border-radius: 0 0 .28571429rem .28571429rem!important;
  z-index: 100;
}
.ui .list p {
  margin: 0;
  padding: 0 1em;
  cursor: pointer;
  white-space: nowrap;
  text-align: left;
  line-height: 1.5;
}
.ui .list p:hover {
  background-color: rgba(0,0,0,.05);
}

.active input {
  border-color: #96c8da;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.08);
  border-radius: .28571429rem .28571429rem 0 0!important;
}
.active .list {
  display: inline-block!important;
}
</style>
