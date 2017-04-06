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

<style>
  .msg {
    color: #333;
    transition: .3s linear;
    position: absolute;
    width: 100%;
    top: 120px;
  }
  .msg.swipe{
    margin-left: 80%;
  }

  .msg li {
    background: #fff;
    border-top: 1px solid #f3f3f3;
    overflow: hidden;
    position: relative;
    height: 60px;
  }

  .msg li > div {
    height: 60px;
  }

  .msg li > div.swipe a, .msg li > div.swipe .del {
    margin-left: -50px;
  }

  .msg li a {
    padding: 10px 2.5%;
    line-height: 40px;
    height: 40px;
    color: #333;
    display: block;
    overflow: hidden;
    position: absolute;
    width: 95%;
    transition: .2s linear;
  }

  .msg li .headImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .msg li .personalInfo {
    line-height: 20px;
    margin-left: 10px;
    width: 65%;
  }

  .msg li .personalInfo .name {
    font-size: 16px;
  }

  .msg li .personalInfo .content {
    color: #666;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .msg li .otherInfo span {
    line-height: 20px;
    display: block;
    color: #999;
    text-align: right;
  }

  .msg li .otherInfo span.unread {
    background: orangered;
    color: #fff;
    border-radius: 2em;
    text-align: center;
    width: 30px;
    float: right;
  }

  .msg li .del {
    background: red;
    color: #fff;
    position: absolute;
    height: 60px;
    line-height: 60px;
    width: 50px;
    text-align: center;
    left: 100%;
    transition: .2s linear;
  }
</style>
