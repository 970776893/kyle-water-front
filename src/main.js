// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// component: resolve => require(['../template/list.vue'], resolve)//将组件用require引进来
import 'jquery'
import 'bootstrap'
import '@/directive'
import Vue from 'vue'
import Cookie from 'vue-cookie'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import DatePicker from 'vue-bootstrap-datetimepicker'
import SimpleVueValidation from 'simple-vue-validator'
import App from '@/components/base/layout'
import routersConfigure from './router/index'
import watchDefinetion from '@/watch'

// 引入css
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import '@/app.css'

Vue.config.productionTip = false

const vueRouter = new Router({
  routes: routersConfigure
})

Vue.use(Cookie)
Vue.use(Router)
Vue.use(DatePicker)
Vue.use(VueResource)
Vue.use(SimpleVueValidation)



/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router: vueRouter,
  watch: watchDefinetion,
  template: '<App/>',
  components: { App }
})

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Content-Type', 'application/json;charset=UTF-8')
  // continue to next interceptor
  next((response) => {
    console.log(response)
    if (response.ok) {
      if (response.body.code === 10001) {
        vm.$cookie.delete('session')
      }
      if(response.body.code !== 200) {
        response.ok = false
        response.status = 500
      }
    } else {
      response.body = {
        code: 500,
        message: '系统异常'
      }
    }
    return response
  })
})
