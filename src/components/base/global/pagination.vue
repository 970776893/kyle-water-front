<!-- 
  分页导航条公共组件 
  使用方式（样例）：

    <zi-pagination 
      v-bind:total="page.total" 
      v-bind:pageSize="page.pageSize" 
      v-bind:currentNo="page.currentNo" 
      v-on:update:currentNo="val=>page.currentNo=val"
      v-on:queryMethod="query">
    </zi-pagination>

  total:     总条数
  pageSize： 一页最大展示的条数
  currentNo：当前页的页码（从1开始）
  query：    点击页码调用的方法名(eg: function query(index, ...) 其中query为方法名，index为点击的页码编号)
  update:currentNo: 将数据返回父组件
-->
<template>
  <div class="clearfix pagination-bar">
    <nav class="pull-right">
      <ul class="pagination">
        <li v-bind:class="{disabled : in_currentNo == 1}" ><a v-on:click="toggle(1)">首页</a></li>
        <li v-bind:class="{disabled : in_currentNo == 1}" ><a v-on:click="toggle(in_currentNo - 1)">上一页</a></li>
        <li v-bind:class="{active : in_currentNo == item.no}" v-for="item in in_pageItems"><a v-on:click="toggle(item.no)">{{item.text}}</a></li>
        <li v-bind:class="{disabled : in_currentNo >= in_totalPage}" ><a v-on:click="toggle(in_currentNo + 1)">下一页</a></li>
        <li v-bind:class="{disabled : in_currentNo >= in_totalPage}" ><a v-on:click="toggle(in_totalPage)">尾页</a></li>
      </ul>
    </nav>
    <div>第{{in_currentNo}}/{{in_totalPage}}页&nbsp;&nbsp;共{{in_total}}条</div>
  </div>
</template>

<!-- 菜单样式 -->
<style>

.pagination-bar .pagination a {
  cursor: pointer;
}
.pagination-bar>div {
  position:relative;
  float:right;
  top:28px;
  right:15px;
}
</style>

<script>
    export default {
      data () {
        return {
          in_total: this.total,
          in_pageSize: this.pageSize,
          in_currentNo: this.currentNo
        }
      },
      props: {
        total: Number,
        pageSize: Number,
        currentNo: Number,
        queryMethod: Function
      },
      watch: {
        total (value) {
          if (value !== this.this.in_total) {
            this.in_total = value
          }
        },
        pageSize (value) {
          if (value !== this.in_pageSize) {
            this.in_pageSize = value
          }
        },
        currentNo (value) {
          if (value !== this.in_currentNo) {
            this.in_currentNo = value
          }
        }
      },
      methods: {
        toggle (index) {
          // 点击事件
          if (index !== undefined && index >= 1 && index <= this.in_totalPage && index !== this.in_currentNo) {
            this.in_currentNo = index
            // debugger
            // 设置父组件元素
            // debugger
            // this.$set(this.$parent.data, 'page.currentNo', index)
            // this.$parent['page']['currentNo'] = index
            this.$emit('update:currentNo', index)
            this.$emit('queryMethod')
          }
        }
      },
      mounted () {
      },
      computed: {
        // 总页数
        in_totalPage () {
          var tp = Math.ceil(this.in_total / this.in_pageSize)
          if (this.in_currentNo > tp) {
            this.in_currentNo = 1
          }
          return tp
        },
        // 分页条目
        in_pageItems () {
          const tp = this.in_totalPage
          var items = []
          // 最多前面展示四个  后面展示四个
          var size = 4
          // 开始位置
          var start = this.in_currentNo
          // 结束位置
          var end = this.in_currentNo
          for (var i = 0; i < size; i++) {
            // 向start扩展
            if (start > 1) {
              start--
            } else if (end < tp) {
              // 向start到头 就向end扩展
              end++
            }
            // 向end扩展
            if (end < tp) {
              end++
            } else if (start > 1) {
              // 向end到头 就向start扩展
              start--
            }
          }
          // 前面补充...
          if (start > 1) {
            var item = {
              text: '...',
              no: start
            }
            items.push(item)
            start++
          }
          for (i = start; i < end; i++) {
            item = {
              no: i,
              text: i
            }
            items.push(item)
          }
          // 后面补充...
          if (end === tp) {
            item = {
              no: i,
              text: i
            }
            items.push(item)
          } else if (end < tp) {
            item = {
              text: '...',
              no: end
            }
            items.push(item)
            start++
          }

          return items
        }
      }
    }
</script>