<template>
  <div class="getback-passwd panel panel-default">
    <div class="page-header">
      <h3>找回密码（{{step}}/2）</h3>
    </div>
    <form class="form-horizontal row panel-body">
      <div class="form-group" :class="{'has-error':validation.hasError('entity.userNo.value') }" v-if="1">
        <label class="col-sm-2 control-label">用户名：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="text" :disabled="step==2" v-model="entity.userNo.value" class="form-control" placeholder="请输入用户名">
        </div>
        <div class="col-sm-3 message">
          <label class="control-label">{{ validation.firstError('entity.userNo.value') }}</label>
        </div>
      </div>
      <div class="form-group" :class="{'has-error':validation.hasError('entity.email.value')}" v-if="(entity.email.step & step) === step" >
        <label class="col-sm-2 control-label">邮箱：<span class="text-danger">*</span></label>
        <div class="col-sm-7 input-group input-group-padding">
          <input type="email" v-model="entity.email.value" class="form-control" placeholder="请输入验证邮箱">
          <span class="input-group-btn">
            <button class="btn btn-info {verifiCodeTimer !== 0 ? 'disabled' : ''}" :disabled="verifiCodeTimer!==0" type="button"
            @click="sendVerifiCode">{{verifiCodeTimer === 0 ? '发送验证码' : verifiCodeTimer }}</button>
          </span>
        </div>
        <div class="col-sm-3 message">
          <label class="control-label">{{ validation.firstError('entity.email.value') }}</label>
        </div>
      </div>
      <div class="form-group" :class="{'has-error':validation.hasError('entity.verifiCode.value')}" v-if="(entity.verifiCode.step & step) === step">
        <label class="col-sm-2 control-label">验证码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="text" v-model="entity.verifiCode.value" class="form-control" placeholder="请输入验证码">
        </div>
        <div class="col-sm-3 message">
          <label class="control-label">{{ validation.firstError('entity.verifiCode.value') }}</label>
          <label v-if="validation.isValidating('entity.verifiCode.value')" class="control-label"><span class="glyphicon glyphicon-repeat glyphicon-rotating"></span></label>
        </div>
      </div>
      <div class="form-group" :class="{'has-error':validation.hasError('entity.passwd.value')}" v-if="(entity.passwd.step & step) === step">
        <label class="col-sm-2 control-label">新密码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="password" v-model="entity.passwd.value" class="form-control" placeholder="请输入密码">
        </div>
        <div class="col-sm-3 message">
          <label class="control-label">{{ validation.firstError('entity.passwd.value') }}</label>
        </div>
      </div>
      <div class="form-group" :class="{'has-error':validation.hasError('entity.passwdConfirm.value')}" v-if="(entity.passwdConfirm.step & step) === step">
        <label class="col-sm-2 control-label">确认密码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="password" v-model="entity.passwdConfirm.value" class="form-control" placeholder="请输入确认密码">
        </div>
        <div class="col-sm-3 message">
          <label class="control-label">{{ validation.firstError('entity.passwdConfirm.value') }}</label>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="col-sm-6 col-sm-offset-5">
          <a class="btn btn-primary" type="button" @click="checkVerifiCode" v-if="step==1">
            下一步
          </a>
          <a class="btn btn-default" type="button" @click="setStep(1)" v-if="step==2">
            上一步
          </a>
          <a class="btn btn-primary" type="button" @click="changePasswd" v-if="step==2">
            提&nbsp;&nbsp;交
          </a>
          <router-link class="btn btn-link  btn-sm pull-right" to="/login">想起密码，直接登录</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  var Promise = require('bluebird')

  export default {
    data () {
      return {
        entity: {
          userNo: {
            value: null,
            step: 3 // 二进制11的表示，步骤step=1，step=2，都显示，使用&计算
          },
          email: {
            value: null,
            step: 1 // 二进制01的表示，步骤step=1，显示，使用&计算
          },
          verifiCode: {
            value: null,
            step: 1 // 二进制01的表示，步骤step=1显示，使用&计算
          },
          passwd: {
            value: null,
            step: 2 // 二进制10的表示，步骤step=2，都显示，使用&计算
          },
          passwdConfirm: {
            value: null,
            step: 2 // 二进制10的表示，步骤step=2，都显示，使用&计算
          }
        },
        verifiCodeTimer: 0, // 验证码倒计时
        step: 1 // 步骤
      }
    },
    methods: {
      // 发送验证码
      sendVerifiCode () {
        const TIME_MAX = 60
        this.verifiCodeTimer = TIME_MAX
        this.timer = setInterval(() => {
          // 1s减1
          if (this.verifiCodeTimer > 0) {
            this.verifiCodeTimer --
          } else {
            // 清除定时任务
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      },
      // 验证码是否有效
      checkVerifiCode () {
        // 手动触发校验
        var validFileds = ['entity.userNo.value', 'entity.email.value', 'entity.verifiCode.value']
        var validResult = this.validate(this, validFileds)

        // 校验未通过
        if (!validResult) {
          console.log('校验未通过')
          return
        }
        this.setStep(2)
      },
      // 修改密码
      changePasswd () {
        // 手动触发校验
        var validFileds = ['entity.passwd.value', 'entity.passwdConfirm.value']
        var validResult = this.validate(this, validFileds)
        if (!validResult) {
          console.log('校验未通过')
          return
        }
        // TODO 修改密码
        console.log('修改密码请求')
      },
      // 设置步骤 1-验证验证码、2-修改密码
      setStep (step) {
        this.step = step
        console.log(step)
      }
    },
    validators: {
      'entity.userNo.value': function (value) {
        var errorMsg = '首字母为字母、只能包含字母、数字、_、@，长度为5~17'
        var regex = '^[a-zA-Z][a-zA-Z0-9_@]{4,16}$'
        return SimpleVueValidation.Validator.value(value).required(errorMsg).regex(regex, errorMsg)
      },
      'entity.email.value': function (value) {
        var errorMsg = '邮箱不符合规则'
        return SimpleVueValidation.Validator.value(value).required(errorMsg).email(errorMsg)
      },
      'entity.verifiCode.value': function (value) {
        var errorMsg = '验证码不能为空，长度小于12'
        return SimpleVueValidation.Validator.value(value).required(errorMsg).maxLength(12, errorMsg).custom(function () {
          return Promise.delay(1000).then(function () {
            if (value !== '123456') {
              return '验证码不正确'
            }
          })
        })
      },
      'entity.passwd.value': function (value) {
        var errorMsg = '密码长度为6到12'
        return SimpleVueValidation.Validator.value(value).required(errorMsg).lengthBetween(6, 12, errorMsg)
      },
      'entity.passwdConfirm.value,entity.passwd.value': function (passwdConfirm, passwd) {
        var errorMsg = '密码不匹配'
        console.log(passwdConfirm)
        console.log(passwd)
        return SimpleVueValidation.Validator.value(passwdConfirm).required(errorMsg).match(passwd, errorMsg)
      }
    }
  }
</script>

<style>
  .getback-passwd {
    width: 50%;
    background-color: white;
    margin: 0px auto 64px auto;
    padding: 30px;
  }

</style>
