import dialog from '@/components/base/global/dialog.vue'
import alert from '@/components/base/global/alert.vue'
import Vue from 'vue'


// 打开弹出框
const createDialog = (option) => {
  // 创建实例
  const Dialog = Vue.extend(dialog)
  let instance = new Dialog({
    el: document.createElement('div'),
    propsData: {
      visible: true,
      option: option
    }
  })
  document.body.appendChild(instance.$el)
}


// 打开弹出框
const createAlert = (option) => {
  // 创建实例
  const Alert = Vue.extend(alert)
  let instance = new Alert({
    el: document.createElement('div'),
    propsData: {
      type: option.type,
      message: option.message,
      timeout: option.timeout
    }
  })
  document.body.appendChild(instance.$el)
}

var globalMethod = {
  // 登录校验
  checkLogin() {
    // 可以直接访问的路径，登录不登录都可以访问
    var accessPath = ['/register', '/getbackPasswd']
    // 登录页面、
    var loginPath = '/login'
    var sessionUser = this.$cookie.get(this.consts.session_key_login)
    // 当前路径
    var currentPath = this.$route.path
    var inAccess = false
    for (var i = 0; i < accessPath.length; i++) {
      if (currentPath === accessPath[i]) {
        inAccess = true
      }
    }
    // debugger

    if (inAccess) {
      // 可以直接访问
      this.$router.push(currentPath)
    } else if (loginPath !== currentPath && !sessionUser) {
      // 当前页不是登录页，校验是否登录
      this.$router.push({ path: loginPath, query: { 'redirect': currentPath } })
    } else if (loginPath === currentPath && sessionUser) {
      // 当前是登录页，校验是否已登录
      this.$router.push('/')
    }
  },
  // 校验
  validate(self, validFileds) {
    // 手动触发校验
    var noTouchedFileds = []
    validFileds.forEach(function(field) {
      if (!self.validation.isTouched(field) && !self.validation.hasError(field)) {
        noTouchedFileds.push(field)
      }
      validResult = validResult && self.validation.isPassed(field)
    })
    self.$validate(noTouchedFileds)
    // 是否全部校验通过
    var validResult = true
    validFileds.forEach(function(field) {
      if (self.validation.hasError(field)) {
        validResult = false
      }
    })

    return validResult
  },
  confirm(title, message, btns) {
    if (btns === undefined) {
      btns = [{
        text: '确定',
        type: 'primary'
      }]
    }
    const option = {
      title: title,
      message: message,
      btns: btns
    }
    createDialog(option)
  },
  alert(type, message, timeout) {
    if (timeout === undefined) {
      timeout = 5
    }
    const option = {
      type: type,
      message: message,
      timeout: timeout
    }
    createAlert(option)
  }
}

export default globalMethod
