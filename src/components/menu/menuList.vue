<template>
  <div class="panel panel-primary">
    <div class="panel-heading ">
       <ol class="breadcrumb">
          <li><router-link to="/">主页</router-link></li>
          <li class="active">菜单管理</li>
        </ol>
        <!-- <div class="panel-tools"> 
          <div class="tools-item">
            <a class="tools-collapse-icon" role="button" data-toggle="collapse" href="#menuList" aria-expanded="true" aria-controls="menuList">
              <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
          </div>
        </div> -->
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
            <button class="btn btn-primary" type="submit">
              <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
              &nbsp;查询1
            </button>
            <button class="btn btn-success" type="button">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              &nbsp;查询2
            </button>
          </div>
        </div>
      </form>
      <!-- 表格 -->
      <table class="table table-bordered table-hover">
        <thead>
          <tr class="active">
            <th>+</th>
            <th>ID</th>
            <th>年龄</th>
            <th>姓名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
          <tr>
            <td>1</td>
            <td>S001</td>
            <td>29</td>
            <td>张三</td>
          </tr>
        </tbody>
      </table>
      <zi-pagination 
        v-bind:total="page.total" 
        v-bind:pageSize="page.pageSize" 
        v-bind:currentNo="page.currentNo" 
        v-on:update:currentNo="val=>page.currentNo=val"
        v-on:queryMethod="query">
      </zi-pagination>
    </div>
  </div>
</template>


<script>
    export default {
      data () {
        return {
          page: {
            total: 110,
            pageSize: 5,
            currentNo: 1
          }
        }
      },
      props: {
      },
      watch: {
      },
      methods: {
        query () {
          // this.total = 200
          console.log(this.page.currentNo)
        }
      },
      mounted () {
      },
      computed: {
      }
    }
</script>



