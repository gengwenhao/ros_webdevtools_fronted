<template>
  <div id="command-panel" ref="container">
  </div>
</template>

<script>
import {Terminal} from 'xterm'
import 'xterm/dist/xterm.css'

export default {
  name: "CommandPanel",
  data() {
    return {
      term: null,
      socket: null,
      socketURI: `ws://localhost:8000/ssh?id=${this.$route.query.id}`
    }
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close()
    }

    if (this.term) {
      this.term.dispose()
    }
  },
  methods: {
    initTerm() {
      this.term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })

      this.term.open(this.$refs.container)
      this.term.focus()

      /*
      * status 为 0 时, 将用户输入的数据通过 websocket 传递给后台, data 为传递的数据, 忽略 cols 和 rows 参数
      * status 为 1 时, resize pty ssh 终端大小, cols 为每行显示的最大字数, rows 为每列显示的最大字数, 忽略 data 参数
      */
      let message = {'status': 0, 'data': null, 'cols': null, 'rows': null};

      // 向服务器端发送数据
      this.term.onData((data) => {
        message['status'] = 0
        message['data'] = data
        const send_data = JSON.stringify(message)
        this.socket.send(send_data)
      })
    },
    initSocket() {
      if (!'WebSocket' in window) {
        this.$message.error('浏览器不支持websocket协议')
        return -1
      }

      this.socket = new WebSocket(this.socketURI)
      this.socket.binaryType = "arraybuffer"

      this.socket.onopen = () => {
        this.initTerm()
      }

      // 读取服务器端发送的数据并写入 web 终端
      this.socket.onmessage = (recv) => {
        if (typeof (recv.data) === 'string') {
          let data = JSON.parse(recv.data);
          let message = data.message;
          let status = data.status;
          if (status === 0) {
            this.term.write(message)
          } else {
            this.term.write(message);
          }
        }
      }
    }
  }
}
</script>