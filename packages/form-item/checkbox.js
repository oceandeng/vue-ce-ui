const props = {
  label: String,
  width: String,
  size: String,
  single: {
    type: Boolean,
    default: false
  },
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
  default: Array,
  hasDefault: Boolean,
  hasDefaultAll: Boolean
}

import mixin from '../mixin/form-item'

export default {
  name: 'CeCheckbox',
  props,
  data () {
    return {
      model: this.value || (this.single ? '' : []),
      o: []
    }
  },
  mixins: [mixin],
  render (h) {
    const _t = this

    return (
      this.single ? <el-checkbox v-model={this.model} size={this.size} {...{
        props: this.$options.propsData,
        on: {
          ...this.$listeners,
          change: function (v) {
            _t.$emit('input', _t.model)
          }
        }
      }}>{this.label}</el-checkbox> :
        <el-checkbox-group style={`max-width:${parseInt(this.width)}px`} v-model={this.model} {...{
          on: {
            ...this.$listeners,
            change: function (v) {
              _t.$emit('input', _t.model)
            }
          }
        }}>
          {
            this.co.map((item, i) => {
              return <el-checkbox style="margin-left:0" disabled={this.default && this.default.includes(item.value)} key={i} label={item.value}>{item.label}</el-checkbox>
            })
          }
        </el-checkbox-group>
    )
  },
  created () {
    this.getOptions()
  }
}
