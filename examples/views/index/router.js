import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/index.vue";
import Demo from './components/demo'
import HelloIndex from './components/hello-index'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: "/index",
      redirect: '/index/hello-index',
      name: "index",
      component: Index,
      children: [{
        path: 'hello-index',
        component: HelloIndex
      }]
    }, {
      path: "/demo",
      component: Demo
    }
  ]
});
