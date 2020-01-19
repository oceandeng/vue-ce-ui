import { Loading } from 'element-ui'

let loading

let needLoadingRequestCount = 0

export default {
  response: [
    function (response) {
      if (response.data.status === 999) {
        const locations = decodeURIComponent(response.data.location)
        const len = locations.split('?').length
        const connectSymbol = len > 2 ? '&backurl=' : '?backurl='
        window.location.href =
          response.data.location +
          encodeURIComponent(
            connectSymbol + encodeURIComponent(window.location.href)
          )
        return Promise.reject(response)
      }
      if (response.config.showLoading) {
        tryHideFullScreenLoading()
      }
      return response
    }
  ],
  request: [
    function (config) {
      config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
      config.withCredentials = true
      if (config.showLoading) {
        showFullScreenLoading()
      }
      return config
    }
  ]
}

export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}
