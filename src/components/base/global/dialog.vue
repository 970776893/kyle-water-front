<template>
    <div class="modal fade in dialog-mask" tabindex="-1" role="dialog" v-if="visible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{option.title}}</h4>
          </div>
          <div class="modal-body">
            <div v-html="option.message"/>
          </div>
          <div class="modal-footer">
            <button v-for="btn in option.btns" type="button" :class="'btn btn-' + btn.type" @click="call(btn.action)">{{btn.text}}</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      visible: {
        type: Boolean
      },
      option: {
        type: Object
      }
    },
    computed: {
    },
    methods: {
      close: function () {
        this.$props.visible = false
      },
      call: function (action) {
        this.close()
        if (action !== undefined) {
          action()
        }
      }
    }
  }
</script>