import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let resCount = 0

export default {
  response: [function (response) {
    resCount <= 1 ? NProgress.done() : resCount--
    return response
  }, function (error) {
    resCount <= 1 ? NProgress.done() : resCount--
  }],
  request: [
    function (config) {
      if (resCount === 0) NProgress.start()
      resCount++
      return config
    }
  ]
}

