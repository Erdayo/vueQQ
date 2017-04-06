<template>
  <div id="app">
    <v-touch class="touch" v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true"></v-touch>
    <v-touch v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true">
      <headers :class="{swipe:isSwipe}" @swipeon="isSwipeFunc" :current-name="$route.name" :current-data="sendData()"></headers>
      <search :class="{swipe:isSwipe}" @change="changeFunc" v-if="calcShow('Dialog,Other')"></search>
      <sidebar :class="{swipe:isSwipe}" @swipeoff="isSwipeFunc"></sidebar>
    </v-touch>
    <router-view :current-data="sendData()" :class="{swipe:isSwipe}"></router-view>
    <v-touch v-on:swipeleft="isSwipe=false" v-on:swiperight="isSwipe=true">
      <footers v-if="calcShow('Dialog,Other')" :class="{swipe:isSwipe}"></footers>
    </v-touch>
  </div>
</template>

<script>
  import Headers from '@/components/Header'
  import Footers from '@/components/Footer'
  import Search from '@/components/Search'
  import Sidebar from '@/components/Sidebar'
  export default {
    name: 'app',
    components: {
      Headers,
      Footers,
      Search,
      Sidebar
    },
    data () {
      return {
        info: [],
        keywords: '',
        isSwipe: ''
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
      changeFunc: function (msg) {  // 搜索关键词
        this.keywords = msg
      },
      calcShow: function (name) {
        let result = true
        let names = name.split(',')
        for (let i = 0; i < names.length; i++) {
          result = this.$route.name.toLowerCase().indexOf(names[i].toLowerCase()) === -1 && result
        }
        return result
      },
      isSwipeFunc: function (msg) {
        this.isSwipe = msg
      }
    },
    mounted: function () {  // 挂载数据信息
      let self = this
      this.$ajax.get('../static/data/list.json').then(response => {
        self.info = response.data.info
        self.isSwipe = response.data.isSwipe
      }, response => {
        console.log('error')
      })
    }
  }
</script>
<style>
  .touch {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
