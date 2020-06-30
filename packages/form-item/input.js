const props = {
  label: String,
  width: [String, Number],
  clearable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  },
  prop: String,
  rows: Number,
  value: [String, Number],
  size: String,
  disabled: Boolean
}

export default {
  name: 'CeInput',
  props,
  inject: ['ceForm'],
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    value: {
      handler: function (v) {
        this.model = v
      }
    }
  },
  render (h) {
    const _t = this

    return (
      <span><el-input type={this.type} v-model={this.model} label={this.label} size={this.size} placeholder="请输入" rows={this.rows} {
        ...{
          props: { ...this.$props },
          style: {
            width: this.width,
          },
          on: {
            ...this.$listeners,
            input (v) {
              _t.$emit('input', v)
            }
          }
        }
      }></el-input></span>
    )
  }
}