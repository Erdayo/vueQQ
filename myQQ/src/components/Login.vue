<template>
  <div class="login">
    <div id="owl-login" :class="focusClass">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
    </div>
    <div class="login-form">
      <input id="username" type="text" name="username" placeholder="请输入ID" autocomplete="off"
             @keyup.enter="submitForm()" value="10000" autofocus>
      <input id="pwd" type="password" name="pwd" placeholder="请输入密码" @focus="addClass()" @blur="removeClass()"
             @keyup.enter="submitForm()" value="123456">
      <p id="tip"></p>
      <div class="opt">
        <button id="submit" @click="submitForm()">登录</button>
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    props: ['currentUser'],
    data () {
      return {
        focusClass: ''
      }
    },
    methods: {
      addClass: function () {
        this.focusClass = 'password'
      },
      removeClass: function () {
        this.focusClass = ''
      },
      submitForm: function () {
        let username = document.getElementById('username')
        let password = document.getElementById('pwd')
        if (username.value !== '' && password.value !== '') {
          let tmpObj = {type: 'login', userId: username.value, password: password.value}
          this.currentUser.userId = username.value
          this.currentUser.password = password.value
          this.httpServer.emit('handleInfo', tmpObj)
        }
      }
    },
    mounted: function () {
      this.httpServer.on('loginResult', function (res) {
        if (res === 'successful') {
          this.$router.push({path: '/msg'})
        } else {
          let tip = document.getElementById('tip')
          tip.innerText = '请输入正确的用户ID及密码'
        }
      }.bind(this))
    }
  }
</script>
