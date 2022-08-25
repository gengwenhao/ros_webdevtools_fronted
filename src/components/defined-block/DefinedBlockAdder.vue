<!-- 弹出层：创建自定义函数 -->
<template>
  <div class="defined-block-adder">
    <el-dialog
      center
      title="添加新的自定义函数"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-input
        clearable
        max="32"
        min="1"
        placeholder="请输入函数名称"
        size="mini"
        style="margin-bottom: 4px"
        v-model="name"
        @keypress.enter.native="handleConfirm"
      />

      <el-input
        placeholder="请输入代码"
        size="mini"
        type="textarea"
        :rows="8"
        v-model="code"
      />

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import {isEmptyStr} from '@/lib/tools'

export default {
  name: "DefinedBlockAdder",

  data() {
    return {
      isShow: false,
      // 函数名
      name: '',
      // 自定义函数代码
      code: null
    }
  },

  methods: {
    handleConfirm() {
      if (isEmptyStr(this.name) || isEmptyStr(this.code)) {
        this.$message('请检查模块信息是否完整')
        return -1
      }

      const form = {
        name: this.name,
        code: this.code
      }

      this.$emit('confirm', form)

      api.definedBlock
         .save(form, this.$route.params.solutionID)
         .then(res => {
           this.$emit('success', res.data)
           this.isShow = false
         })
         .catch(err => {
           this.$emit('error', err)
         })
    },

    handleOpen() {
      this.name = ''
      this.code = null
    }
  }
}
</script>

<style scoped>

</style>
