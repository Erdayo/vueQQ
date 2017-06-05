<template>
  <!--消息列表-->
  <div class="msg mt10">
    <ul>
      <li v-for="(item, index) in currentData" @click="readFunc(index)" v-if="!item.isRemove">
        <v-touch
          :class="{swipe:item.isSwipe}"
          v-on:swipeleft="item.isSwipe=true"
          v-on:swiperight="item.isSwipe=false">
          <router-link :to="item.url">
            <img class="headImg fl" :src="item.src">
            <div class="personalInfo fl">
              <p class="name">{{showName(item.nickName,item.descName)}}</p>
              <p class="content">{{item.lastContent}}</p>
            </div>
            <div class="otherInfo fr">
              <span>{{item.lastTime}}</span>
              <span class="unread" v-if="isUnread(item.unreadNum)">{{item.unreadNum}}</span>
            </div>
          </router-link>
          <div class="del" @click="remove(index)">删除</div>
        </v-touch>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'msg',
    props: ['currentData', 'query'],
    data () {
      return {
        isSwipe: false
      }
    },
    mounted: function () {
//      this.compare()
    },
    methods: {
      showName: function (nick, desc) {   // 显示昵称或备注名称
        if (desc === '') {
          return nick
        } else {
          return desc
        }
      },
      isUnread: function (num) {  // 是否显示有未读信息
        if (num > 0) {
          return true
        } else {
          return false
        }
      },
      remove: function (sub) {  // 删除
        this.currentData[sub].isRemove = true
        let tmpObj = {type: 'subMsg', sub: sub}
        this.httpServer.emit('handleInfo', tmpObj)
      },
      readFunc: function (sub) {  // 重置未读条数
        this.currentData[sub].unreadNum = 0
      },
      compare: function () {    // 数据重排
        let tmp
        for (let i = 1; i < this.currentData.length; i++) {
          if (this.currentData[i - 1].lastTime < this.currentData[i].lastTime) {
            tmp = this.currentData[i - 1]
            this.currentData[i - 1] = this.currentData[i]
            this.currentData[i] = tmp
          }
        }
      }
    }
  }
</script>
