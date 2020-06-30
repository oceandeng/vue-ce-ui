const props = {
  label: String,
  prop: String,
  disabled: Boolean,
  apiURL: String,
  params: Object,
  width: String,
  size: String,
  remoteMethod: {},
  filterable: {
    type: Boolean,
    default: false
  },
  remote: Boolean,
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

import mixin from '../mixin/form-item'

export default {
  name: 'CeSelect',
  data () {
    return {
      model: this.value,
      o: []
    }
  },
  props,
  mixins: [mixin],
  render (h) {
    const _t = this

    return (
      <el-select v-model={this.model} disabled={this.disabled} filterable="filterable" style={`width:${this.width}`} size={this.size}  {...{
        props: { ...this.$props },
        on: {
          ...this.$listeners,
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
    )
  },
  created () {
    this.getOptions()
  }
}