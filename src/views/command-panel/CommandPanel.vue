<template>
  <div id="command-panel">
    <div id="container"></div>
    <button @click="handleWrite">click</button>
  </div>
</template>

<script>
import {Terminal} from 'xterm'
import 'xterm/css/xterm.css'

export default {
  name: "CommandPanel",
  data() {
    return {
      term: null
    }
  },
  methods: {
    handleWrite() {
      this.term.write('hello gengwenhaolorem\n\ngengengegegeg')
    }
  },
  mounted() {
    this.term = new Terminal();
    this.term.open(document.getElementById('container'));
    this.term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  }
}
</script>

<style scoped>

</style>