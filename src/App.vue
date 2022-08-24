<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  created() {
    this.$shortcut.bind('ctrl+alt+home', () => {
      this.$router.push({name: 'home'})
    })
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
}

// 在 el 组件上使用 iconfont 图标所做的样式微调
[class*=" el-"], [class^=el] {
  [class*=" icon-"], [class^=icon-] {
    font-size: inherit;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
