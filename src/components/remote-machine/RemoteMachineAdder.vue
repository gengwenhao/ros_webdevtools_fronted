<!-- 弹出层：创建机器人连接配置 -->
<template>
  <div class="remote-machine-adder">
    <el-dialog
      center
      title="创建机器人连接配置"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="110px">
        <el-form-item label="配置名称">
          <el-input size="mini" clearable placeholder="请输入配置名称" min="1" max="32"
                    v-model="form.name"
          />
        </el-form-item>

        <el-form-item label="设备IP地址">
          <el-input size="mini" clearable placeholder="请输入网络IP地址" min="1" max="32"
                    v-model="form.ip"
          />
        </el-form-item>

        <el-form-item label="设备端口号">
          <el-input size="mini" clearable placeholder="请输入服务端口号" min="1" max="32"
                    v-model="form.port"
                    @keypress.enter.native="handleConfirm"
          />
        </el-form-item>

        <el-form-item label="SSH端口号">
          <el-input size="mini" clearable placeholder="请输入SSH端口号" min="1" max="32"
                    v-model="form.ssh_port"
                    @keypress.enter.native="handleConfirm"
          />
        </el-form-item>

        <el-form-item label="SSH用户名">
          <el-input size="mini" clearable placeholder="请输入SSH用户名" min="1" max="32"
                    v-model="form.ssh_user"
                    @keypress.enter.native="handleConfirm"
          />
        </el-form-item>

        <el-form-item label="SSH密码">
          <el-input clearable max="32" min="1" placeholder="请输入SSH密码" size="mini" type="password"
                    v-model="form.ssh_password"
                    @keypress.enter.native="handleConfirm"
          />
        </el-form-item>
      </el-form>

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
  name: "RemoteMachineAdder",

  data() {
    return {
      isShow: false,
      form: {
        name: '默认配置',
        ip: 'localhost',
        port: '8888',
        ssh_port: '22',
        ssh_user: 'root',
        ssh_password: ''
      }
    }
  },

  methods: {
    handleConfirm() {
      if (
        isEmptyStr(this.form.name) ||
        isEmptyStr(this.form.ip) ||
        isEmptyStr(this.form.port) ||
        isEmptyStr(this.form.ssh_port) ||
        isEmptyStr(this.form.ssh_user) ||
        isEmptyStr(this.form.ssh_password)
      ) {
        this.$message.warning('请检查信息是否填写完整')
        return -1
      }

      this.$emit('confirm', this.form)

      api.remoteMachine
         .save(this.form, this.$route.query.solutionID)
         .then(res => {
           this.$emit('success', res.data)
           this.isShow = false
         })
         .catch(err => {
           this.$emit('error', err)
         })
    },

    handleOpen() {
      this.form = {
        name: '默认配置',
        ip: 'localhost',
        port: '8888',
        ssh_port: '22',
        ssh_user: 'root',
        ssh_password: ''
      }
    }
  }
}
</script>
