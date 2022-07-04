<template>
  <div id="layout">
    <common-header class="common-header"/>
    <router-view/>
  </div>
</template>

<script>
import CommonHeader from "@/views/layout/components/CommonHeader"

export default {
  name: 'layout',
  components: {CommonHeader}
}
</script>

<style scoped lang="scss">
#layout {
  .common-header {
    width: 100%;
    position: fixed;
    top: 0;
  }

  padding-top: 50px;
}
</style>
