<template>
  <div :id="id" class="opening-animation" v-if="isShow">
    <div class="container">
      <div class="inner" :class="{play:isPlay}">
        <img
          alt="logo"
          :src="require('@/assets/robot-line.png')"
          onmousedown="return false;"
        >
        <span>ROS WEV Devtools</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpeningAnimation",

  props: {
    /**
     * 播放延时
     */
    delay: {
      type: Number,
      default: 400
    },
    /**
     * 自动关闭
     */
    autoClose: {
      type: Boolean,
      default: true
    },
    /**
     * 是否播放完成
     */
    hasShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShow: true,
      isPlay: false
    }
  },

  computed: {
    id() {
      return 'opening-animation' + this._uid
    }
  },

  created() {
    this.$nextTick(() => {
      this.isPlay = false
      setTimeout(() => {
        this.isPlay = true
      }, this.delay)

      if (this.autoClose) {
        setTimeout(() => {
          this.isShow = false
          this.$emit('upload:hasShow', true)
        }, this.delay + 3000)
      }
    })
  }
}
</script>

<style scoped lang="scss">
.opening-animation {
  cursor: pointer;

  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .99);
    z-index: 100;
    display: flex;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;

    .inner {
      width: 500px;
      height: 500px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: transparent;
        text-indent: 8px;
        font-size: 30px;
        font-weight: bold;
        transition: .7s;
        transform: translateX(-50px);
      }

      img {
        width: 50px;
        height: 50px;
        margin-top: -12px;
        opacity: 0;
        transform: translateY(-20px);
        transition: .8s;
      }

      &.play {
        img {
          opacity: 1;
          transform: translateY(0);
        }

        span {
          color: #fff;
          transform: translate(0);
        }
      }
    }
  }
}
</style>
