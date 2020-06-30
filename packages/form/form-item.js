const props = {
  rows: Number,
  action: String,
  tagName: String,
  label: String,
  prop: String,
  props: Object,
  type: String,
  disabled: Boolean,
  apiURL: String,
  params: Object,
  width: String,
  block: Boolean,
  size: String,
  default: Array,
  hasDefault: Boolean,
  rules: Array,
  hasDefaultAll: Boolean,
  remoteMethod: {},
  valueFormat: String,
  filterable: Boolean,
  remote: Boolean,
  'show-all-levels': Boolean,
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  value: {
    required: false
  },
  single: {
    type: Boolean,
    default: false
  },
  itemConf: {
    type: Array
  },
  options: {
    default: function () {
      return []
    }
  },
  limit: {
    type: Number,
    default: 3
  }
}

export default {
  name: 'CeFormItem',
  props,
  inject: ['ceForm'],
  watch: {
    value: {
      handler: function (v, ov) {
        this.$emit('change', v)
      },
      deep: true
    }
  },
  methods: {
    renderItem () {
      let _t = this
      let props = {
        ...this.$props,
        'v-model': this.value,
        single: this.single,
        placeholder: this.placeholder,
        style: {
          width: this.width,
        }
      }

      let event = {
        on: {
          ...this.$listeners,
          input (v) {
            _t.$emit('input', v)
          },
          change (v) {
            _t.$emit('change', v)
          }
        }
      }

      let o = {
        'input': <ce-input {...{ props, ...event }}></ce-input>,
        'select': <ce-select {...{ props, ...event }}></ce-select>,
        'checkbox': <ce-checkbox {...{ props, ...event }}></ ce-checkbox>,
        'radio': <ce-radio  {...{ props, ...event }}></ce-radio>,
        'cascader': <ce-cascader {...{ props, ...event }}></ce-cascader>,
        'date-picker': <ce-date-picker {...{ props, ...event }}></ ce-date-picker>,
        'upload': <ce-upload {...{ props, ...event }}></ce-upload>
      }

      return o[this.tagName]
    }
  },
  render (h) {
    let _t = this

    return (
      <el-form-item label={this.single ? '' : this.label} prop={this.prop} rules={this.rules} {...{
        style: {
          'margin-bottom': Object.keys(this.ceForm.rules).length ? '' : '20px'
        }
      }}>
        {this.renderItem()}
        {this.$slots.tips ? h('div', this.$slots.tips) : ''}
        {this.$slots.default ? <div>{this.$slots.default}</div> : ''}
      </el-form-item>
    )
  }
}