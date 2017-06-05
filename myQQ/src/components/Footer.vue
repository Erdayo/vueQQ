<template>
  <!--底部导航-->
  <div class="footer">
    <ul>
      <li v-for="item in menuList">
        <router-link :to="item.url">{{item.name}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'footers',
    data () {
      return {
        menuList: [
          {url: '/msg', name: '消息'},
          {url: '/contact', name: '联系人'},
          {url: '/other', name: '其他'}
        ]
      }
    }
  }
</script>
