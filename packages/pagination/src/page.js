const QNAME = ''

const props = {
  pageTotal: {
    required: true
  },
  pageSize: {
    default: 10
  },
  pageSizes: {
    default: function () {
      return [10, 50, 60, 80, 100, 200]
    }
  },
  layout: {
    default: 'total,sizes, prev, pager, next, ->, slot'
  },
  uid: {
    default: 'P1'
  }
}

export default {
  name: 'CePage',
  render: function (h) {
    return (
      <el-pagination
        uid={uid}
        layout={this.layout}
        page-sizes={this.pageSizes}
        page-size={this.$route.query.pageSize * 1 || this.pageSize}
        total={this.pageTotal}
        current-page={this.currentPage}
        {...{
          on: {
            'size-change': this.handleSizeChange,
            'current-change': this.handleCurrentChange
          }
        }}>
      </el-pagination>
    )
  },
  props,
  computed: {
    currentPage () {
      let p = this.$getQuery(this.$route, this.uid)
      return p.currentPage * 1 || 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.handleChange({ pageSize: val })
    },
    handleCurrentChange (val) {
      this.handleChange({ currentPage: val })
    },
    handleChange (pageData) {
      let $r = this.$route
      let p = this.$getQuery(this.$route, this.uid)

      this.$setQuery($r, pageData, this.uid).then(() => {
        this.$emit('update')
      })
    }
  }
}
