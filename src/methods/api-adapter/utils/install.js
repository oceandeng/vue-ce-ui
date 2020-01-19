/*
 * @Author: liqiang@300.cn
 * @Date: 2018-04-13 10:10:58
 * @Last Modified by: liqiang@300.cn
 * @Last Modified time: 2018-08-06 16:14:35
 */

/**
 * 注册成vue插件
 * @param Vue
 * @param options 这里传入的是当前实例的全局配置
 */
import Vue from 'vue'
import axios from 'axios'
import filtrator from './filtrator'

Vue.use({
  install(Vue) {
    Vue.prototype.$api = filtrator
    Vue.prototype.$axios = axios
  }
})
