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
            if (parseInt(id) === parseInt(this.currentData[i].id)) {
              return this.currentData[i].descName
            }
          }
        }
        if (name === 'Other') {
          this.isShow = false
          return '日报'
        }
        if (name === 'Article') {
          this.isShow = false
          return '文章详情'
        }
      },
      isSwipeFunc: function () {
        this.$emit('swipeon', true)
      }
    }
  }
</script>
