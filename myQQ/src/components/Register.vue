<template>
  <div class="register">
    <div id="owl-login" :class="focusClass">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
    </div>
    <div class="login-form">
      <input id="username" type="text" name="username" placeholder="请输入用户名" autocomplete="off"
             @keyup.enter="submitForm()">
      <p id="tip"></p>
      <input id="pwd" type="password" name="pwd" placeholder="请输入密码" @focus="addClass()" @blur="removeClass()"
             @keyup.enter="submitForm()">
      <div class="opt">
        <button id="submit" @click="submitForm()">注册</button>
        <router-link to="/login">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
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
          let tmpObj = {type: 'register', username: username.value, password: password.value}
          this.httpServer.emit('handleInfo', tmpObj)
        }
      }
    },
    mounted: function () {
      this.httpServer.on('registerResult', function (userId) {
        alert('请牢记您的登录ID: ' + userId)
        this.$router.push({path: '/login'})
      }.bind(this))
    }
  }
</script>
