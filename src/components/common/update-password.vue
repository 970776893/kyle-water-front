<template>
  <div >
    <!-- 导航 -->
    <ol class="breadcrumb body-nav">
      <li><router-link to="/">Home</router-link></li>
      <li class="active">修改密码</li>
    </ol>

    <!-- 搜索栏 -->
    <div class="body-content">
      <div class="page-body">
        <form class="form-horizontal row">
           <div class="form-group col-sm-11">
            <label class="control-label col-sm-4">用户名:</label>
            <div class="input-group  col-sm-4">
              <input type="text" class="form-control" disabled="true" v-bind:value="params.acccountNo" placeholder="用户名">
            </div>
          </div>
           <div class="form-group col-sm-11">
            <label class="control-label col-sm-4">原密码:</label>
            <div class="input-group  col-sm-4">
              <input type="password" class="form-control" v-on:input="watchPassword" v-model="params.password" placeholder="原始密码">
              <div class="text-danger" v-if="tip.password">{{tip.password}}</div>
            </div>
          </div>
          <div class="form-group col-sm-11">
            <label class="control-label col-sm-4">新密码:</label>
            <div class="input-group  col-sm-4">
              <input type="password" class="form-control" v-on:input="watchPassword" v-model="params.newPassword" placeholder="新密码">
              <div class="text-danger" v-if="tip.newPassword">{{tip.newPassword}}</div>
            </div>
          </div>
          <div class="form-group col-sm-11">
            <label class="control-label col-sm-4">确认新密码:</label>
            <div class="input-group  col-sm-4">
              <input type="password" class="form-control" v-on:input="watchPassword" v-model="params.newPasswordConfirm" placeholder="确认新密码">
              <div class="text-danger" v-if="tip.newPasswordConfirm">{{tip.newPasswordConfirm}}</div>
            </div>
          </div>

          <div class="col-sm-11">
            <div class="col-sm-4 col-sm-offset-4">
              <button class="btn btn-primary" type="button" v-on:click="submit">
                提&nbsp;&nbsp;&nbsp;交
              </button>
              <button class="btn btn-success" type="button" v-on:click="goBack">
                返&nbsp;&nbsp;&nbsp;回
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
<style>


</style>


<script>
  export default {
    data () {
      var userInfo = JSON.parse(this.$cookie.get('userInfo'))
      return {
        params: {
          acccountNo: userInfo.acccountNo,
          password: null,
          newPassword: null,
          newPasswordConfirm: null
        },
        tip: {
          password: null,
          newPassword: null,
          newPasswordConfirm: null
        }
      }
    },
    methods: {
      // 监听输入框变化
      watchPassword () {
        var flag = true
        if (!this.params.password) {
          this.tip.password = '原密码为空'
          flag = false
        } else {
          this.tip.password = null
        }
        if (!this.params.newPassword) {
          this.tip.newPassword = '新密码为空'
          flag = false
        } else if (this.params.newPassword === this.params.password) {
          this.tip.newPassword = '新密码与原密码相同'
          flag = false
        } else {
          this.tip.newPassword = null
        }
        if (this.params.newPassword !== this.params.newPasswordConfirm) {
          this.tip.newPasswordConfirm = '与新密码为不同'
          flag = false
        } else {
          this.tip.newPasswordConfirm = null
        }
        return flag
      },
      // 返回
      goBack () {
        this.$router.go(-1)
      },
      // 提交
      submit () {
        var valid = this.watchPassword()
        // 校验不合法
        if (!valid) {
          return
        }
        this.$router.go(-1)
      }
    }
  }
</script>

