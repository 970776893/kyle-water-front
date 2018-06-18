<!-- 
    日期组件 格式为yyyy-MM-dd HH:mm:ss
  样例如下：
  <zi-datetime 
    v-bind:readOnly="readOnly" 
    v-bind:datetime="datetime"
    v-on:update:datetime="val=>datetime=val"
    v-on:changeMethod="changeDate"
    >
  </zi-datetime>

  readOnly: 是否只读
  datetime: 反显的日期
  update:datetime：组件内部日期变化后，回传变化之后的值
  changeDate：组件内日志变化之后，回调的父组件函数
 -->

<template>
  <div class='input-group' >
    <date-picker 
      v-model="d_datetime" 
      v-bind:readonly="readOnly" 
      v-bind:config="config" 
      v-bind:wrap="wrap" 
      v-on:dp-change="change">
    </date-picker>
    <span class="input-group-addon">
      <span class="glyphicon glyphicon-th-list"></span>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        d_datetime: this.datetime,
        config: {
          dayViewHeaderFormat: 'YYYY-MM-DD',
          format: 'YYYY-MM-DD HH:mm:ss',
          useCurrent: false,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          showClear: true,
          showTodayButton: true,
          showClose: true,
          allowInputToggle: true,
          locale: 'zh-CN',
          keyBinds: null
        },
        wrap: true
      }
    },
    watch: {
      datetime (val) {
        this.d_datetime = val
      }
    },
    props: {
      readOnly: Boolean,
      datetime: String,
      changeMethod: Function
    },
    methods: {
      change () {
        this.$emit('update:datetime', this.d_datetime)
        this.$emit('changeMethod')
      }
    }
  }
</script>
