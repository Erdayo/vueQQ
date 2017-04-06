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
<style>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #f3f3f3;
    background: #fff;
    transition: .3s linear;
  }
  .footer.swipe{
    margin-left: 80%;
  }

  .footer ul {
    height: 30px;
    line-height: 30px;
  }

  .footer li {
    display: inline-block;
    width: 33%;
    text-align: center;
  }

  .footer li a {
    color: #333;
  }

  .footer li a.router-link-active {
    color: #12b7f5;
  }

</style>
