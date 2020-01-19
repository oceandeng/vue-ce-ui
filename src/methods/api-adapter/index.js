/*
 * @Author: liqiang@300.cn
 * @Date: 2018-04-14 22:37:51
 * @Last Modified by: liqiang@300.cn
 * @Last Modified time: 2018-10-15 14:40:44
 */

import APIManagement from './instance/axios-instance'
import cas from './interceptors/cas'
import disableCache from './interceptors/disable-cache'
// import loading from './interceptors/loading'

const api = new APIManagement({
  baseURL: '',
  timeout: 0,
})

// 添加CAS支持
api.use(cas)

// 禁用缓存功能
api.use(disableCache)

// 模拟表单
// api.use(emulateJSON)

// 全局loading
// api.use(loading)

export default api
