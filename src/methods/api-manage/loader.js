const parseKey = (key) => {
  const arr = key.split('.')
  return {
    name: arr.pop(),
    path: arr.join('/')
  }
}

export default (key) => {
  const {
    name,
    path
  } = parseKey(key)
  try {
    const module = require('@api' + '/' + path)
    return {
      key,
      module,
      api: module[name],
      config: module['$CONFIG']
    }
  } catch (e) {
    throw new Error(e)
  }
}
