<template>
  <div id="dev-panel">
    <!-- 按钮组 -->
    <div class="icon-group-con">
      <div class="icon-group">
        <div class="icon-con" @click="$refs['code-template-lister'].isShow = true">
          <el-badge :value="globalInfo.templateCnt">
            <el-tooltip class="item" effect="dark" content="新建代码生成模板" placement="bottom-start">
              <i class="iconfont icon-template"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="$refs['defined-block-lister'].isShow = true">
          <el-badge :value="globalInfo.blocklyFunctionCnt">
            <el-tooltip class="item" effect="dark" content="新建自定义函数" placement="bottom-start">
              <i class="iconfont icon-chuangjianjiedian"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="$refs['remote-machine-lister'].isShow = true">
          <el-badge :value="globalInfo.remoteMachineCnt">
            <el-tooltip class="item" effect="dark" content="新建机器人连接配置" placement="bottom-start">
              <i class="iconfont icon-jiqiren"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="updateSolution">
          <el-tooltip class="item" effect="dark" content="保存代码" placement="bottom-start">
            <i class="iconfont icon-baocun"></i>
          </el-tooltip>
        </div>

        <div class="icon-con" @click="$refs['code-packager'].isShow = true">
          <el-tooltip class="item" effect="dark" content="打包代码" placement="bottom-start">
            <i class="iconfont icon-dabaoxiazai"></i>
          </el-tooltip>
        </div>

        <div class="icon-con" @click="$refs['code-sender'].isShow = true">
          <el-tooltip class="item" effect="dark" content="发送代码" placement="bottom-start">
            <i class="iconfont icon-icon_sent"></i>
          </el-tooltip>
        </div>

      </div>

      <div class="icon-group">

      </div>
    </div>

    <!-- 面板 -->
    <div class="main-panel">
      <!-- blockly显示区 -->
      <div id="blocklyDiv"></div>
      <!-- 工具箱中 -->
    </div>


    <!--  弹出层：自定义函数列表  -->
    <defined-block-lister
      ref="defined-block-lister"/>

    <!--  弹出层：代码模板列表  -->
    <code-template-lister
      ref="code-template-lister"/>

    <!-- 弹出层：机器人列表 -->
    <remote-machine-lister
      ref="remote-machine-lister"/>

    <!-- 弹出层：代码发送 -->
    <code-sender
      ref="convertedCode-sender"
    />

    <!-- 弹出层：代码打包 -->
    <code-packager
      ref="convertedCode-packager"
      :code="convertedCode"
    />

  </div>
</template>

<script>
import 'blockly/python'
import _ from 'lodash'
import Blockly from 'blockly'
import {mapState} from 'vuex'

import api from '@/api'
import lib from '@/lib'
import config from '@/config'
import JsFileDownloader from 'js-file-downloader'
import CodeTemplateLister from '@/components/code-template/CodeTemplateLister'
import DefinedBlockLister from '@/components/defined-block/DefinedBlockLister'
import RemoteMachineLister from '@/components/remote-machine/RemoteMachineLister'
import CodeSender from '@/components/code-package/CodeSender'
import CodePackager from '@/components/code-package/CodePackager'


