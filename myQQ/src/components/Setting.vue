<template>
  <div class="setting mt10">
    setting
  </div>
</template>

<script>
  export default {
    name: 'setting',
    props: ['currentData'],
    data () {
      return {}
    }
  }
</script>
<style>
  .setting{
    position: absolute;
    width: 100%;
    top: 60px;
    transition: .3s linear;
  }
  .setting.swipe{
    margin-left: 80%;
  }
</style>
