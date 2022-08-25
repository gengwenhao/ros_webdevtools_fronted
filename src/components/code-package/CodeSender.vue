<!-- 弹出层：发送代码 -->
<template>
  <div class="code-sender">
    <el-dialog
      center
      title="请配置代码发送参数"
      width="700px"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-form label-width="150px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="生成脚本的名称" required>
              <div class="control-item">
                <el-input placeholder="输入脚本名称" v-model="name"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="代码依赖的模板" required>
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
            <el-form-item label="接收代码的主机" required>
              <div class="control-item">
                <el-select placeholder="请选择设备" style="width: 100%;" v-model="remote_machine">
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
            <el-form-item label="自动运行脚本">
              <div class="inner-con">
                <span>否</span>
                <el-switch
                  active-color="#409EFF"
                  inactive-color="#ff4949"
                  style="margin: 0 12px;"
                  v-model="run"
                />
                <span>是</span>
              </div>
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
      this.remote_machine = this.globalInfo?.remoteMachineList[0]?.id
      this.templateID = this.globalInfo?.templateList[0]?.id
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
        solutionID: this.$route.params.solutionID || null,
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
