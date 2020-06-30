const props = {
  label: String,
  value: [String, Number],
  prop: String,
  apiURL: String,
  block: Boolean,
  size: String,
  single: {
    type: Boolean,
    default: false
  },
  itemConf: {
    type: Array,
    default: function () {
      return ['list', 'label', 'value']
    }
  },
  options: {
    type: Array,
    default: function () {
      return []
    }
  },
  hasDefault: Boolean
}

import mixin from '../mixin/form-item'

export default {
  name: 'CeRadio',
  props,
  mixins: [mixin],
  data () {
    return {
      model: this.value,
      o: []
    }
  },
  render (h) {
    let _t = this

    return (
      this.single ? <el-radio v-model={this.model} size={this.size} {...{
        on: {
          ...this.$listeners,
          change: function (v) {
            _t.$emit('input', _t.model)
          }
        }
      }}>{item.label}</el-radio> :
        <el-radio-group v-model={this.model} {
          ...{
            on: {
              ...this.$listeners,
              change: function (v) {
                _t.$emit('input', _t.model)
              }
            }
          }
        }>
          {
            this.co.map((item, i) => {
              let l = <el-radio label={item.value}>{item.label}</el-radio>
              return _t.block ? <div class="pt10 pb10">{l}</div> : l
            })
          }
        </el-radio-group>
    )
  },

}