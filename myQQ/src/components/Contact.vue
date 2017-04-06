<template>
  <!--联系列表-->
  <div class="contact mt10">
    <ul>
      <li class="ovf category" v-for="(items, index) in newInfo">
        <p class="categoryName" @click="showCate(index)">
          <label v-if="!items.isShow"> → </label>
          <label v-if="items.isShow"> ↓ </label>
          <span>{{items.cate}}</span>
        </p>
        <ol v-show="items.isShow">
          <li class="link ovf" v-for="(item,index) in items.info" @click="addMsg(index)">
            <router-link :to="item.url">
              <img class="fl" :src="item.src">
              <span class="fl">{{showName(item.nickName,item.descName)}}</span>
              <label class="fr">{{isOnline(item.isOnline)}}</label>
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
      }
    }
  }
</script>
<style>
  .contact{
    position: absolute;
    top: 120px;
    width: 100%;
    transition: .3s linear;
  }
  .contact.swipe{
    margin-left: 80%;
  }
  .contact .category {
    border-top: 1px solid #eee;
    padding: 10px 10px 0 10px;
    background: #fff;
  }

  .contact .category .categoryName {
    height: 30px;
    line-height: 30px;
    color: #333;
    padding-bottom: 10px;
  }

  .contact .category .link {
    height: 30px;
    line-height: 30px;
    padding: 10px;
    border-top: 1px solid #eee;
  }

  .contact .category .link a {
    display: block;
    overflow: hidden;
  }

  .contact .category .link img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .contact .category .link span {
    color: #333;
  }

  .contact .category .link label {
    color: #999;
    font-size: 12px;
  }
</style>
