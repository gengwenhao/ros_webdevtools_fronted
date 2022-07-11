<!-- 弹出层：发送代码 -->
<template>
  <div class="code-sender">
    <el-dialog
      center
      title="请配置代码发送参数"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="110px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="脚本名称" required>
              <div class="control-item">
                <el-input placeholder="输入脚本名称" v-model="name"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="代码生成模板" required>
              <div class="control-item">
                <el-select placeholder="请选择模板" v-model="templateID">
                  <el-option
                    v-for="item in globalInfo.templateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="远程主机" required>
              <div class="control-item">
                <el-select placeholder="请选择设备" v-model="remote_machine">
                  <el-option
                    v-for="item in globalInfo.remoteMachineList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="自动运行">
              <el-switch
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="display: block"
                v-model="run"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
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
import {isEmptyStr} from '@/lib/tools'

export default {
  name: "CodeSender",

  props: {
    code: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isShow: false,
      name: '',
      remote_machine: null,
      templateID: null,
      run: true
    }
  },

  computed: {
    ...mapState(['globalInfo'])
  },

  methods: {
    handleOpen() {
      this.name = ''
      this.remote_machine = this.globalInfo.remoteMachineList[0].id || null
      this.templateID = this.globalInfo.templateList[0].id || null
      this.run = true
    },

    handleConfirm() {
      if (isEmptyStr(this.name)) {
        this.$message.warning('请检查生成的脚本名称')
        return -1
      }


      const form = {
        name: this.name,
        remote_machine: this.remote_machine,
        templateID: this.templateID,
        run: this.run,
        solutionID: this.$route.query.solutionID || null,
        code: this.code
      }

      api.commonAPI
         .sendCode(form)
         .then(({data}) => {
           if (data.status) {
             switch (data.status) {
               case 400:
                 this.$emit('error', data.result)
                 break
               case 200:
                 this.$emit('success', data.result)
                 this.isShow = true
                 break
             }
           } else {
             this.$emit('error', '发送失败!')
           }
         })
    },
  }
}
</script>

<style scoped lang="scss">
.code-sender {
  .control-item {
    width: 100%;

    .el-select {
      width: 100%;
    }
  }
}
</style>
