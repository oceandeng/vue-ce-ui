/*
 * @Author: liqiang@300.cn
 * @Date: 2018-08-31 10:51:58
 * @Last Modified by: liqiang@300.cn
 * @Last Modified time: 2018-09-17 15:01:51
 */

const rules = {}

export const parse = (type, uid, params) => {
  for (const i in params) {
    if (`${type}.${uid}` === i) {
      return rules[type].parse(params[i])
    }
  }
  return null
}

export const componentization = (type, uid, params) => {
  return {
    [`${type}.${uid}`]: rules[type].componentization(params)
  }
}

export const addRule = (type, rule) => {
  rules[type] = rule
}

export default class {
  constructor (type, uid) {
    this.type = type
    this.uid = uid || 0
  }
  parse (params) {
    return parse(this.type, this.uid, params)
  }
  componentization (params) {
    return componentization(this.type, this.uid, params)
  }
}
