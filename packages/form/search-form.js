const props = {
  inline: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'small'
  },
  keys: {
    type: Array,
    default: function () {
      return []
    }
  },
  options: {
    type: Object,
    default: function () {
      return {}
    }
  },
  formItems: {
    default: function () {
      return {}
    }
  },
  uid: {
    type: String,
    default: 'F'
  }
}

export default {
  name: 'CeSearchForm',
  props,
  data () {
    return {
      form: {
      }
    }
  },
  methods: {
    getItem () {
      return this.keys.map((item, i, arr) => {
        if (Array.isArray(item)) {
          return <div class={i == arr.length - 1 ? 'fl' : ''}>
            {item.map(s => {
              let f = { ...this.formItems[s] }
              return this.renderItem(f)
            })}
          </div>
        } else {
          let f = { ...this.formItems[item] }
          return this.renderItem(f)
        }
      })
    },
    renderItem (f) {
      if (f.optionsKey) {
        f.options = this.options[f.optionsKey]
      }
      return f ? <ce-form-item {...{
        props: {
          ...f,
        },
        on: {
          ...this.$listeners
        }
      }} v-model={this.form[f.model]}></ce-form-item> :
        ''
    },
    handleSearch () {
      this.$setQuery(this.$router, this.$route, this.form, this.uid)
      this.$emit('submit')
    },
    handleReset () {
      this.$resetObject(this.form)
      this.$refs['form'].reset()
    }
  },
  render (h) {
    const _t = this

    return (
      <ce-form ref="form" inline={this.inline} size={this.size} {...{
        props: {
          model: this.form
        }
      }}>
        <div class="clearfix">
          {this.getItem()}
          <div>
            <ce-button type="primary" size={this.size} {...{
              on: {
                click: this.handleSearch
              }
            }}>查询</ce-button>
            <ce-button size={this.size} {...{
              on: {
                click: this.handleReset
              }
            }}>重置</ce-button>
          </div>
        </div>
        {
          this.$slots.default ? <div>{this.$slots.default}</div> : ''
        }
      </ce-form>
    )
  },
  created () {
    this.form = this.$getQuery(this.$route)
  },
  mounted () {
    this.handleSearch()
  }
}