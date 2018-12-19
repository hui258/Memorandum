// 导入axios
import axios from 'axios'
// 创建自定义插件对象
var myaxios = {}
// 给插件添加一个方法
myaxios.install = function (Vue) {
  // 定义默认请求地址
  axios.defaults.baseURL = 'https://todo.lanternfish.ai'
  // 将 axios 作为实例方法添加到 vue 中
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login' || config.url !== 'register') {
      config.headers.Authorization = `JWT ${window.localStorage.getItem('token')}`
    }
    return config
  })
  Vue.prototype.$http = axios
}
// 导出插件
export default myaxios
