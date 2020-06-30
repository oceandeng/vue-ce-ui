const props = {
  model: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rules: {
    type: Object,
    default: () => {
      return {}
    }
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    default: '100px'
  },
  size: {
    type: String,
    default: 'small'
  },
}

export default {
  name: 'CeForm',
  props,
  provide () {
    return {
      ceForm: this
    }
  },
  data () {
    return {
    }
  },
  methods: {
    validate (fn) {
      this.$refs['f'].validate(valid => {
        fn(valid)
      })
    },
    validateField (p, fn) {
      this.$refs['f'].validateField(p, valid => {
        fn(valid)
      })
    },
    reset () {
      this.$refs['f'].resetFields()
    },
    clearValidate () {
      this.$refs['f'].clearValidate()
    }
  },
  render (h) {
    const _t = this

    return (
      <el-form ref="f" label-width={this.inline ? '' : this.labelWidth} size={this.size} inline={this.inline} {
        ...{
          props: {
            model: this.model,
            rules: this.rules
          }
        }
      }>
        {
          this.$slots.default ? <div>{this.$slots.default}</div> : ''
        }
      </el-form>
    )
  }
}
