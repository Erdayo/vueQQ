<template>
  <div id="app">
    <v-touch class="touch" v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true"></v-touch>
    <v-touch v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true">
      <headers :class="{swipe:isSwipe}" @swipeon="isSwipeFunc" :current-name="$route.name"
               :current-data="sendData()"></headers>
      <search :class="{swipe:isSwipe}" @change="changeFunc"
              v-if="calcShow('Dialog,Other,Setting,Article,Login,Register')"></search>
      <sidebar :class="{swipe:isSwipe}" @swipeoff="isSwipeFunc"></sidebar>
    </v-touch>
    <router-view :current-data="sendData()" :current-user="curUser" :class="{swipe:isSwipe}"></router-view>
    <v-touch v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true">
      <footers v-if="calcShow('Dialog,Other,Setting,Article,Login,Register')" :class="{swipe:isSwipe}"></footers>
    </v-touch>
  </div>
</template>

<script>
  import Headers from '@/components/Header'
  import Footers from '@/components/Footer'
  import Search from '@/components/Search'
  import Sidebar from '@/components/Sidebar'
  import Login from '@/components/Login'
  import Register from '@/components/Register'
  export default {
    name: 'app',
    components: {
      Headers,
      Footers,
      Search,
      Sidebar,
      Login,
      Register
    },
    data () {
      return {
        info: [],
        keywords: '',
        isSwipe: '',
        curUser: {userId: '', password: ''}
      }
    },
    methods: {
      sendData: function () {   // 发送/显示 筛选后的数据
        let self = this
        if (this.keywords === '') {
          return this.info
        } else {
          return this.info.filter(function (item) {
            return item.descName.toLowerCase().indexOf(self.keywords.toLowerCase()) !== -1
          })
        }
      },
      changeFunc: function (msg) {  // 接收子组件传递的搜索关键词
        this.keywords = msg
      },
      calcShow: function (name) {   // 组件是否显示
        let result = true
        let names = name.split(',')
        for (let i = 0; i < names.length; i++) {
          result = this.$route.name.toLowerCase().indexOf(names[i].toLowerCase()) === -1 && result
        }
        return result
      },
      isSwipeFunc: function (msg) {   // 接收子组件传递的信息并修改isSwipe
        this.isSwipe = msg
      },
      updateInfo: function () {
        let self = this
        let tmpObj = {type: 'userList'}
        this.httpServer.emit('handleInfo', tmpObj)
        this.httpServer.on('userList', function (data, list) {
          let newSub = []
          let existedSub = []
          for (let i in data) {
            let flag = false
            for (let j in self.info) {
              flag = flag || (data[i].userId === parseInt(self.info[j].id))
            }
            if (!flag) {
              newSub.push(i)
            } else {
              existedSub.push(i)
            }
          }
          for (let k = 0; k < newSub.length; k++) {
            self.info.push({
              'id': data[newSub[k]].userId,
              'src': '../../static/images/1.jpg',
              'url': '/dialog/' + data[newSub[k]].userId,
              'categoryName': '我的好友',
              'nickName': data[newSub[k]].username,
              'descName': data[newSub[k]].username,
              'isOnline': data[newSub[k]].online,
              'lastTime': '',
              'lastContent': '',
              'unreadNum': '0',
              'isRemove': true,
              'isSwipe': false,
              'dialog': []
            })
          }
          for (let e = 0; e < existedSub.length; e++) {
            self.info[e + 1].isRemove = true
          }
          for (let m = 0; m < list.length; m++) {
            self.info[list[m]].isRemove = false
          }
        })
      },
      getInfo: function () {
        let self = this
        this.$ajax.get('../static/data/list.json').then(response => {
          self.info = response.data.info
          self.isSwipe = response.data.isSwipe
          self.updateInfo()
        }, response => {
          console.log('error')
        })
      },
      getCurrentTime: function () {   // 获取当前时间
        let date = new Date()
        let currentdate = date.getHours() + ':' + date.getMinutes()
        return currentdate
      }
    },
    mounted: function () {  // 挂载数据信息
      let self = this
      this.getInfo()
      this.httpServer.on('disconnect', function () {
        setTimeout(function () {
          let tmpObj = {type: 'reLogin', userId: self.curUser.userId, password: self.curUser.password}
          self.httpServer.emit('handleInfo', tmpObj)
        }, 2000)
      })
      this.httpServer.on('receiveMsg', function (data, userSub) {   // 未读消息
        self.info[parseInt(userSub) + 1].dialog.push({
          isSelf: false,
          content: data,
          time: self.getCurrentTime()
        })
        self.info[parseInt(userSub) + 1].lastContent = data
        self.info[parseInt(userSub) + 1].lastTime = self.getCurrentTime()
        self.info[parseInt(userSub) + 1].unreadNum = parseInt(self.info[parseInt(userSub) + 1].unreadNum) + 1
      })
    },
    watch: {
      '$route': function () {
        this.updateInfo()
        if (this.$route.params.id === undefined) {

        }
      }
    }
  }
</script>
