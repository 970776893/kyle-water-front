<template>
  <div class="register panel panel-default">
    <div class="page-header">
      <h3>注册账号</h3>
    </div>
    <form class="form-horizontal row panel-body">
      <div class="form-group">
        <label class="col-sm-2 control-label">用户名：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="text" v-model="entity.userNo" class="form-control" placeholder="请输入用户名">
        </div>
        <div class="col-sm-3" v-if="0">
          <label class="control-label form-group-item-tip">用户名不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">称呼：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="text" v-model="entity.nickName" class="form-control" placeholder="请输入称呼">
        </div>
        <div class="col-sm-3" v-if="0">
          <label class="control-label form-group-item-tip">称呼不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">出生年月：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <zi-date v-bind:readOnly="false" v-on:update:date="val=>entity.borthDay=val">
          </zi-date>
        </div>
        <div class="col-sm-3" v-if="0">
          <label class="control-label form-group-item-tip">出生年月不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">头像：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <zi-file-upload url="123" :imgOnly="true" :multiple="false" @onSuccess="portraitSuccess"></zi-file-upload>
        </div>
        <div class="col-sm-3" v-if="1">
          <label class="control-label form-group-item-tip">头像不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">密码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="password" v-model="entity.passwd" class="form-control" placeholder="请输入密码">
        </div>
        <div class="col-sm-3" v-if="1">
          <label class="control-label form-group-item-tip">密码不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">确认密码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="password" v-model="entity.passwdConfirm" class="form-control" placeholder="请输入确认密码">
        </div>
        <div class="col-sm-3" v-if="1">
          <label class="control-label form-group-item-tip">确认密码不能为空</label>
        </div>
      </div>
      <div class="form-group ">
        <label class="col-sm-2 control-label">邮箱：<span class="text-danger">*</span></label>
        <div class="col-sm-7 input-group input-group-padding">
          <input type="email" v-model="entity.email" class="form-control" placeholder="请输入验证邮箱">
          <span class="input-group-btn">
            <zi-count-down text="发送验证码" maxTimeInSec="60" :action="sendVerifiCode"></zi-count-down>
            </span>
        </div>
        <div class="col-sm-3" v-if="1">
          <label class="control-label form-group-item-tip">验证邮箱不能为空</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">验证码：<span class="text-danger">*</span></label>
        <div class="col-sm-7">
          <input type="text" v-model="entity.verifiCode" class="form-control" placeholder="请输入验证码">
        </div>
        <div class="col-sm-3" v-if="0">
          <label class="control-label form-group-item-tip">验证码不能为空</label>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="col-sm-6 col-sm-offset-6">
          <a class="btn btn-success" type="button">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              &nbsp;注册
            </a>
          <router-link class="btn btn-link btn-sm" to="/login">已有账号，直接登录</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entity: {
        userNo: null,
        email: null,
        nickName: null,
        borthDay: null,
        portraitUrl: null,
        passwd: null,
        passwdConfirm: null,
        verifiCode: null
      },
      verifiCodeTimer: 0
    }
  },
  methods: {
    portraitSuccess(file, response, status) {
      console.log('头像上传成功')
    },
    sendVerifiCode() {
      console.log(this.entity.email, '发送验证码')
      return false
    }
  }
}

</script>
<style>
.register {
  width: 50%;
  background-color: white;
  margin: 0px auto 64px auto;
  padding: 30px;
}

</style>
