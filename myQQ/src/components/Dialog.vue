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
      let self = this
      this.httpServer.on('receiveMsg', function (data, userSub) {
        if (self.$route.params.id !== self.currentData[parseInt(userSub) + 1].id) {
          return
        }
        if (self.currentData[self.sub].dialog.indexOf(data) === -1) {
          self.currentData[self.sub].dialog.push({
            isSelf: false,
            content: data,
            time: self.getCurrentTime()
          })
        }
        self.currentData[self.sub]['lastContent'] = data
        self.currentData[self.sub]['lastTime'] = self.getCurrentTime()
        self.scrollBottom()
      })
    },
    methods: {
      filterData: function () {   // 过滤显示信息
        let list = this.currentData
        let id = this.$route.params.id
        let self = this
        return list.filter(function (item, index) {
          if (parseInt(item.id) === parseInt(id)) {
            self.sub = index
          }
          return parseInt(item.id) === parseInt(id)
        })
      },
      updateInfo: function () {   // 更新对话信息
        let self = this
        let id = self.$route.params.id
        let key = '42d602c9a21b46d4bfb5a4c7c486a70c'
        this.tmp = this.content
        // 信息缓存到数据内,用于其他页面数据显示
        this.currentData[this.sub]['lastContent'] = this.content
        this.currentData[this.sub]['isRemove'] = false
        this.currentData[this.sub]['lastTime'] = self.getCurrentTime()
        this.currentData[this.sub]['dialog'].push({
          isSelf: true,
          content: self.tmp,
          time: self.getCurrentTime()
        })

        if (id === '01') {    // 仅id为01的使用机器人返回
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
        } else {
          let tmpObj = {
            type: 'msg',
            sub: this.sub,
            data: this.currentData[this.sub].dialog[this.currentData[this.sub].dialog.length - 1].content
          }
          this.httpServer.emit('handleInfo', tmpObj)
        }
        this.content = ''   // 清空输入
        this.scrollBottom()
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
