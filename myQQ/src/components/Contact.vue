<template>
  <!--联系列表-->
  <div class='contact mt10'>
    <ul>
      <li class='ovf category' v-for='(items, index) in newInfo'>
        <p class='categoryName' @click='showCate(index)'>
          <label v-if='!items.isShow'> → </label>
          <label v-if='items.isShow'> ↓ </label>
          <span>{{items.cate}}</span>
        </p>
        <ol v-show='items.isShow'>
          <li class='link ovf' v-for='(item,index) in items.info' @click='addMsg(index)'>
            <router-link :to='item.url'>
              <img class='fl' :src='item.src'>
              <span class='fl'>{{showName(item.nickName,item.descName)}}</span>
              <label class='fr'>{{isOnline(item.isOnline)}}</label>
            </router-link>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'contact',
    props: ['currentData'],
    data () {
      return {
        newInfo: ''
      }
    },
    mounted: function () {  // 更新重组后的数据信息
      this.newInfo = this.newInfoList()
      let tmpObj = {type: 'userList'}
      this.httpServer.emit('handleInfo', tmpObj)
    },
    methods: {
      showName: function (nick, desc) {   // 显示昵称或备注名称
        if (desc === '') {
          return nick
        } else {
          return desc
        }
      },
      isOnline: function (flag) {   // 是否在线
        let result
        flag ? result = '在线' : result = '离线'
        return result
      },
      newInfoList: function () {  // 按分类对数据信息重组,并返回
        let newInfo = []
        for (let i = 0; i < this.currentData.length; i++) {
          let cateName = this.currentData[i].categoryName
          if (newInfo.length === 0) {
            newInfo.push({cate: cateName, isShow: false, info: []})
          }
          for (let k = 0; k < newInfo.length; k++) {
            let str = newInfo[k].cate
            if (str.indexOf(cateName) !== -1) {
              newInfo[k].info.push(this.currentData[i])
            } else {
              newInfo.push({cate: cateName, isShow: false, info: []})
            }
          }
        }
        return newInfo
      },
      showCate: function (sub) {  // 是否显示分组信息
        this.newInfo[sub]['isShow'] = !this.newInfo[sub].isShow
      },
      addMsg: function (sub) {
        this.currentData[sub].isRemove = false
        this.currentData[sub].isSwipe = false
        let tmpObj = {type: 'addMsg', sub: sub}
        this.httpServer.emit('handleInfo', tmpObj)
      }
    }
  }
</script>
