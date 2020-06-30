import Vue from "vue";
import VueRouter from "vue-router";
import UI from "./components/ui";

import HelloUI from './components/hello-ui'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/ui",
      redirect: '/ui/hello-ui',
      component: UI,
      children: [{
        path: 'hello-ui',
        component: HelloUI
      }]
    }
  ]
});
