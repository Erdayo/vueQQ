<template>
  <div class="search mt10 pad10">
    <input type="text" placeholder="搜索" v-model="keywords" v-on:keyup="sendDataFunc">
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        keywords: ''
      }
    },
    methods: {
      sendDataFunc: function () {   // 向父组件传递输入的关键词
        let self = this
        this.$emit('change', self.keywords)
      }
    }
  }
</script>
