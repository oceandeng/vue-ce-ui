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
  }
}

export default {
  name: 'CePagination',
  render: function (h) {
    return (
      <el-pagination
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
      return this.$route.query.currentPage * 1 || 1
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
      this.$router.push({
        query: {
          ...this.$route.query,
          ...pageData

        }
      }).then(() => {
        this.$emit('update')
      })
    }
  }
}
