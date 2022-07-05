<!-- 弹出层：发送代码 -->
<template>
  <div class="code-sender">
    <el-dialog
      center
      title="请选择生成参数"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="110px">
        <el-form-item label="脚本名称" required>
          <el-input placeholder="输入脚本名称" v-model="name"/>
        </el-form-item>
        <el-form-item label="代码生成模板" required>
          <el-select placeholder="请选择模板" v-model="templateID">
            <el-option
              v-for="item in globalInfo.templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="远程主机" required>
          <el-select placeholder="请选择设备" v-model="remote_machine">
            <el-option
              v-for="item in globalInfo.remoteMachineList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="自动运行">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="display: block"
            v-model="run"
          >
          </el-switch>
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

export default {
  name: "CodeSender",

  data() {
    return {
      isShow: false,
      name: '',
      remote_machine: null,
      templateID: null,
      run: false
    }
  },

  computed: {
    ...mapState(['globalInfo'])
  },

  methods: {
    handleOpen() {
      this.name = ''
      this.remote_machine = null
      this.templateID = null
      this.run = false
    },

    handleConfirm() {

    },
  }
}
</script>
