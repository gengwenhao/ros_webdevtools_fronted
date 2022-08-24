<!-- 弹出层：代码打包 -->
<template>
  <div class="code-packager">
    <el-dialog
      center
      title="请配置代码打包参数"
      width="600px"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="110px">
        <div class="control-item">
          <el-form-item label="代码生成模板">
            <el-select placeholder="请选择模板" v-model="templateID">
              <el-option
                v-for="item in globalInfo.templateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import api from '@/api'
import commonElTable from '@/mixins/common-el-table'

export default {
  name: "CodePackager",

  mixins: [commonElTable],

  props: ['code'],

  data() {
    return {
      isShow: false,
      templateID: null,
    }
  },

  computed: {
    ...mapState(['globalInfo'])
  },

  methods: {
    handleConfirm() {
      if (!this.code) {
        this.$message.warning('空的工作空间无法生成代码，请至少添加一个图形模块')
        return -1
      }

      if (this.globalInfo.templateList.length === 0) {
        this.$message.warning('暂无可用的模板，请至少配置一个模板用于生成代码')
        return -1
      }

      if (!this.code) {
        this.$message.warning('前检查所使用的的模板')
        return -1
      }

      api.commonAPI
         .generateCode({templateID: this.templateID, code: this.code})
         .then(res => {
           this.$emit('success', res.data)
           this.isShow = false
         })
         .catch(err => {
           this.$emit('error', err)
         })
    },

    handleOpen() {
      this.templateID = this.globalInfo?.templateList[0]?.id
    }
  }
}
</script>

<style scoped lang="scss">
.code-packager {
  .control-item {
    width: 100%;

    .el-select {
      width: 100%;
    }
  }
}
</style>
