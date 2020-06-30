const props = {
  label: String,
  name: {
    type: String,
    defautl: 'file'
  },
  action: String,
  filterFileExtNames: {
    default: 'All_SUFFIX'
  },
  fieldName: String,
  value: {
    type: Array,
    default: function () {
      return []
    }
  },
  listType: String,
  limit: {
    type: Number,
    default: 3
  }
}

export default {
  name: 'CeUpload',
  props,
  data () {
    return {
      form: {
        fileList: []
      }
    }
  },
  watch: {
    value: {
      handler: function (v, ov) {
        this.form.fileList = [...v]
      },
      deep: true
    }
  },
  methods: {
    emit () {
      this.$emit('input', this.form.fileList)
      this.$emit('change', this.form.fileList)
    },
    beforeAvatarUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过5MB!')
      }
      return isLt5M
    },
    handleSuccess (response, file, fileList) {
      if (response.data.status == '502') {
        this.$message({
          type: 'error',
          message: response.data.msg
        })
        return
      }

      this.form.fileList.push({
        id: response.data.ftpFileVo.id,
        name: response.data.ftpFileVo.fileName,
        url: response.data.ftpFileVo.fileURL
      })
      this.emit()
    },
    handleRemove (file, fileList) {
      this.form.fileList = fileList
      this.emit()
    },
    handlePreview (file) {
      window.open(file.url)
    },
    handleExceed (files, fileList) {
      console.log(files, fileList);
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件，删除后在上传。`)
    },
    beforeRemove (file, fileList) {
      if (file.size) {
        return true
      }
    },
    clearFiles () {
      this.$refs['upload'].clearFiles()
    }
  },
  created () {
    this.form.fileList = [...this.value]
  },
  render (h) {
    return (
      <el-upload ref="upload" action={this.action} multiple limit={this.limit} name={this.name} data={{ filterFileExtNames: this.filterFileExtNames }} list-type={this.listType} {
        ...{
          attrs: {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            'with-credentials': true
          },
          props: {
            'file-list': this.form.fileList,
            'on-success': this.handleSuccess,
            'on-preview': this.handlePreview,
            'on-remove': this.handleRemove,
            'before-remove': this.beforeRemove,
            'before-upload': this.beforeAvatarUpload,
            'on-exceed': this.handleExceed,
          }
        }
      }>
        <el-button size="small" type="primary">点击上传</el-button>
        {this.$slots.tips ? h('div', this.$slots.tips) : ''}
      </el-upload>
    )
  }
}


