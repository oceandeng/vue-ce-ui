const props = {
  size: String,
  type: String,
  disabled: false,
  loading: false
}

export default {
  name: 'CeButton',
  props,
  render (h) {
    return (
      <el-button type={this.type} disabled={this.disabled} size={this.size} loading={this.loading}  {
        ...{
          attrs: this.$attrs,
          on: this.$listeners
        }
      }>
        {this.$slots.default ? h('span', this.$slots.default) : ''}
      </el-button>
    )
  }
}