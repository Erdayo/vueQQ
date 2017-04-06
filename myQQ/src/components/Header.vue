<template>
  <!--头部信息-->
  <div class="header pad10">
    <img class="headImg fl" :src="headImg" v-if="isShow" @click="isSwipeFunc()">
    <a class="back fl" href="javascript:history.back()" v-if="!isShow">←</a>
    <label class="headName">{{outputName(currentName)}}</label>
    <div class="plus fr" v-if="isShow">
      <span @click="more = !more">+</span>
      <transition
        name="fade"
        enter-active-class="animated fadeIn">
        <div class="moreList" v-if="more">
          <label class="tran fr"></label>
          <ul>
            <li v-for="item in lists">
              <router-link :to="item.url">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headers',
    props: ['currentName', 'currentData'],
    data () {
      return {
        headImg: require('../../static/images/1.jpg'),
        more: false,
        lists: [
          {url: '', name: '添加好友'},
          {url: '', name: '添加群'}
        ],
        fade: 'fade',
        isShow: true
      }
    },
    methods: {
      outputName: function (name) {   // 标题信息输出
        if (name === 'Msg') {
          this.isShow = true
          return '消息列表'
        }
        if (name === 'Contact') {
          this.isShow = true
          return '联系列表'
        }
        if (name === 'Dialog') {
          let id = this.$route.params.id
          this.isShow = false
          for (let i = 0, l = this.currentData.length; i < l; i++) {
            if (id === this.currentData[i].id) {
              return this.currentData[i].descName
            }
          }
        }
        if (name === 'Other') {
          this.isShow = false
          return '其他'
        }
      },
      isSwipeFunc: function () {
        this.$emit('swipeon', true)
      }
    }
  }
</script>

<style>
  .header {
    background: #12b7f5;
    color: #fff;
    position: absolute;
    line-height: 40px;
    height: 60px;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    transition: .3s linear;
  }

  .header.swipe {
    margin-left: 80%;
  }

  .header .headImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .header .headName {
    font-size: 16px;
    position: absolute;
    width: 50%;
    left: 25%;
    text-align: center;
  }

  .header .plus {
    font-size: 28px;
    position: relative;
  }

  .header .plus .moreList {
    position: absolute;
    right: 2px;
    z-index: 10;
  }

  .header .plus .moreList ul {
    color: #333;
    border: 1px solid #f3f3f3;
    background: #fff;
    font-size: 12px;
    line-height: 30px;
    width: 80px;
    text-align: center;
  }

  .header .plus .moreList ul li {
    border-bottom: 1px solid #f3f3f3;
  }

  .header .plus .moreList ul li a {
    color: #333;
  }

  .header .plus .moreList ul li:last-child {
    border-bottom: none;
  }

  .header .plus .moreList .tran {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    line-height: 0;
    margin-top: -9px;
  }

  .header .back {
    color: #fff;
    font-size: 18px;
  }
</style>
