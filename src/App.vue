<template>
  <div id="app">
    <common-header class="common-header"/>
    <router-view/>
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader"

export default {
  components: {CommonHeader}
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .common-header {
    width: 100%;
    position: fixed;
    top: 0;
  }

  padding-top: 50px;
}

</style>
