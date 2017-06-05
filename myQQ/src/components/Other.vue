<template>
  <div class="other">
    <div id="loading">
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="bkt" @click="backTop()">↑</div>
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
  export default {
    name: 'other',
    data () {
      return {
        newsApi: '{"stories":[]}',
        year: 0,
        month: 0,
        day: 0,
        flag: false
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
        let tmpObj = {type: 'postUrl', url: url}
        this.httpServer.emit('handleInfo', tmpObj)
        this.httpServer.on('result', function (data) {
          if (data.indexOf('"body"') !== -1) {
            return
          }
          let tmpData = data.split('"stories":[')[1]
          tmpData = tmpData.slice(0, tmpData.length - 2)
          if (this.newsApi.indexOf(tmpData) === -1 && tmpData.indexOf('"body"') === -1) {
            this.newsApi = this.newsApi.slice(0, this.newsApi.length - 2)
            if (this.newsApi[this.newsApi.length - 1] !== '[') {
              this.newsApi += ','
            }
            this.newsApi += tmpData
            this.newsApi += ']}'
//            console.log(this.newsApi)
            document.getElementById('loading').setAttribute('class', 'hide')
            this.flag = false
          }
        }.bind(this))
      },
      returnUrl: function (id) {
        return '/article/' + id
      },
      getToday: function () {
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()
      },
      formatDate: function (year, month, day) {
        month < 10 ? month = '0' + month : month
        day < 10 ? day = '0' + day : day
        return year + month + day
      },
      stringToJson: function (str) {
        let j = JSON.parse(str)
        return j.stories
      },
      listenScrollFunc: function () {
        window.addEventListener('scroll', this.winScroll)
      },
      winScroll: function (e) {
        let self = this
        let id = self.$route.params.id
        if (id !== undefined) {
          return
        }
        if (self.flag) {
          return
        }
        if (document.body.scrollTop >= (document.body.scrollHeight - window.innerHeight)) {
          self.day = --self.day
          if (self.day <= 0) {
            self.month = --self.month
            switch (self.month) {
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                self.day = 31
                break
              default:
                self.day = 30
            }
            if ((self.year % 4 === 0 && self.year % 100 !== 0) || self.year % 400 === 0) {
              // 闰年
              if (self.month === 2) {
                self.day = 29
              }
            } else {
              // 平年
              if (self.month === 2) {
                self.day = 28
              }
            }
          }
          console.log(self.year, self.month, self.day)
          document.getElementById('loading').setAttribute('class', '')
          let url = 'http://news.at.zhihu.com/api/4/news/before/' + self.formatDate(self.year, self.month, self.day)
          let tmpObj = {type: 'postUrl', url: url}
          this.httpServer.emit('handleInfo', tmpObj)
          self.flag = true
        }
      },
      backTop: function () {
        let timer
        let curTop = document.body.scrollTop
        let speed = 10
        timer = setInterval(function () {
          document.body.scrollTop -= Math.floor(curTop / Math.pow(speed, 2))
          if (document.body.scrollTop === 0) {
            clearInterval(timer)
          }
        }, speed)
      }
    }
  }
</script>
