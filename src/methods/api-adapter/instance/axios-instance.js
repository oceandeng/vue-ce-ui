/*
 * @Author: liqiang@300.cn
 * @Date: 2018-04-10 20:08:34
 * @Last Modified by: liqiang@300.cn
 * @Last Modified time: 2018-10-15 14:05:24
 */

import axios from 'axios'
import loader from '../utils/loader'
import { compile, parse } from '../utils/path-to-regexp'

const isGet = Symbol('isGet')
const parseURL = Symbol('parseURL')
const tryFixURL = Symbol('tryFixURL')

const cache = {}

/**
 * 简单封装axios
 */
class APIManagement {
  constructor(config) {
    this.axios = axios.create(config)
  }


  [isGet](method) {
    return Object.is(method) ||
      !'POST,PUT,PATCH'.includes(method.toUpperCase())
  }

  [tryFixURL](baseURL, url) {
    // 去空白字符,去baseURL最后的‘/’
    baseURL = baseURL.replace(/\s/g, '').replace(/\\$/, '')
    url = url.replace(/\s/g, '')
    // url添加头部‘/’
    if (!url.startsWith('/')) {
      url = `/${url}`
    }
    return { baseURL, url }
  }

  [parseURL](url, method, params) {
    const parseURL = parse(url)
    if (parseURL.length > 1) {
      params = Object.assign({}, params)
      url = compile(url)(params)
      parseURL.forEach(v => {
        v && v.name && delete params[v.name]
      })
    }
    return {
      [this[isGet](method) ? 'params' : 'data']: params,
      url
    }
  }

  /**
   * 页面发起请求
   * @param {String} key 用来查找API配置的key
   * @param {Object} params 要发送的数据参数
   */

  request(key, params = {}, requestConfig) {
    try {
      const { moduleConfig, apiConfig } = loader(key)
      let config = {}
      // 合并策略权重  全局配置 < 模块配置 < API配置 < 请求配置
      config = Object.assign(config, moduleConfig, apiConfig, requestConfig)
      // 尝试修复存在字符问题的URL
      config = Object.assign(config, this[tryFixURL](config.baseURL, config.url))
      // RESTful风格
      config = Object.assign(config, this[parseURL](config.url, config.method, params))


      if (config.cache) {
        const cacheKey = `${key}_${JSON.stringify(params)}`
        if (cache[cacheKey]) {
          return cache[cacheKey]
        } else {
          return cache[cacheKey] = this.axios.request(config)
        }
      }

      return this.axios.request(config)

    } catch (err) {
      /**
       * 这里可以进行异常捕获
       * 如果适配器处理不了，则认为是原始的axios请求，直接调用axios实例
       * 这里拦截器和全局配置还在，如果需要使用新的实例调用this.$axios
       */
      console.warn(err)
      return this.axios.request(...arguments)
    }
  }
  /**
   *
   * @param {Object} interceptors  {response:Array,request:Array}
   */
  use(interceptors) {
    for (let i in interceptors) {
      if (
        interceptors.hasOwnProperty(i) &&
        (i === 'response' || i === 'request')
      ) {
        const axiosInterceptors = this.axios.interceptors[i]
        const interceptor = interceptors[i]
        axiosInterceptors.use.apply(axiosInterceptors, interceptor)
      }
    }
  }
}

export default APIManagement
