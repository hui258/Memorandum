// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import myAxios from '@/assets/js/http.js'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'

Vue.config.productionTip = false

Vue.use(ElementUi)
Vue.use(myAxios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
