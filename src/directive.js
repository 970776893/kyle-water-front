import Vue from 'vue'
import paginationComponent from '@/components/base/global/pagination.vue'
import sideMenuBarComponent from '@/components/base/global/side-menu-bar.vue'
import dateComponent from '@/components/base/global/date.vue'
import datetimeComponent from '@/components/base/global/datetime.vue'
import timeComponent from '@/components/base/global/time.vue'
import fileUpload from '@/components/base/global/file-upload.vue'
import globalMethod from '@/components/base/global/method.js'
import countdownButton from '@/components/base/global/countdown-button.vue'
import urls from '@/components/base/urls.js'

// 定义组件
const directiveList = [
  {
    directiveName: 'zi-pagination',
    directiveComponent: paginationComponent,
    type: 'component'
  },
  {
    directiveName: 'zi-side-menu-bar',
    directiveComponent: sideMenuBarComponent,
    type: 'component'
  },
  {
    directiveName: 'zi-date',
    directiveComponent: dateComponent,
    type: 'component'
  },
  {
    directiveName: 'zi-datetime',
    directiveComponent: datetimeComponent,
    type: 'component'
  },
  {
    directiveName: 'zi-time',
    directiveComponent: timeComponent,
    type: 'component'
  },
  {
    directiveName: 'zi-file-upload',
    directiveComponent: fileUpload,
    type: 'component'
  },
  {
    directiveName: 'zi-count-down',
    directiveComponent: countdownButton,
    type: 'component'
  },

  {
    directiveName: 'checkLogin',
    directiveComponent: globalMethod.checkLogin,
    type: 'prototype'
  },
  {
    directiveName: 'validate',
    directiveComponent: globalMethod.validate,
    type: 'prototype'
  },
  {
    directiveName: '$confirm',
    directiveComponent: globalMethod.confirm,
    type: 'prototype'
  },
  {
    directiveName: '$alert',
    directiveComponent: globalMethod.alert,
    type: 'prototype'
  },
  {
    directiveName: 'urls',
    directiveComponent: urls,
    type: 'prototype'
  }
]

// 安装组件
directiveList.forEach(function(directive) {
  var method
  if (directive.type === 'component') {
    method = {
      install: function(Vue) {
        Vue.component(directive.directiveName, directive.directiveComponent)
      }
    }
  } else if (directive.type === 'prototype') {
    method = {
      install: function(Vue, options) {
        Vue.prototype[directive.directiveName] = directive.directiveComponent
      }
    }
  }
  Vue.use(method)
})
