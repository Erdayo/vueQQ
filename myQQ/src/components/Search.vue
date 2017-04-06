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
      sendDataFunc: function () {
        let self = this
        this.$emit('change', self.keywords)
      }
    }
  }
</script>
<style>
  .search {
    background: #fff;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: 60px;
    width: 100%;
    transition: .3s linear;
  }
  .search.swipe{
    margin-left: 80%;
  }

  .search input {
    width: 90%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #eee;
    display: block;
    text-align: center;
    color: #666;
    margin: 0 auto;
  }

  .search input:focus {
    border-color: #12b7f5;
  }


</style>
