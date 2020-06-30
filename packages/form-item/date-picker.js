const props = {
  label: String,
  type: String,
  size: String,
  value: [String, Array],
  valueFormat: {
    type: String,
    default: 'yyyy-MM-dd'
  }
}

export default {
  name: 'CeDatePicker',
  props,
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
      <el-date-picker type={this.type} v-model={this.model} value-format={this.valueFormat} range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size={this.size}
        {...{
          attrs: this.$attrs,
          props: { ...this.$props },
          on: {
            ...this.$listeners,
            input: () => {
              this.$emit('input', this.model)
            }
          }
        }}>
      </el-date-picker>
    )
  }
}

