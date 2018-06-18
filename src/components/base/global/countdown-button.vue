<template>
  <button class="btn btn-info" :class="{countdowning : 'disabled'}" :disabled="countdowning" type="button" @click="progress">{{btnText}}
  </button>
</template>
<script>
export default {
  data() {
    return {
      leftTime: 0,
      countdowning: false
    }
  },
  props: {
    text: {
      type: String
    },
    maxTimeInSec: {
      type: String
    },
    action: {
      type: Function
    }
  },
  computed: {
    btnText: function() {
      return this.countdowning ? this.leftTime : this.$props.text
    }
  },
  methods: {
    progress() {
      if (this.$props.action !== undefined) {
        var success = this.$props.action()
        if (!success) {
          return
        }
      }
      this.leftTime = Number(this.$props.maxTimeInSec)
      this.countdowning = true
      this.timer = setInterval(() => {
        // 1s减1
        if (this.leftTime > 0) {
          this.leftTime--
        } else {
          // 清除定时任务
          clearInterval(this.timer)
          this.timer = null
          this.countdowning = false
        }
      }, 1000)
    }
  }
}

</script>
