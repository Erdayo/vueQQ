<template>
  <div class="dialog mt10">
    <!--对话-->
    <div id="dialog">
      <ul>
        <li class="obj ovf" v-for="items in newData">
          <ol>
            <li class="detail" v-for=" item in items.dialog" :class="{txtR: item.isSelf}">
              <p class="time">{{item.time}}</p>
              <div class="contents">
                <img :src="items.src" v-if="!item.isSelf">
                <div class="info">
                  <span></span>
                  <p>{{item.content}}</p>
                </div>
                <img :src="selfImg" v-if="item.isSelf">
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="func ovf">
      <input type="text" placeholder="" autofocus v-model="content" @keyup.enter="updateInfo()">
      <input type="submit" value="发送" @click="updateInfo()" @keyup.enter="updateInfo()">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
    props: ['currentData'],
    data () {
      return {
        newData: '',
        selfImg: require('../../static/images/1.jpg'),
        content: '',
        sub: '',
        tmp: ''
      }
    },
    mounted: function () {
      this.newData = this.filterData()
      this.scrollBottom()
    },
    methods: {
      filterData: function () {   // 过滤显示信息
        let list = this.currentData
        let id = this.$route.params.id
        let self = this
        return list.filter(function (item, index) {
          if (item.id === id) {
            self.sub = index
          }
          return item.id === id
        })
      },
      updateInfo: function () {   // 更新对话信息及机器人api引入
        let self = this
        let key = '42d602c9a21b46d4bfb5a4c7c486a70c'
        this.tmp = this.content
        // 信息缓存到数据内,用于其他页面数据显示
        this.currentData[this.sub]['lastContent'] = this.content
        this.currentData[this.sub]['lastTime'] = self.getCurrentTime()
        this.currentData[this.sub]['dialog'].push({
          isSelf: true,
          content: self.tmp,
          time: self.getCurrentTime()
        })
        this.scrollBottom()
        setTimeout(function () {  // 图灵机器人api引入
          self.$ajax('http://www.tuling123.com/openapi/api?key=' + key + '&info=' + self.tmp).then(response => {
            self.currentData[self.sub]['dialog'].push({
              isSelf: false,
              content: response.data.text,
              time: self.getCurrentTime()
            })
            self.currentData[self.sub]['lastContent'] = response.data.text
            self.currentData[self.sub]['lastTime'] = self.getCurrentTime()
            self.scrollBottom()
          }, response => {
            console.log('error')
          })
        }, 1000)
        self.content = ''   // 清空输入
      },
      getCurrentTime: function () {   // 获取当前时间
        let date = new Date()
        let currentdate = date.getHours() + ':' + date.getMinutes()
        return currentdate
      },
      scrollBottom: function () { // 自动滚动底部
        setTimeout(function () {  // 略微延时加载避免信息未加载完成就获取修改高度
          let dia = document.getElementById('dialog')
          let winH = window.innerHeight
          dia.style.height = winH - 121 + 'px'
          dia.scrollTop = dia.scrollHeight
        }, 10)
      }
    }
  }
</script>
<style>
  .dialog{
    position: absolute;
    width: 100%;
    top: 60px;
    transition: .3s linear;
  }
  .dialog .obj {
    padding: 10px;
  }

  .dialog li img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .dialog li img, .dialog li .info {
    display: inline-block;
    vertical-align: middle;
  }

  .dialog .detail {
    margin-bottom: 10px;
  }

  .dialog .detail.txtR {
    text-align: right;
  }

  .dialog .detail .time {
    color: #666;
    font-size: 12px;
    text-align: center;
    margin-bottom: 5px;
  }

  .dialog .detail .info {
    line-height: 20px;
    color: #333;
    position: relative;
    width: 50%;
    padding-left: 10px;
  }

  .dialog .detail .info p {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    text-align: left;
  }

  .dialog .detail .info span {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid #fff;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -5px;
  }

  .dialog .detail.txtR .info span {
    right: 0;
    left: auto;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: none;
    border-left: 10px solid #fff;
  }

  .dialog .detail.txtR .info {
    padding: 0 10px 0 0;
  }

  .func {
    position: fixed;
    background: #fff;
    border-top: 1px solid #f3f3f3;
    height: 30px;
    line-height: 30px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    font-size: 0;
  }

  .dialog .func input {
    height: 30px;
    border: 1px solid #eee;
    background: transparent;
    font-size: 14px;
  }

  .dialog .func input[type='text'] {
    width: 70%;
    padding: 0 3%;
    margin-right: 3%;
  }

  .dialog .func input[type='submit'] {
    border: none;
    background: #12b7f5;
    color: #fff;
    width: 20%;
  }

  #dialog {
    overflow-y: auto;
  }
</style>
