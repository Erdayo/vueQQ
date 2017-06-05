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
