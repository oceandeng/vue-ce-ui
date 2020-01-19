const props = {
  label: String,
  width: String,
  value: {
    required: true
  },
  apiURL: String,
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
  name: 'CeCheckboxItem',
  data () {
    return {
      model: [],
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
        if (this.hasDefault && !this.value.length) {
          this.$emit('input', [res[a][0][v]])
        }
      })
    }
  },
  watch: {
    value (v, ov) {
      this.model = this.value
    }
  },
  computed: {
    co () {
      return this.options.length || this.o
    }
  },
  render (h) {
    const _t = this

    return (
      <el-form-item label={this.label}>
        <el-checkbox-group style={`max-width:${parseInt(this.width)}px`} v-model={this.model} {...{
          on: {
            change: function (v) {
              _t.$emit('input', _t.model)
            }
          }
        }}>
          {
            this.co.map((item, i) => {
              return <el-checkbox style="margin-left:0" key={i} label={item.value}>{item.label}</el-checkbox>
            })
          }
        </el-checkbox-group>
      </el-form-item>
    )
  },
  created () {
    this.getOptions()
  }
}
