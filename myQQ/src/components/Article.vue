<template>
  <div class="article">
    <div class="articleImg" :style="{background: bg(jNews.image)}" style="background-size: 100%">
      <h1>{{jNews.title}}</h1>
    </div>
    <div id="content">
      {{writeContent(jNews.body)}}
    </div>

  </div>
</template>

<script>
  import io from '../../static/socket.io/socket.io-1.0.6'
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
        this.httpServer = io.connect('http://127.0.0.1:3000')
        this.httpServer.emit('postUrl', url)
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
      }
    }
  }
</script>

<style>
  .article {
    position: absolute;
    top: 60px;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #333;
    -webkit-transition: .3s linear;
    transition: .3s linear;
  }

  .article.swipe {
    margin-left: 80%;
  }

  .article .articleImg {
    width: 100%;
    height: 30%;
    position: relative;
    margin-bottom: 10px;
  }

  .article .articleImg h1 {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #333;
    text-shadow: #fff 1px 1px 5px;
    text-align: left;
  }

  .article #content {
    text-align: left;
    width: 96%;
    margin: 0 auto;
  }

  .article #content img {
    width: 100%;
  }

  .article #content .avatar {
    width: 34px;
    height: 34px;
  }

  .article #content p {
    line-height: 26px;
    margin-top: 10px;
  }

  .article .question-title {
    margin-bottom: 10px;
  }

  .article .meta * {
    display: inline-block;
    vertical-align: middle;
  }

  .article .view-more {
    display: none;
  }
</style>
