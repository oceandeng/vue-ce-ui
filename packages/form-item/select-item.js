const props = {
  label: String,
  apiURL: String,
  value: {
    required: true
  },
  itemConf: {
    type: Array,
    default: function () {
      return ['list', 'label', 'value']
    }
  },
  options: {
    default: function () {
      return []
    }
  },
  hasDefault: Boolean
}

export default {
  name: 'CeSelectItem',
  data () {
    return {
      model: '',
      o: []
    }
  },
  props,
  methods: {
    getOptions () {
      let a = this.itemConf[0]
      let l = this.itemConf[1]
      let v = this.itemConf[2]

      this.$api(this.apiURL).then(res => {
        this.o = res[a].map(item => {
          return {
            label: item[l],
            value: item[v]
          }
        })

        if (this.hasDefault && !this.value) {
          this.$emit('input', res[a][0][v])
        }
      })
    }
  },
  watch: {
    value: {
      handler: function (v, ov) {
        this.model = this.value
      },
      deep: true
    }
  },
  computed: {
    co () {
      return this.options.length ? this.options : this.o
    }
  },
  render (h) {
    const _t = this

    return (
      <el-form-item label={this.label}>
        <el-select v-model={this.model} {...{
          on: {
            change (v) {
              _t.$emit('input', v)
            }
          }
        }}>
          {
            this.co.map((item, i) => {
              return <el-option key={i} label={item.label} value={item.value}></el-option>
            })
          }
        </el-select>
      </el-form-item>
    )
  },
  created () {
    this.getOptions()
  }
}
