<!-- 弹出层：代码打包 -->
<template>
  <div class="code-packager">
    <el-dialog
      center
      title="请选择生成参数"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="110px">
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
      api.commonAPI
         .generateCode({templateID: this.templateID, code: this.code})
         .then(res => {
           this.$emit('success', res.data)
         })
         .catch(err => {
           this.$emit('error', err)
         })
    }
  }
}
</script>
