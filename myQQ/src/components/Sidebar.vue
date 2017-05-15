<template>
  <div class="sidebar">
    <div class="first">
      <img class="headImg" :src="src">
      <div class="info">
        <p class="username">{{username}}</p>
        <p class="desc">{{desc}}</p>
      </div>
    </div>
    <div class="second">
      <ul>
        <li v-for="item in linkList">{{item.name}}</li>
      </ul>
    </div>
    <div class="third">
      <ul>
        <li @click="swipeFunc()">
          <router-link :to="settingPath">setting</router-link>
        </li>
        <li @click="swipeFunc()">close</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        src: require('../../static/images/1.jpg'),
        username: 'Erdayo',
        desc: '233333',
        linkList: [
          {url: '', name: 'link1'},
          {url: '', name: 'link2'},
          {url: '', name: 'link3'},
          {url: '', name: 'link4'},
          {url: '', name: 'link5'}
        ],
        settingPath: '/setting'
      }
    },
    methods: {
      swipeFunc: function () {    // 向父组件传递值
        this.$emit('swipeoff', false)
      }
    }
  }
</script>
<style>
  .sidebar {
    background: #12b7f5;
    color: #fff;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80%;
    z-index: 99;
    padding: 20px;
    margin-left: -80%;
    transition: .3s linear;
  }

  .sidebar.swipe {
    margin-left: 0;
  }

  .sidebar .first .headImg, .sidebar .first .info {
    display: inline-block;
    vertical-align: middle;
  }

  .sidebar .first .headImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .sidebar .first .info {
    margin-left: 20px;
  }

  .sidebar .first .info .username {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .sidebar .second {
    margin-top: 180px;
    line-height: 30px;
  }

  .sidebar .second li {
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }

  .sidebar .third {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
  }

  .sidebar .third li {
    float: right;
    width: 43%;
    text-align: center;
    background: #fff;
    color: #12b7f5;
    margin: 0 10px;
    font-size: 16px;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #eee;
  }

  .sidebar .third li a{ color: #12b7f5;}

  .sidebar .third li:first-child {
    float: left;
  }
</style>
