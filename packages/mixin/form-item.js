export default {
  props: {
    clearable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: function (v, ov) {
        this.model = v
      },
      deep: true
    }
  },
  computed: {
    co () {
      return this.options.length ? this.getOptions() : this.o
    }
  },
  methods: {
    getOptions () {
      let a = (this.options.length && !this.$options.propsData.itemConf && !this.apiURL) ? this.itemConf[1] : this.itemConf[0]
      let b = (this.options.length && !this.$options.propsData.itemConf && !this.apiURL) ? this.itemConf[2] : this.itemConf[1]
      let c = (this.options.length && !this.$options.propsData.itemConf && !this.apiURL) ? this.itemConf[3] : this.itemConf[2]
      let d = this.itemConf[3] ? this.itemConf[3] : 'children'

      if (this.options.length) {
        return this.filterOptions(this.options, a, b, c)
      }

      if (!this.apiURL) return
      this.$api(this.apiURL, this.params).then(res => {
        this.o = this.filterOptions(res[a], b, c, d)
        this.$emit('complete')
      }).catch(err => {
        this.$emit('complete')
      })
    },
    filterOptions (o, k, v, c) {
      if (this.hasDefault) {
        let val = Array.isArray(this.value) ? [o[0][v]] : o[0][v]
        this.$emit('input', val)
      }
      if (this.hasDefaultAll) {
        let val = Array.isArray(this.value) ? o.map(item => { return item[v] }) : []
        this.$emit('input', val)
      }
      return o.map(item => {
        let obj = {
          label: item[k],
          value: item[v],
        }
        if (c && item[c] && item[c].length) {
          obj[c] = this.filterOptions(item[c], k, v, c)
        }
        return obj
      })
    }
  },
  created () {
    this.getOptions()
  }
}