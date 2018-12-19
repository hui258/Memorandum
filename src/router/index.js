import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import Index from '@/components/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/index', name: 'index', component: Index}
  ]
})