export default {
  name: "DevPanel",

  components: {CodePackager, CodeSender, RemoteMachineLister, DefinedBlockLister, CodeTemplateLister},

  data() {
    return {
      //  Blockly 库相关
      // Blockly 工作空间实例
      blocklyWorkSpaceIns: null,
      // Blockly 将图形转换成的python代码
      convertedCode: null,
      // Blockly 工具箱配置
      toolbox: config.blockly.DEFAULT_TOOLBOX_SETTINGS,
      // Blockly 其他配置
      optOptions: config.blockly.DEFAULT_OPT_OPTIONS,
      // 自动保存项目的定时器
      autoSaveSolutionTimer: null,
      remoteMachineForm: {
        name: '默认配置',
        ip: 'localhost',
        port: '8888',
        ssh_port: '22',
        ssh_user: 'root',
        ssh_password: ''
      }
    }
  },

  computed: {
    ...mapState(['globalInfo'])
  },

  methods: {
    // 初始化 blockly 工作空间
    initBlocklyWS() {
      // 清空工具箱
      this.toolbox.contents[1].contents = []
      this.globalInfo.blockList.forEach(data => {
        // 将自定义函数加入toolbox中
        this.toolbox.contents[1].contents.push({
          kind: 'block',
          type: data.name
        })

        // 创建自定义块的代码生成器
        Blockly.Python[data.name] = function () {
          return data.code + '\r\n' || ''
        }

        // 导入自定义块
        Blockly.Blocks[data.name] = {
          init: function () {
            this.appendDummyInput()
                .appendField(data.name)
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(230)
            this.setTooltip(data.name)
            this.setHelpUrl(data.name)
          }
        }
      })

      if (this.blocklyWorkSpaceIns) {
        console.log('update toolbox')
        this.blocklyWorkSpaceIns.updateToolbox(this.toolbox)
      } else {
        // init workspace instance
        this.blocklyWorkSpaceIns = Blockly.inject('blocklyDiv', {
          toolbox: this.toolbox,
          ...this.optOptions
        })

        // bind event
        this.blocklyWorkSpaceIns.addChangeListener(() => {
          this.convertedCode = Blockly.Python.workspaceToCode(this.blocklyWorkSpaceIns)
        })
      }

      return this.blocklyWorkSpaceIns
    },

    // 更新页面初始数据
    fetchGlobalData() {
      // 加载全局信息
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
      this.$nextTick(() => {
        this.initBlocklyWS()
      })
    },

    // 更新解决方案
    updateSolution: _.debounce(function () {
      if (lib.isEmptyStr(this.convertedCode)) {
        return -1
      }

      api.solution.update({
        code: lib.getBlocklyXMLText(this.blocklyWorkSpaceIns),
        object_code: this.convertedCode
      }, this.$route.query.solutionID).then(res => {
        this.$message.success('保存成功')
      })
    }, 1000),

    // 自动更新解决方案
    updateSolutionAuto() {
      if (lib.isEmptyStr(this.convertedCode)) {
        return -1
      }

      api.solution.update({
        code: lib.getBlocklyXMLText(this.blocklyWorkSpaceIns),
        object_code: this.convertedCode
      }, this.$route.query.solutionID).then(res => {
        this.$message.success('项目被自动保存')
      })
    },

    // 加载解决方案
    loadSolution() {
      api.solution.get({}, this.$route.query.solutionID)
         .then(res => {
           this.isShowOpenProjectPanel = false
           this.isLoading = true
           lib.clearBlocklyWorkspace(this.blocklyWorkSpaceIns)
           setTimeout(() => {
             this.isLoading = false
             lib.blocklyXMLToDOM(res.data.code, this.blocklyWorkSpaceIns)
             this.$message.success('导入成功')
           }, 400)
         })
    },

    // 清空工作区事件
    handleClearWorkspace() {
      this.$confirm('是否清空工作环境？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        lib.clearBlocklyWorkspace(this.blocklyWorkSpaceIns)
      })
    },

    // 发送代码确认事件
    handleConfirmSendCode() {
      if (!this.convertedCode) {
        this.$message.error('空的工作空间无法生成代码')
        return -1
      }

      if (lib.isEmptyStr(this.codeSenderForm.name)) {
        this.$message.warning('请检查脚本名称')
        return -1
      } else if (!this.codeSenderForm.templateID) {
        this.$message.warning('请检查选择的模板')
        return -1
      } else if (!this.codeSenderForm.remote_machine) {
        this.$message.warning('请检查远程机器')
        return -1
      }

      this.$message.warning(`连接主机中`)
      const form = Object.assign({
        code: this.convertedCode,
        solutionID: this.$route.query.solutionID
      }, this.codeSenderForm)
      api.commonAPI.sendCode(form)
         .then(({data}) => {
           switch (data.status) {
             case 200:
               this.$toast.success(data.result || '发送成功')
               break
             default:
               this.$message.error(data.result || '')
               break
           }
           this.codeSenderForm = {
             templateID: null,
             remote_machine: null,
             run: true
           }
           this.isShowSendCodePanel = false
         })
         .catch(err => {
           this.codeSenderForm = {
             templateID: null,
             remote_machine: null,
             run: true
           }
           this.isShowSendCodePanel = false
         })
    },

    // 生成代码确认事件
    handleConfirmGenerateCode() {
      if (!this.convertedCode) {
        this.$message.error('空的工作空间无法生成代码')
        return -1
      }

      const form = Object.assign({code: this.convertedCode}, this.templateAdderForm)
      api.commonAPI.generateCode(form)
         .then(res => {
           if (res.data.timestamp) {
             this.$toast.success('代码生成完毕')
             this.isShowPackagerPanel = false

             // download file
             setTimeout(() => {
               new JsFileDownloader({
                 url: api.commonAPI.generateCodeURL(res.data.timestamp),
                 filename: `${res.data.timestamp}-results.py`
               }).then(() => {
               })
             }, 1000)

           }
         })
    }
  },

  created() {
    this.loadSolution()
    this.fetchGlobalData()
    this.autoSaveSolutionTimer = setInterval(() => {
      this.updateSolutionAuto()
    }, 1000 * 60 * 2) // 2分钟自动保存一次
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {

      // 检查路由传入的 solutionID 是否合法
      if (vm.$route.query.solutionID) {
        api.solution.get({}, vm.$route.query.solutionID).catch(err => {
          vm.$router.push({name: '404'})
        })
      } else {
        vm.$router.push({name: '404'})
      }

    })
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/palette";

#dev-panel {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  min-width: 1024px;
  width: 100%;
  min-height: calc(100vh - 50px);
  color: $primary-color-dark;

  // 按钮组容器
  .icon-group-con {
    box-sizing: border-box;
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    // 按钮组
    .icon-group {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      .icon-con {
        margin: 8px 10px;
        cursor: pointer;

        i.iconfont {
          font-size: 38px;
          color: $secondary-text-color;

          &.icon-quxiaobofang {
            color: $accent-color
          }

          &.icon-bofang1 {
            color: $accent-color;
          }
        }
      }

    }
  }

  // 主面板
  .main-panel {
    width: 100vw;
    height: calc(100vh - 130px);

    #blocklyDiv {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
