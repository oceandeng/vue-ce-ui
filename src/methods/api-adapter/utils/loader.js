/*
 * @Author: liqiang@300.cn
 * @Date: 2018-04-10 20:47:59
 * @Last Modified by:   liqiang@300.cn
 * @Last Modified time: 2018-04-10 20:47:59
 */
function parseKey(key) {
  let arr = key.split('.')
  return {
    name: arr.pop() || key,
    path: arr.join('/')
  }
}

export default function (key) {
  try {
    const { name, path } = parseKey(key)
    const module = require(`~/api/${path}`)
    return {
      key,
      module,
      moduleConfig: module.default,
      apiConfig: module[name]
    }
  } catch (e) {
    throw new Error(e)
  }
}
