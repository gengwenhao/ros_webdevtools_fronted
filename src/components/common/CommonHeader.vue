<template>
  <div id="common-header">
    <div class="inner-con">
      <div class="title">
        ROS WEB DEVTOOLS
      </div>
      <div class="tools">
<!--        <el-button round type="primary" v-if="!isConnected" @click="isConnected = true">Connect</el-button>-->
<!--        <el-button round icon="el-icon-connection" type="warning" v-else @click="isConnected = false">Connected-->
<!--        </el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      isConnected: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "./src/assets/palette";

#common-header {
  height: 50px;
  //background: $primary-color-dark;
  background: #333333;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 32px;

  .inner-con {
    width: 100%;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    font-weight: bold;
    color: $primary-color-text;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
    }

    .tools {
      margin-left: auto;
    }
  }
}
</style>