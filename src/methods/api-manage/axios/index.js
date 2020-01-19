import loader from '../loader'
import axios from 'axios'
import merge from 'webpack-merge'
import Qs from 'qs'

class ApiManage {
  constructor (options) {
    this.axios = axios.create()
    this.options = options || {}
  }

  request (key, params = {}) {
    const { api, config } = loader(key)
    // 合并策略  全局配置=>模块配置=>单独配置
    const options = merge({}, this.options, config, api)
    const isGet = typeof options.method === 'undefined' || 'post,put,patch'.indexOf(options.method.toLowerCase()) === -1

    if (isGet) {
      // IE下存在缓存相同GET请求的行为
      options.params = merge(options.cache === false ? { _t: +new Date() } : {}, options.params, params)
    } else {
      // 模拟表单格式发送数据
      if (options.emulateJSON === true) {
        options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        params = Qs.stringify(params)
      }
      options.data = params
    }

    const _axios = this.axios

    return new Promise(function (resolve, reject) {
      _axios.request(options).then(function (response) {
        resolve(response.data)
      }).catch(function (err) {
        reject(err)
      })
    })
  }

  use (interceptors) {
    ['request', 'response'].forEach(v => {
      const fns = interceptors[v]
      const interceptor = this.axios.interceptors[v]
      fns && fns.length && interceptor.use.apply(interceptor, fns)
    })
  }
}

ApiManage.install = function (Vue, options) {
  Vue.prototype.$api = Vue.api = function () {
    const Instance = this.$root.$options.api
    return Instance.request.apply(Instance, arguments)
  }
  Vue.prototype.$axios = Vue.axios = this.axios
}

export default ApiManage
