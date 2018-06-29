<template>
  <div class="layout-header">
    <div class="title">
      <router-link to="/">
        <span class="glyphicon glyphicon-home"></span> 
        Kyle集
      </router-link>
    </div>
    <div class="tip-msg">
        <router-link class="pull-right" to="/message">
            <span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
            消息
            <span class="badge">{{msgNumber}}</span>
        </router-link>
        <a class="pull-right" href="">
            <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
            提醒
            <span class="badge">{{tipNumber}}</span>
        </a>
    </div>
    <div class="user navbar-right">
        <div class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img class="img-rounded" v-bind:src="userIcon">
                <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <li><a v-on:click=""><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;个人信息</a></li>
                <li><router-link to="/common/updatePassword"><span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;修改密码</router-link></li>
                <li><a v-on:click="logout"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;退出</a></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import loginIcon from '@/assets/logo.png'

  export default {
    data () {
      return {
        msgNumber: 10,
        tipNumber: 8
      }
    },
    computed: {
      userIcon () {
        var userInfo = JSON.parse(this.$cookie.get('sessionj'))
        return (userInfo && userInfo.pictureUrl) ? userInfo.pictureUrl : loginIcon
      }
    },
    methods: {
      // 登出操作
      logout () {
        this.$http.get(this.urls.logout)
        this.$cookie.delete(this.consts.session_key_login)
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
.layout-header {
  padding: 20px 0px 20px 20px;
  background-color: white;
  margin-bottom: 10px;
}
.layout-header>.title{
  font-size: x-large;
  display: inline-block;
}
.layout-header>.title>a{
  color: green;
}

.layout-header>.user {
  color: #a3a3a3;
  display: inline-block;
  float: right;
  margin: 5px 20px 0px 20px;
}
.layout-header>.user img{
  height: 25px;
  padding: 2px;
}
.layout-header>.user .dropdown-menu a{
  padding: 10px;
}
.layout-header>.tip-msg{
  display: inline-block;
  width: 80%;
}
.layout-header>.tip-msg>a{
  padding-left: 20px;
  padding-right: 20px;
  color: #a3a3a3;
}
.layout-header>.tip-msg>a .badge{
  background-color: red;
}
</style>
