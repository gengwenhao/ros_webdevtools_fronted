// 检测一段时间用户是否操作，如果用户未移动鼠标则弹出提示窗口
import _ from 'lodash'

const periodConfirmMixin = {
  data() {
    return {
      // 定时器
      logoutTimer: null,
      // 检测时长（默认 30 分钟）
      logoutTimeout: 1000 * 60 * 30
    }
  },

  created() {
    // 设置定时器 30m 触发一次
    this.initSetTimeoutConfirm()

    // 监听全局鼠标移动事件，鼠标移动时重置定时器
    window.addEventListener('mousemove', this.handleMouseMove)
  },

  methods: {
    // 处理弹窗的显示
    handleConfirmPopup() {
      // todo
    },

    // 设置定时器
    initSetTimeoutConfirm() {
      // 定时检测用户是否操作，如果期间用户移动了鼠标定时器会被重置
      this.logoutTimer = setTimeout(() => {
        // 显示弹窗
        this.handleConfirmPopup && this.handleConfirmPopup()

        // 这里不需要重置定时器，因为用户只要点击 “确定” 按钮就会触发鼠标移动事件
        // 全局鼠标移动监听事件自动帮我们完成了定时器重置操作
      }, this.logoutTimeout)
    },

    // 全局订阅鼠标移动事件（节流触发，1s 内最多触发一次）
    handleMouseMove: _.throttle(function () {
      // 清空定时器
      clearTimeout(this.logoutTimer)
      this.logoutTimer = null

      // 重新设置定时器
      this.initSetTimeoutConfirm()
    }, 1000)
  }
}

export default periodConfirmMixin
