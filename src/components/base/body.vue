<template>
  <div class="layout-body clearfix">

    <div class="body-left">
      <zi-side-menu-bar></zi-side-menu-bar>
    </div>
    <div class="body-right">
      <router-view />
    </div>
  </div>
  </div>
</template>

<style>
.layout-body {
  /*padding: 10px 10px;*/
  /*padding-bottom: 70px;*/
  /*min-height: 1360px;*/
  width: 100%;
  box-sizing: border-box;
  margin: 0px auto;
  margin-bottom: 64px;  
}

.layout-body .body-left{
  float: left;
  padding : 10px 5px 10px 5px;
  margin: 0px;
  width: 18%;
}

.layout-body .body-right{
  padding : 10px 5px 10px 5px;
  float: right;
  width: 81%;
}

form + table {
  margin-top: 20px;
}
</style>





