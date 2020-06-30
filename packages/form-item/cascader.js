const props = {
  label: String,
  apiURL: String,
  width: String,
  props: Object,
  'show-all-levels': Boolean,
  placeholder: {
    type: String,
    default: '请选择'
  },
  value: {
    required: true
  },
  itemConf: {
    type: Array,
    default: function () {
      return ['list', 'label', 'value', 'children']
    }
  },
  options: {
    default: function () {
      return []
    }
  }
}

import mixin from '../mixin/form-item'

export default {
  name: 'CeCascader',
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
      <el-cascader v-model={this.model} style={`width:${this.width}`} options={this.co} placeholder={this.placeholder} {
        ...{
          props: { ...this.$props },
          on: {
            ...this.$listeners,
            change (v) {
              _t.$emit('input', v)
              _t.$emit('change', v)
            }
          }
        }
      } ></el-cascader>
    )
  }
}