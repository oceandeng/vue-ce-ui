const props = {
  cols: {
    required: true
  },
  tableData: {
    required: true
  },
  pageTotal: {
    required: false
  },
  pageSize: {
    required: false
  },
  uid: {
    default: 'P1'
  }
}

// 解析按钮jsx
const renderButton = (h, prop, scope) => {
  const b = prop(scope)
  return b.map(item => {
    return (
      <el-button type='text' {
        ...{
          on: {
            click: () => { item.callback(scope) }
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
      reload: true
    }
  },
  render: function (h) {
    return (
      <div>
        <el-table data={this.tableData} border {
          ...{
            on: {
              'selection-change': (val) => {
                this.$emit('selection-change', val)
              },
              'expand-change': (row, expandedRows) => {
                this.$emit('expand-change', row, expandedRows)
              }
            }
          }
        }>
          {
            this.cols.map((v, i) => {
              return (
                <el-table-column key={i} label={v.label} type={v.type} {
                  ...{
                    scopedSlots: v.prop ? {
                      default: scope => {
                        return typeof (v.prop) == 'function' ? renderButton(h, v.prop, scope) : scope.row[v.prop]
                      }
                    } : v.render ? {
                      default: scope => {
                        return v.render(scope, h)
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
          (this.pageTotal && this.reload) &&
          <div calss='clearfix mt20'>
            <ce-page
              uid={uid}
              pageTotal={this.pageTotal}
              pageSize={this.pageSize}
              class='mt20 fr'
              {...{
                on: {
                  update: () => {
                    this.update()
                  }
                }
              }}>
            </ce-page>
          </div>
        }
      </div>
    )
  },
  props,
  watch: {
    tableData: {
      handler: function (v, ov) {
        this.reload = false
        this.$nextTick(() => {
          this.reload = true
        })
      },
      deep: true
    }
  },
  methods: {
    update () {
      this.$emit('update')
    }
  }
}
