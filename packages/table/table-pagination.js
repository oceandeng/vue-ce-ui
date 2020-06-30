import Loading from '../../utils/loading'

const props = {
  cols: {
    required: true
  },
  apiURL: {
    type: String,
  },
  listName: {
    default: 'list'
  },
  pageTotalName: {
    default: 'totalCount'
  },
  tableData: {
    required: false
  },
  pageTotal: {
    required: false
  },
  pageSize: {
    required: false,
    default: 10
  },
  tableErr: {
    required: false
  },
  uid: {
    default: 'F'
  }
}

// 解析按钮
const renderButton = (h, prop, scope, t) => {
  const b = prop(scope)
  return b.map((item, i) => {
    return (
      <el-button type='text' disabled={item.disabled} loading={t.pLoading.is(`b${scope.row.id}${i}`)} {
        ...{
          on: {
            click: () => {
              let p = item.callback(scope)
              if (p) {
                t.pLoading.open(`b${scope.row.id}${i}`)
                p.then(res => {
                  t.pLoading.close(`b${scope.row.id}${i}`)
                }).catch(e => {
                  t.pLoading.close(`b${scope.row.id}${i}`)
                })
              }
            }
          }
        }
      }> {item.label}</el-button>
    )
  })
}

export default {
  name: 'CeTablePagination',
  data () {
    return {
      pLoading: new Loading(),
      _tableData: [],
      _pageTotal: 0,
      reload: true,
      loading: true,
      timer: null
    }
  },
  render: function (h) {
    let tableData = this.tableData || this._tableData
    let pageTotal = this.pageTotal || this._pageTotal
    if (!tableData) { tableData = [] }

    return (
      <div >
        <el-table ref="table" data={tableData} border v-loading={this.loading} {
          ...{
            attrs: this.$attrs,
            props: this.$props,
            on: {
              ...this.$listeners,
            }
          }
        }>
          {
            this.cols.map((v, i) => {
              return (
                <el-table-column width={v.width} key={i} label={v.label} fixed={v.fixed} type={v.type} sortable={v.sortable}   {
                  ...{
                    props: {
                      prop: typeof v.prop == 'string' ? `${v.prop}` : '',
                      'show-overflow-tooltip': v['show-overflow-tooltip']
                    },
                    scopedSlots: v.render ? {
                      default: scope => {
                        return v.render(scope, h)
                      }
                    } : v.prop ? {
                      default: scope => {
                        return typeof (v.prop) == 'function' ? renderButton(h, v.prop, scope, this) : scope.row[v.prop]
                      }
                    } : v.type == 'expand' ? {
                      default: scope => {
                        return this.$scopedSlots.default(scope)
                      }
                    } : ''
                  }
                } >
                </el-table-column>
              )
            })
          }
        </el-table>
        {
          ((pageTotal || pageTotal == 0) && this.reload) ?
            <div class='clearfix mt20'>
              <div class="fl">
                {this.$slots.bottom}
              </div>
              <ce-page
                uid={this.uid}
                pageTotal={pageTotal}
                pageSize={this.pageSize}
                class='fr'
                {...{
                  on: {
                    update: () => {
                      this.update()
                    }
                  }
                }}>
              </ce-page>
            </div> : ''
        }
      </div >
    )
  },
  props,
  watch: {
    tableData: {
      handler: function (v, ov) {
        this.reload = false
        this.$nextTick(() => {
          this.reload = true

          if (!this.tableData || (this.tableData && !this.tableData.length)) {
            clearTimeout(this.timer)
            this.loading = true
            if (!this.tableData) {
              this.closeLoading()
            }
            if (Array.isArray(v) && Array.isArray(ov)) {
              if (!v.length && !ov.length)
                this.closeLoading()
            }
            return
          }
          this.loading = false
        })
      },
      deep: true
    },
    tableErr: {
      handler: function (v, ov) {
        if (v) {
          this.loading = false
        }
      },
      deep: true
    }
  },
  methods: {
    init (params) {
      this.reload = false
      this.loading = true
      let op = this.$getQuery(this.$route)
      let p = params ? { ...op, ...params } : { ...op }

      this.$api(this.apiURL, p).then(res => {
        this._tableData = res[this.listName]
        this._pageTotal = res[this.pageTotalName]
        this.$nextTick(() => {
          this.reload = true
          this.loading = false
        })
      }).catch(err => {
        this.reload = true
        this.loading = false
      })
    },
    update () {
      this.$emit('update')
    },
    closeLoading () {
      if ((this.tableData == null || (this.tableData && !this.tableData.length)) && !this.apiURL) {
        this.timer = setTimeout(() => {
          this.loading = false
        }, 500);
      }
    }
  },
  mounted () {
    this.closeLoading()
  }
}
