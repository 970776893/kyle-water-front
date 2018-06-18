<template>
  <div class="alert alert-dismissible alert-wapper fade in" :class="'alert-' + type" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <div v-html="message" />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    timeout: Number,
    type: String,
    message: String,
    ype: String
  },
  computed: {},
  methods: {}
}

</script>
<style>
.alert-wapper {
  position: fixed;
  top: 30px;
  right: 10px;
  width: 250px;
}

</style>
