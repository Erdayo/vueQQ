<template>
  <div class="other mt10">
    <h1>敬请期待</h1>
  </div>
</template>

<script>
  export default {
    name: 'other',
    data () {
      return {}
    }
  }
</script>
<style>
  .other{
    position: absolute;
    top: 60px;
    width: 100%;
    text-align: center;
    color: #333;
    transition: .3s linear;
  }
  .other.swipe{
    margin-left: 80%;
  }
</style>
