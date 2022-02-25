<template>
  <div id="home">
    <div class="con">
      <div class="left-panel" @click="$router.push({name:'DevPanel'})">
        <img src="" alt="">
        <div class="wrapper">
          DEVELOPMENT
        </div>
      </div>
      <div class="left-panel" @click="dialogVisible = true">
        <div class="wrapper">
          INTRODUCTION
        </div>
      </div>
    </div>

    <el-dialog title="原理图"
               width="1088px"
               :visible.sync="dialogVisible">
      <div class="dia-con">
        <img ondragstart="return false;" src="@/assets/ROS图形化编程原理图.png" alt="ROS图形化编程原理图">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/palette";

#home {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  .con {
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    padding: 80px;
  }

  .left-panel {
    position: relative;
    width: calc(50% - 40px);
    height: calc(100vh - 40px);
    max-width: 450px;
    max-height: 450px;
    color: $primary-color-text;
    cursor: pointer;
    border-radius: 13px;
    background: transparent;
    box-shadow: 50px 50px 100px #c7c7c7,
    -50px -50px 100px #f9f9f9;
    transition: .1s;

    &:hover {
      transform: translateY(-2%);
    }
  }

  .right-panel {
    position: relative;
    width: 50%;
    height: calc(100vh - 40px);
    max-width: 300px;
    max-height: 300px;
    cursor: pointer;
    border-radius: 50px;
    border: 1px solid $primary-color;
    //box-shadow: 20px 20px 60px #bebebe,
    //-20px -20px 60px #ffffff;
    transition: .1s;

    &:hover {
      border-radius: 50px;
      box-shadow: 20px 20px 60px #bebebe,
      -20px -20px 60px #ffffff;
    }
  }

  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: $secondary-text-color;
  }

  .dia-con {
    img {
      display: block;
      max-width: 1024px;
      height: auto;
      margin: 0 auto;
    }
  }
}
</style>