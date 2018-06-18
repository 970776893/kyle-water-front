<template>
  <div class="layout">
    <router-view name="header" />
    <router-view name="body" />
    <router-view name="footer" />
  </div>
</template>
<script>
  import globalMethod from '@/components/base/global/method'

  export default {
    created: globalMethod.checkLogin
  }
</script>


<style>
  .layout {
    position: relative;  
    min-height: 100%;
    overflow: hidden;
  }
</style>