import Qs from 'qs'

export default {
  request: [
    function (config) {
      config.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded'
      config.data = Qs.stringify(config.data)
      return config
    }
  ]
}

