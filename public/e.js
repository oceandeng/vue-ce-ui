(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?
    (module.exports = factory()) :
    typeof define === 'function' && define.amd ?
      define(factory) :
      (global.__ce = factory())
})(this, function () {
  return {
    _: {},
    debug: true,
    timeout: '',
    baseURL: 'http://test-api-scrm.ceboss.cn',
  }
})