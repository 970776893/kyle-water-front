import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  // debugger
  // const self = this
  console.log(vm)
  // modify request
  request.headers.set('Content-Type', 'application/json;charset=UTF-8')
  // continue to next interceptor
  next((response) => {

    // modify response
    // self.$cookie.delete('session')
    // self.$router.push('/login')
    return response
  })
})
