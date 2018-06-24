<template>
  <div class="panel panel-primary">
    <div class="panel-heading ">
      <ol class="breadcrumb">
        <li>
          <router-link to="/">主页</router-link>
        </li>
        <li class="active">用户管理</li>
      </ol>
      <div class="panel-tools">
        <div class="tools-item">
          <a class="tools-collapse-icon" role="button" data-toggle="collapse" href="#menuList" aria-expanded="true" aria-controls="menuList">
              <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
        </div>
      </div>
    </div>
    <!-- 搜索栏 -->
    <div class="panel-body panel-collapse collapse in" id="menuList">
      <form class="form-horizontal row">
        <div class="form-group col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">用户名：</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" placeholder="请输入用户名">
          </div>
        </div>
        <div class="form-group col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">用户名：</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" placeholder="请输入用户名">
          </div>
        </div>
        <div class="form-group  col-sm-3 col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">密码：</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" placeholder="请输入密码">
          </div>
        </div>
        <div class="form-group col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">用户名：</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" placeholder="请输入用户名">
          </div>
        </div>
        <div class="form-group  col-sm-3 col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">密码：</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" placeholder="请输入密码">
          </div>
        </div>
        <div class="form-group col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">用户名：</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" placeholder="请输入用户名">
          </div>
        </div>
        <div class="form-group  col-sm-3 col-sm-3 form-group-search">
          <label class="col-sm-4 control-label">密码：</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" placeholder="请输入密码">
          </div>
        </div>
        <div class="col-sm-12">
          <div class="col-sm-4 col-sm-offset-8">
            <button class="btn btn-primary" :disabled="querying" type="button" @click="query">
              <span class="glyphicon glyphicon-search" aria-hidden="true"></span> &nbsp;查询1
            </button>
            <button class="btn btn-success" type="button">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> &nbsp;查询2
            </button>
          </div>
        </div>
      </form>
      <!-- 表格 -->
      <table class="table table-bordered table-hover">
        <thead>
          <tr class="active">
            <th>+</th>
            <th>用户编码</th>
            <th>用户名</th>
            <th>手机号</th>
            <th>类型</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="querying">
          <tr>
            <td colspan="7" class="text-center"> 加载中 <span class="glyphicon-rotating glyphicon glyphicon-refresh"></span></td>
          </tr>
        </tbody>
        <tbody v-else-if="page.total===0">
          <tr>
            <td colspan="7" class="text-center"> 暂无数据</td>
          </tr>
        </tbody>
        <tbody v-else="page.total===0">
          <tr v-for="(item,index) in dataset">
            <td>{{index}}</td>
            <td>{{item.userCode}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.type | userType}}</td>
            <td>{{item.createAt}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <zi-pagination v-if="page.total>0" v-bind:total="page.total" v-bind:pageSize="page.pageSize" v-bind:currentNo="page.currentNo" v-on:update:currentNo="val=>page.currentNo=val" v-on:queryMethod="query">
      </zi-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataset: [],
      querying: false,
      page: {
        total: 0,
        pageSize: 5,
        pageNo: 1
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    buildParam() {
      const params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize
      }
      return params
    },
    query() {
      this.querying = true
      this.$http.get(this.urls.userPage, { params: this.buildParam() }).then(function(res) {
        this.querying = false
        const data = res.body.data
        this.page.total = data.total
        this.dataset = data.itemList
      }, function(rej) {
        this.querying = false
        console.log(rej)
      })
    }
  },
  mounted: function() {
    this.query()
  },
  filters: {
    userType: function(type) {
      const value = Number(type)
      switch (value) {
        case 0:
          return '超级管理员'
        case 1:
          return '管理员'
        default:
          return '-'
      }
    }
  }
}

</script>
