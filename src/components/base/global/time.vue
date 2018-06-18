<!-- 
  日期组件 格式为HH:mm:ss
  样例如下：

  <zi-time 
    v-bind:readOnly="readOnly" 
    v-bind:time="date"
    v-on:update:time="val=>date=val"
    v-on:changeMethod="changeDate"
    >
  </zi-time>

  readOnly: 是否只读
  time: 反显的日期
  update:time：组件内部日期变化后，回传变化之后的值
  changeDate：组件内日志变化之后，回调的父组件函数
 -->


<template>
  <div class='input-group' >
    <date-picker 
      v-model="d_time" 
      v-bind:readonly="readOnly" 
      v-bind:config="config" 
      v-bind:wrap="wrap" 
      v-on:dp-change="change">
    </date-picker>
    <span class="input-group-addon">
      <span class="glyphicon glyphicon-time"></span>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        d_time: this.time,
        config: {
          format: 'HH:mm:ss',
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
      time (val) {
        this.d_time = val
      }
    },
    props: {
      readOnly: Boolean,
      time: String,
      changeMethod: Function
    },
    methods: {
      change () {
        this.$emit('update:time', this.d_time)
        this.$emit('changeMethod')
      }
    }
  }
</script>