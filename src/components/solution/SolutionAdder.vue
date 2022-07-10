<template>
  <div class="solution-adder">
    <el-dialog
      center
      title="创建新的解决方案"
      :visible.sync="isShow"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-input
        autofocus
        clearable
        max="32"
        min="1"
        placeholder="请输入解决方案名称"
        ref="input-solution-name"
        size="mini"
        style="margin-bottom: 4px"
        v-model="newSolutionName"
        @keypress.enter.native="handleSolutionAdderConfirm"
      />
      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="handleSolutionAdderCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSolutionAdderConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import lib from '@/lib'
import api from '@/api'
import _ from 'lodash'

export default {
  name: "SolutionAdder",

  data() {
    return {
      isShow: false,
      newSolutionName: ''
    }
  },

  methods: {
    handleSolutionAdderConfirm: _.debounce(function () {
      if (lib.isEmptyStr(this.newSolutionName)) {
        return -1
      }

      this.$emit('confirm')
      api.solution
         .save({title: this.newSolutionName})
         .then(res => {
           this.$emit('success', res)
           this.isShow = false
           this.newSolutionName = ''
         })
         .catch(err => {
           const errData = err.response.data || {}
           const errMsg = Object.keys(errData).map(key => errData[key]).join()
           this.$emit('error', errMsg)
         })
    }, 300),

    handleSolutionAdderCancel() {
      this.isShow = false
    },

    handleOpen() {
      this.$nextTick(() => {
        this.$refs['input-solution-name'].$el.querySelector('input').focus()
      })
    },

    handleClose() {
      this.isShow = false
      this.newSolutionName = ''
    }
  }
}
</script>
