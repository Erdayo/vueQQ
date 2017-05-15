<template>
  <div class="other mt10">
    <ul>
      <li v-for="item in stringToJson(newsApi)">
        <router-link :to="returnUrl(item.id)" class="newImg">
          <img :src="item.images">
        </router-link>
        <router-link :to="returnUrl(item.id)" class="newTlt">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import io from '../../static/socket.io/socket.io-1.0.6'
  export default {
    name: 'other',
    data () {
      return {
        newsApi: '',
        year: '',
        month: '',
        day: ''
      }
    },
    mounted: function () {
      this.getToday()
      this.getNewsList()
      this.listenScrollFunc()
    },
    methods: {
      getNewsList: function () {
        let url = 'http://news.at.zhihu.com/api/4/news/before/' + this.formatDate(this.year, this.month, this.day)
        this.httpServer = io.connect('http://127.0.0.1:3000')
        this.httpServer.emit('postUrl', url)
        this.httpServer.on('result', function (data) {
          if (this.newsApi.indexOf(data) === -1 || data.indexOf('"body"') === -1) {
            this.newsApi += data
//            console.log(this.newsApi)
          }
        }.bind(this))
      },
      returnUrl: function (id) {
        return '/article/' + id
      },
      getToday: function () {
        let date = new Date()
        this.year = date.getFullYear().toString()
        this.month = (date.getMonth() + 1).toString()
        this.day = date.getDate().toString()
      },
      formatDate: function (year, month, day) {
        parseInt(month) < 10 ? month = '0' + month : month
        parseInt(day) < 10 ? day = '0' + day : day
        return year + month + day
      },
      stringToJson: function (str) {
        if (str === '') {
          return
        }
        let j = JSON.parse(str)
        return j.stories
      },
      listenScrollFunc: function () {
        window.addEventListener('scroll', winScroll)
        function winScroll (e) {
          if (document.body.scrollTop >= (document.body.scrollHeight * 0.5)) {
            this.day = parseInt(this.day--)
            if (this.day < 0) {
              this.month = parseInt(this.month--)
              this.year = parseInt(this.year)
              if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
                // 闰年
                if (this.month === 2) {
                  this.day = 29
                }
              } else {
                // 平年
                if (this.month === 2) {
                  this.day = 28
                }
              }
            }
          }
        }
      }
    }
  }
</script>
<style>
  .other {
    position: absolute;
    top: 60px;
    width: 100%;
    text-align: center;
    color: #333;
    transition: .3s linear;
  }

  .other.swipe {
    margin-left: 80%;
  }

  .other ul {
    width: 96%;
    margin: 0 auto;
  }

  .other li {
    white-space: nowrap;
    font-size: 0;
    margin-bottom: 10px;
  }

  .other li a {
    display: inline-block;
    vertical-align: middle;
  }

  .other li .newImg {
    width: 20%;
  }

  .other li .newImg img {
    width: 100%;
    height: 100%;
  }

  .other li .newTlt {
    width: 74%;
    font-size: 14px;
    white-space: normal;
    color: #333;
    text-align: left;
    margin: 0 3%;
  }
</style>
