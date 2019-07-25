import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)
Vue.config.productionTip = false

//開啟後自動focus輸入匡
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
