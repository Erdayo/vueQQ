<template>
  <div class="article">
    <div id="bkt" @click="backTop()">↑</div>
    <div class="articleImg" :style="{background: bg(jNews.image)}" style="background-size: 100%">
      <h1>{{jNews.title}}</h1>
    </div>
    <div id="content">
      {{writeContent(jNews.body)}}
    </div>

  </div>
</template>

<script>
  export default {
    name: 'article',
    data () {
      return {
        news: '',
        jNews: ''
      }
    },
    mounted: function () {
      this.getArticle()
    },
    methods: {
      getArticle: function () {
        let id = this.$route.params.id
        let url = 'http://news-at.zhihu.com/api/4/news/' + id
        let tmpObj = {type: 'postUrl', url: url}
        this.httpServer.emit('handleInfo', tmpObj)
        this.httpServer.on('result', function (data) {
          if (this.news.indexOf(data) === -1) {
            this.news = data
//            console.log(this.news)
            this.jNews = this.stringToJson(this.news)
          }
        }.bind(this))
      },
      stringToJson: function (str) {
        if (str === '') {
          return
        }
        let j = JSON.parse(str)
        return j
      },
      writeContent: function (str) {
        setTimeout(function () {
          if (str === undefined) {
            return
          }
          let wrap = document.getElementById('content')
          wrap.innerHTML = str
        }, 10)
      },
      bg: function (url) {
        return 'url("' + url + '") no-repeat center'
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
