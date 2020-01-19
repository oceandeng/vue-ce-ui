/*
 * @Author: liqiang@300.cn 
 * @Date: 2018-08-03 13:55:07 
 * @Last Modified by: liqiang@300.cn
 * @Last Modified time: 2018-08-03 15:10:18
 */


import api from '..'
export default function () {
  return api.request(...arguments).then(response => {
    try {      
      return +response.data.status === 101 ? response.data.data : Promise.reject(response)
    } catch (error) {
      return Promise.reject(error)
    }
  })
}