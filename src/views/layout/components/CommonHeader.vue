<template>
  <div id="common-header">
    <div class="inner-con">
      <div class="logo">
        <img src="@/assets/robot-line.png" alt="robot-line"/>
      </div>
      <div class="title" @click="$router.push({name: 'solutionList'})">
        ROS WEB DEVTOOLS
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
@import "../../../assets/palette";

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
    width: 190px;
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

    .logo {
      height: 50px;
      line-height: 50px;
      width: auto;

      img {
        width: auto;
        height: 30px;
        margin-top: 8px;
      }
    }

    .title {
      display: flex;
      align-items: center;
      text-indent: 12px;
    }

    .tools {
      margin-left: auto;
    }
  }
}
</style>
