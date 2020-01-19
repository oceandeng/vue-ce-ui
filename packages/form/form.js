const props = {
  model: Object,
  rules: Object,
}

export default {
  props,
  data () {
    return {
      model: {},
      rules: {}
    }
  },
  render (h) {
    return (
      <el-form modle={this.model} rules={this.rules} {
        ...{
          scopedSlots: {
            default: props => {
              return this.$scopeSlots.default(props)
            }
          }
        }
      }></el-form>
    )
  }
}
