<!-- 弹出层：编辑模板 -->
<template>
  <div class="code-template-editor">
    <el-dialog
      center
      title="编辑该模板"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-input
        clearable
        max="32"
        min="1"
        placeholder="请输入模板名称"
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
import {isEmptyStr} from '@/lib/tools'
import api from '@/api'

export default {
  name: "CodeTemplateEditor",

  props: {
    templateData: {
      type: Object,
      default: {name: '', content: '{{ PYTHON_ENV }}\n{{ CODE }}'}
    }
  },

  data() {
    return {
      isShow: false,
      // 模板名称
      name: '',
      // 模板代码
      content: '{{ PYTHON_ENV }}\n{{ CODE }}',
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
         .update(form, this.templateData.id)
         .then(res => {
           this.$emit('success', res)
           this.isShow = false
         })
         .catch(err => {
           this.$emit('error', err)
         })
    },

    handleOpen() {
      this.name = this.templateData.name
      this.content = this.templateData.content
    }
  }
}
</script>
