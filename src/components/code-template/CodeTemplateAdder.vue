<!-- 弹出层：创建模板 -->
<template>
  <div class="code-template-adder">
    <el-dialog
      center
      title="添加新的代码模板"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-input
        clearable
        max="32"
        min="1"
        placeholder="请输入新的模板名称"
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
        v-model="content"
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
  name: "CodeTemplateAdder",

  data() {
    return {
      isShow: false,
      // 模板名称
      name: '',
      // 模板代码
      content: '{{ PYTHON_ENV }}\n{{ CODE }}'
    }
  },

  methods: {
    handleConfirm() {
      if (isEmptyStr(this.name) || isEmptyStr(this.content)) {
        this.$message.warning('请检查模板信息是否完整')
        return -1
      }

      const form = {
        name: this.name,
        content: this.content
      }

      this.$emit('confirm', form)

      api.codeTemplate
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
      this.content = '{{ PYTHON_ENV }}\n{{ CODE }}'
    }
  }
}
</script>

<style scoped>

</style>
