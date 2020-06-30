const props = {
  pageTotal: {
    required: true
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
    default: 'P'
  }
}

export default {
  name: 'CePage',
  render: function (h) {
    return (
      <el-pagination
        uid={this.uid}
        layout={this.layout}
        page-sizes={this.pageSizes}
        page-size={this.pageSize}
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
  data () {
    return {
      pageData: { pageSize: 10, currentPage: 1 }
    }
  },
  computed: {
    currentPage () {
      let p = this.$getQuery(this.$route, this.uid)
      return p.currentPage * 1 || 1
    },
    pageSize () {
      let p = this.$getQuery(this.$route, this.uid)
      return p.pageSize * 1 || 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageData.pageSize = val
      this.handleChange()
    },
    handleCurrentChange (val) {
      this.pageData.currentPage = val
      this.handleChange()
    },
    handleChange () {
      let $rr = this.$router
      let $r = this.$route
      let p = this.$getQuery(this.$route, this.uid)

      this.$setQuery($rr, $r, { ...p, ...this.pageData }, this.uid).then(() => {
        this.$emit('update')
      })
    }
  },
  created () {
    let p = this.$getQuery(this.$route, this.uid)

    this.pageData.currentPage = p.currentPage || this.pageData.currentPage
    this.pageData.pageSize = p.pageSize || this.pageData.pageSize
  }
}
