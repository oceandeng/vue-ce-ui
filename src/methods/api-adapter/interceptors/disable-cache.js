export default {
  request: [function (config) {    
    if (config.method.toLocaleUpperCase === 'GET') {
      config.params.__t = +new Date()
    }
    return config
  }]
}
