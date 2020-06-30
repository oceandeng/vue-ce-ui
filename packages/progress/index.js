import CeProgress from './src/progress'

CeProgress.install = function (Vue) {
  Vue.component(CeProgress.name, CeProgress)
}

export default CeProgress