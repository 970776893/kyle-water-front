<!-- 
  日期组件 格式为yyyy-MM-dd
  样例如下：

  <zi-date 
    v-bind:readOnly="readOnly" 
    v-bind:date="date"
    v-on:update:date="val=>date=val"
    v-on:changeMethod="changeDate"
    >
  </zi-date>

  readOnly: 是否只读
  date: 反显的日期
  update:date：组件内部日期变化后，回传变化之后的值
  changeDate：组件内日志变化之后，回调的父组件函数
 -->

<template>
  <div class='input-group' >
    <date-picker 
      v-model="d_date" 
      v-bind:readonly="readOnly" 
      v-bind:config="config" 
      v-bind:wrap="wrap" 
      v-on:dp-change="change">
    </date-picker>
    <span class="input-group-addon">
      <span class="glyphicon glyphicon-calendar"></span>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        d_date: this.date,
        config: {
          dayViewHeaderFormat: 'YYYY-MM-DD',
          format: 'YYYY-MM-DD',
          useCurrent: false,
          sideBySide: true,
          toolbarPlacement: 'bottom',
          showClear: true,
          showTodayButton: true,
          showClose: true,
          allowInputToggle: false,
          locale: 'zh-CN',
          keyBinds: null
        },
        wrap: true
      }
    },
    watch: {
      date (val) {
        this.d_date = val
      }
    },
    props: {
      readOnly: Boolean,
      date: String,
      changeMethod: Function
    },
    methods: {
      change () {
        this.$emit('update:date', this.d_date)
        if (this.changeMethod) {
          this.$emit('changeMethod')
        }
      }
    }
  }
</script>