import Vue from 'vue'
import App from './App.vue'
import VueCEUI from '@packages'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueCEUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')