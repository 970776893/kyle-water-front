<!-- 
文件上传组件，支持文件/图片，自动上传，并返回上传之后的url
<zi-file-upload 
:url="123" 
:imgOnly="true" 
:multiple="true" 
@onSuccess="onSuccess"
@onError="onError"
@onComplete="onComplete"
>

url：上传文件的url
imgOnly：是否只支持图片
multiple：是否支持多张
onSuccess：文件上传成功的回调
onError：文件上传失败的回调
onComplete：文件上传完成的回调
 -->

<template>
  <div class="file-upload">
    <table v-if="fileList && fileList.length !== 0" class="table-hover">
      <thead>
        <tr>
          <th>文件名</th>
          <th>预览</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-for="item in fileList">
        <tr >
          <td>{{item.name}}</td>
          <td class="text-center"><img v-if="isImg(item)" v-bind:src="onPreview(item)"></td>
          <td>{{onStatus(item)}}</td>
          <td class="text-center">
            <a class="" v-on:click="deleteItem(item)">删除</a>
            <a class="" v-if="item.isError" v-on:click="uploadItem(item)">重传</a>
          </td>
        </tr>
        <!-- 进度 -->
        <tr class="process-tr">
          <td colspan="4">
            <div class="progress">
              <div class="progress-bar progress-bar-success progress-bar-striped" 
              role="progressbar" 
              v-bind:aria-valuenow="item.progress" 
              aria-valuemin="0" 
              aria-valuemax="100" 
              v-bind:style="'width:' + item.progress + '%;'">
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="input-group">
      <input type="text" disabled="true"  class="form-control">
     <span class="fileclean-button btn-default input-group-addon" v-on:click="deleteAll()">
        <span>
          <span class="icon-span-filestyle glyphicon glyphicon-trash">
          </span>
          &nbsp;清空
        </span>
      </span>
      <vue-file-upload class="btn-danger fileinput-button input-group-addon"
          ref="vueFileUploader"
          v-bind:url="config.url" 
          v-bind:filters="config.filters"
          v-bind:autoUpload="config.autoUpload"
          v-bind:multiple="config.multiple"
          v-bind:events = "config.events"
          v-on:onAdd = "onAddItem"
        >
        <span slot="label"><span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span>&nbsp;上传文件</span>
      </vue-file-upload>
    </div>
  </div>
</template>

<script>

  import VueFileUpload from 'vue-file-upload'

  export default {
    data () {
      return {
        fileList: [],
        imgTypes: '|jpg|png|jpeg|bmp|gif|',
        config: {
          url: this.url,
          autoUpload: true,
          multiple: this.multiple,
          filters: [
            {
              name: 'filter',
              fn (file) {
                var imgOnly = this.vm.$parent.$props.imgOnly
                if (imgOnly === true || imgOnly === 'true') {
                  return this.vm.$parent.isImg(file)
                } else {
                  return true
                }
              }
            }
          ],
           // 回调函数绑定
          events: {
            onSuccessUpload: (file, response, status, header) => {
              console.log(file.name + '上传成功, status:' + status)
              this.$emit('onSuccess', file.file, response, status)
            },
            onErrorUpload: (file, response, status, header) => {
              console.log(file.name + '上传失败, status:' + status)
              this.$emit('onSuccess', file.file, response, status)
            },
            onCompleteUpload: (file, response, status, header) => {
              console.log(file.name + '上传完成, status:' + status)
              this.$emit('onComplete', file.file, response, status)
            },
            onAddFileFail: (file, array) => {
              console.log(file.name + '格式不支持')
            }
          }
        }
      }
    },
    props: {
      url: String,
      imgOnly: Boolean,
      multiple: Boolean,
      onSuccess: Function,
      onError: Function,
      onComplete: Function
    },
    methods: {
      onStatus (file) {
        if (file.isSuccess) {
          return '上传成功'
        } else if (file.isError) {
          return '上传失败'
        } else if (file.isUploading) {
          return '正在上传'
        } else {
          return '待上传'
        }
      },
      isImg (file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
        return this.imgTypes.indexOf(type) !== -1
      },
      onPreview (file) {
        var src = window.URL.createObjectURL(file.file)
        return src
      },
      onAddItem (files) {
        // 单个文件,删除之前的文件
        for (var i = 0; i < files.length - 1; i++) {
          files[i].remove()
        }
        this.fileList = files
      },

      uploadItem (file) {
        // 单个文件上传
        file.upload()
      },
      uploadAll () {
        // 上传所有文件
        this.$refs.vueFileUploader.uploadAll()
      },
      deleteItem (file) {
        // 单个文件上传
        file.remove()
      },
      deleteAll () {
        this.$refs.vueFileUploader.clearAll()
      }
    },
    components: {
      VueFileUpload
    }
  }
</script>

<style>
  .file-upload .fileclean-button {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      /*color: #fff;
      background-color: #d9534f;
      border-color: #d43f3a;*/
  }
  .file-upload .fileinput-button {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      color: #fff;
      background-color: #d9534f;
      border-color: #d43f3a;
  }
  .file-upload .fileinput-button input {
    position:absolute;
    right: 0px;
    top:0px;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    cursor: pointer;
    height: 100%;
  }
  .file-upload table + .input-group > input{
    border-top-left-radius: 0;
  }
  .file-upload table + .input-group > span{
    border-top-right-radius: 0;
  }
  .file-upload table {
    width: 100%;
    table-layout:fixed;
    word-break: break-all; 
    word-wrap: break-word;
    border-collapse: separate;
    border: 1px solid #ddd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .file-upload th {
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  .file-upload td, .file-upload th {
    border-collapse: collapse;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 4px;
  }
  .file-upload tr td:last-child, .file-upload tr th:last-child {
    border-collapse: collapse;
    border-right: 0px;
  }
  .file-upload img {
    max-width: 60px;
    max-height: 60px;
    padding: 1px;
  }
  .file-upload .process-tr {
    border-color: transparent;
    padding: 0px;
    margin: 0px;
  }
  .file-upload .process-tr td{
    border-top: 0px;
    /*margin: 0px;*/
    padding: 0px;
  }
  .file-upload .process-tr div{
    height: 2px;
    margin-bottom: 1px;
  }
</style>


