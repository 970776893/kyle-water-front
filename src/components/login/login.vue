<template>
  <div class="login">
    <div class="login-title clearfix">
      <div class="name">Kyle集</div>
      <img class="icon" v-bind:src="logonIcon" />
    </div>
    <div class="login-content">
      <form class="form-horizontal">
        <div class="form-group" v-if="tipMsg">
          <div class="text-danger text-left">{{tipMsg}}</div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="text" v-model="username" class="form-control" placeholder="账号/邮箱">
            <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="password" v-model="password" class="form-control" placeholder="密码">
            <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
          </div>
        </div>
        <div class="form-group">
          <div class="">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="remeberMe" /> 记住我</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="loginButton">
            <a type="button" class="btn btn-success" v-on:click="login"> &nbsp;登&nbsp;&nbsp;录&nbsp; </a>
            <router-link class="btn btn-link btn-sm" to="/register">&nbsp;注&nbsp;&nbsp;册&nbsp; </router-link>
            <!-- <button type="button"  class="btn btn-link btn-sm"> &nbsp;注&nbsp;&nbsp;册&nbsp; </button> -->
          </div>
          <router-link class="btn btn-link btn-sm" to="/getbackPasswd">忘记密码 </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import logonIcon from '@/assets/logo.png'

export default {
  data() {
    return {
      logonIcon: logonIcon,
      username: 'sadmin',
      password: '123456a',
      remeberMe: true,
      tipMsg: ''
    }
  },
  methods: {
    login() {
      this.tipMsg = ''
      if (!this.username || !this.password) {
        this.tipMsg = '用户名/密码不能为空'
        return
      }
      const params = {
        loginCode: this.username,
        password: this.password
      }
      this.$http.get(this.urls.login, { params: params }).then(function(res) {
        const body = res.body
        if (body.code !== 200) {
          this.tipMsg = body.message
          return
        }
	console.log(JSON.stringify(params))
        this.$cookie.set('sessionj', JSON.stringify(params))
	console.log(this.$cookie.get('sessionj'))
        // 登录成功后跳转的页面
        var redirectUrl = this.$route.query.redirect
        var to = '/'
        if (redirectUrl) {
          to = redirectUrl
        }
        this.$router.push(to)
      }, function(rej) {
        this.tipMsg = '系统异常,请稍后重试'
      })
    }
  }
}

</script>
<style>
.login {
  font-size: 14px;
  background-color: white;
  width: 380px;
  margin: 120px auto 20px auto;
  border-radius: 5px;
  border: 1px #b5bef4 solid;
}

.login-content {
  padding: 15px 40px 10px 40px;
}

.login-content input {
  font-size: 14px;
  border-radius: 3px;
}

.login-title {
  padding: 10px;
  border-bottom: 1px #b5bef4 solid;
}

.login-title .name,
.login-title .icon {
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  color: #525252;
}

.login-title .name {
  padding: 0px 15px;
  float: left;
}

.login-title .icon {
  float: right;
  padding: 5px 15px;
}

.loginButton {
  padding: 15px 0px 5px 0px;
  border-top: 1px #DDDDDD solid;
}

.loginButton a:first-child {
  width: 60%;
}

.loginButton a:last-child {
  width: 35%;
}



/*登录页footer的样式*/

.login+.layout-footer {
  background-color: transparent;
  line-height: unset;
  height: unset;
  font-size: 10px;
  position: unset;
  width: 300px;
  margin: auto
}

</style>
