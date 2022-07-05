<template>
  <div id="dev-panel" v-loading="isLoading">
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

        <div class="icon-con" @click="isShowFunctionCodeListPanel = true">
          <el-badge :value="globalInfo.blocklyFunctionCnt">
            <el-tooltip class="item" effect="dark" content="新建自定义函数" placement="bottom-start">
              <i class="iconfont icon-chuangjianjiedian"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="isShowRemoteMachineListPanel = true">
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

        <div class="icon-con" @click="isShowPackagerPanel = true">
          <el-tooltip class="item" effect="dark" content="生成代码" placement="bottom-start">
            <i class="iconfont icon-dabaoxiazai"></i>
          </el-tooltip>
        </div>

        <div class="icon-con" @click="isShowSendCodePanel = true">
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

    <!-- 创建机器人连接配置面板 -->
    <el-dialog center title="创建机器人连接配置" :visible.sync="isShowRemoteMachineAdder">
      <el-form ref="form" :model="remoteMachineForm" label-width="110px">
        <el-form-item label="配置名称">
          <el-input size="mini" clearable placeholder="请输入配置名称" min="1" max="32" v-model="remoteMachineForm.name"/>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input size="mini" clearable placeholder="请输入IP地址" min="1" max="32" v-model="remoteMachineForm.ip"/>
        </el-form-item>
        <el-form-item label="端口号">
          <el-input size="mini" clearable placeholder="请输入端口号" min="1" max="32" v-model="remoteMachineForm.port"
                    @keypress.enter.native="handleConfirmRemoteMachineAdder"/>
        </el-form-item>
        <el-form-item label="SSH端口号">
          <el-input size="mini" clearable placeholder="请输入SSH端口号" min="1" max="32" v-model="remoteMachineForm.ssh_port"
                    @keypress.enter.native="handleConfirmRemoteMachineAdder"/>
        </el-form-item>
        <el-form-item label="SSH用户名">
          <el-input size="mini" clearable placeholder="请输入SSH用户名" min="1" max="32" v-model="remoteMachineForm.ssh_user"
                    @keypress.enter.native="handleConfirmRemoteMachineAdder"/>
        </el-form-item>
        <el-form-item label="SSH密码">
          <el-input size="mini" clearable type="password" placeholder="请输入SSH密码" min="1" max="32"
                    v-model="remoteMachineForm.ssh_password"
                    @keypress.enter.native="handleConfirmRemoteMachineAdder"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelRemoteMachineAdder">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmRemoteMachineAdder">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 创建自定义函数面板 -->
    <el-dialog center title="创建自定义函数" :visible.sync="isShowFunctionCodeAdder">
      <el-input size="mini" clearable placeholder="请输入函数名称" min="1" max="32" style="margin-bottom: 4px"
                v-model="functionName"
                @keypress.enter.native="handleConfirmFunctionCodeAdder"/>
      <el-input size="mini" type="textarea" :rows="8" placeholder="请输入代码" v-model="functionCode"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelFunctionCodeAdder">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmFunctionCodeAdder">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑机器人连接配置面板 -->
    <el-dialog center title="编辑机器人连接配置" :visible.sync="isShowRemoteMachineEditor">
      <el-form ref="form" label-width="110px">
        <el-form-item label="配置名称">
          <el-input size="mini" clearable placeholder="请输入配置名称" min="1" max="32"
                    v-model="currentRemoteMachineName"/>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input size="mini" clearable placeholder="请输入IP地址" min="1" max="32"
                    v-model="currentRemoteMachineIP"/>
        </el-form-item>
        <el-form-item label="端口号">
          <el-input size="mini" clearable placeholder="请输入端口号" min="1" max="32"
                    v-model="currentRemoteMachinePort"
                    @keypress.enter.native="handleConfirmRemoteMachineEditor"/>
        </el-form-item>
        <el-form-item label="SSH端口号">
          <el-input size="mini" clearable placeholder="请输入SSH端口号" min="1" max="32"
                    v-model="currentRemoteSSHPort"
                    @keypress.enter.native="handleConfirmRemoteMachineEditor"/>
        </el-form-item>
        <el-form-item label="SSH用户名">
          <el-input size="mini" clearable placeholder="请输入SSH用户名" min="1" max="32"
                    v-model="currentRemoteSSHUser"
                    @keypress.enter.native="handleConfirmRemoteMachineEditor"/>
        </el-form-item>
        <el-form-item label="SSH密码">
          <el-input size="mini" clearable type="password" placeholder="请输入SSH密码" min="1" max="32"
                    v-model="currentRemoteSSHPassword"
                    @keypress.enter.native="handleConfirmRemoteMachineEditor"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelRemoteMachineEditor">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmRemoteMachineEditor">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑自定义函数面板 -->
    <el-dialog center title="编辑函数" :visible.sync="isShowFunctionCodeEditor">
      <el-input size="mini" clearable placeholder="请输入函数名称" min="1" max="32" style="margin-bottom: 4px"
                v-model="functionName"
                @keypress.enter.native="handleConfirmFunctionCodeEditor"/>
      <el-input size="mini" type="textarea" :rows="8" placeholder="请输入代码" v-model="functionCode"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelFunctionCodeEditor">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmFunctionCodeEditor">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发送代码对话框 -->
    <el-dialog center title="请选择生成参数" :visible.sync="isShowSendCodePanel">
      <el-form ref="form" :model="codeSenderForm" :inline="true" label-width="110px">
        <el-form-item label="脚本名称" required>
          <el-input placeholder="输入脚本名称" v-model="codeSenderForm.name"/>
        </el-form-item>
        <el-form-item label="代码生成模板" required>
          <el-select placeholder="请选择模板" v-model="codeSenderForm.templateID">
            <div v-if="allTemplateList && allTemplateList.length > 0">
              <el-option v-for="(item, idx) in allTemplateList" :key="item.id"
                         :label="item.name"
                         :value="item.id"/>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="远程主机" required>
          <el-select placeholder="请选择设备" v-model="codeSenderForm.remote_machine">
            <div v-if="allRemoteMachineList && allRemoteMachineList.length > 0">
              <el-option v-for="(item, idx) in allRemoteMachineList" :key="item.id"
                         :label="item.name"
                         :value="item.id"/>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="自动运行">
          <el-switch style="display: block"
                     v-model="codeSenderForm.run"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSendCodePanel = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmSendCode">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 生成代码对话框 -->
    <el-dialog center title="请选择生成参数" :visible.sync="isShowPackagerPanel">
      <el-form ref="form" :model="templateAdderForm" label-width="110px">
        <el-form-item label="代码生成模板">
          <el-select placeholder="请选择模板" v-model="templateAdderForm.templateID">
            <div v-if="allTemplateList && allTemplateList.length > 0">
              <el-option v-for="(item, idx) in allTemplateList" :key="item.id"
                         :label="item.name"
                         :value="item.id"/>
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowPackagerPanel = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmGenerateCode">确 定</el-button>
      </span>
    </el-dialog>

    <!--  机器人连接配置列表  -->
    <el-dialog center title="机器人连接配置列表" :visible.sync="isShowRemoteMachineListPanel">
      <el-button style="margin-bottom: 23px" type="primary" icon="el-icon-plus"
                 @click="isShowRemoteMachineAdder = true">添加新机器人连接配置
      </el-button>
      <el-table :data="remoteMachineTableForm.results" style="width: 100%;max-height: 400px;overflow-y: auto">
        <el-table-column prop="name" align="center" label="机器人名称"/>
        <el-table-column prop="ip" align="center" label="IP"/>
        <el-table-column prop="port" align="center" label="端口"/>
        <el-table-column prop="add_time" align="center" label="添加时间"/>
        <el-table-column prop="update_time" align="center" label="更新时间"/>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleOpenTerm(scope.row)">连接SSH</el-button>
            <el-button type="primary" @click="handleEditRemoteMachine(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDeleteRemoteMachine(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next, jumper"
                     style="margin-top: 12px;"
                     :current-page="remoteMachineTableForm.page"
                     :total="remoteMachineTableForm.count"
                     :page-size="5"
                     @current-change="handleRemoteMachineTablePageChanged"/>
    </el-dialog>

    <!--  自定义函数列表  -->
    <el-dialog center title="自定义函数列表" :visible.sync="isShowFunctionCodeListPanel">
      <el-button style="margin-bottom: 23px" type="primary" icon="el-icon-plus"
                 @click="isShowFunctionCodeAdder = true">添加自定义函数
      </el-button>
      <el-table :data="functionTableForm.results" style="width: 100%;max-height: 400px;overflow-y: auto">
        <el-table-column prop="name" align="center" label="函数名称"/>
        <el-table-column prop="add_time" align="center" label="添加时间"/>
        <el-table-column prop="update_time" align="center" label="更新时间"/>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEditFunctionCode(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDeleteFunctionCode(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next, jumper"
                     style="margin-top: 12px;"
                     :current-page="functionTableForm.page"
                     :total="functionTableForm.count"
                     :page-size="5"
                     @current-change="handleFunctionTablePageChanged"/>
    </el-dialog>

    <!--  弹出层：代码模板列表  -->
    <code-template-lister
      ref="code-template-lister"/>

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


export default {
  name: "DevPanel",

  components: {CodeTemplateLister},

  data() {
    return {
      //  Blockly 库相关
      // Blockly 工作空间实例
      blocklyWorkSpaceIns: null,
      // Blockly 将图形转换成的python代码
      code: null,
      // Blockly 工具箱配置
      toolbox: config.blockly.DEFAULT_TOOLBOX_SETTINGS,
      // Blockly 其他配置
      optOptions: config.blockly.DEFAULT_OPT_OPTIONS,
      // 自动保存项目的定时器
      autoSaveSolutionTimer: null,

      // 远程主机列表
      allRemoteMachineList: [],
      // 模板列表
      allTemplateList: [],
      currentEditedFunction: null,
      currentEditedTemplate: null,
      currentEditedRemoteMachine: null,
      // 自定义函数
      functionCodeList: [],
      allFunctionCodeList: [],
      // form
      projectTableForm: {
        page: 1,
        count: 0,
        results: []
      },
      templateAdderForm: {
        templateID: null
      },
      codeSenderForm: {
        templateID: null,
        remote_machine: null,
        run: true,
        name: null
      },
      remoteMachineForm: {
        name: '默认配置',
        ip: 'localhost',
        port: '8888',
        ssh_port: '22',
        ssh_user: 'root',
        ssh_password: ''
      },
      functionTableForm: {
        page: 1,
        count: 1,
        results: []
      },
      remoteMachineTableForm: {
        page: 1,
        count: 0,
        results: []
      },
      // loading flag
      isLoading: false,
      isTemplateSearchLoading: false,
      // show flag
      isShowInputProjectTitle: false,
      isShowRemoteMachineAdder: false,
      isShowRemoteMachineEditor: false,
      isShowFunctionCodeAdder: false,
      isShowFunctionCodeEditor: false,
      isShowFunctionCodeListPanel: false,
      isShowRemoteMachineListPanel: false,
      isShowPackagerPanel: false,
      isShowSendCodePanel: false,
      isShowOpenProjectPanel: false,
      // 自定义函数代码
      functionCode: null,
      // 函数名
      functionName: '',
      // 当前编辑的机器人信息
      currentRemoteMachineName: '',
      currentRemoteMachineIP: '',
      currentRemoteMachinePort: '',
      currentRemoteSSHPort: '',
      currentRemoteSSHUser: '',
      currentRemoteSSHPassword: '',
    }
  },

  computed: {
    ...mapState(['globalInfo']),
    queryProjectParams() {
      const form = {...this.projectTableForm}
      form.solutionID = this.$route.query.solutionID
      delete form.results
      delete form.previous
      delete form.next
      delete form.count

      return form
    },
    queryFunctionParams() {
      const form = {...this.functionTableForm}
      form.solutionID = this.$route.query.solutionID
      delete form.results
      delete form.previous
      delete form.next
      delete form.count

      return form
    },
    queryRemoteMachineParams() {
      const form = {...this.remoteMachineTableForm}
      form.solutionID = this.$route.query.solutionID
      delete form.results
      delete form.previous
      delete form.next
      delete form.count

      return form
    }
  },
  watch: {
    isShowRemoteMachineListPanel(val) {
      if (val === true) {
        this.remoteMachineTableForm.page = 1
        api.remoteMachine.list(this.queryRemoteMachineParams)
           .then(res => {
             this.remoteMachineTableForm.count = res.data.count
             this.remoteMachineTableForm.results = res.data.results
           })
           .catch(() => {
             this.remoteMachineTableForm.results = []
           })
      }
    },
    isShowOpenProjectPanel(val) {
      if (val === true) {
        this.projectTableForm.page = 1
        api.solution.list(this.queryProjectParams)
           .then(res => {
             this.projectTableForm.count = res.data.count
             this.projectTableForm.results = res.data.results
           })
           .catch(() => {
             this.projectTableForm.results = []
           })
      }
    },
    isShowFunctionCodeListPanel(val) {
      if (val === true) {
        this.functionTableForm.page = 1
        api.definedBlock.list(this.queryFunctionParams)
           .then(res => {
             this.functionTableForm.count = res.data.count
             this.functionTableForm.results = res.data.results
           })
           .catch(() => {
             this.functionTableForm.results = []
           })
      }
    }
  },
  methods: {
    printInfo(data) {
      console.log(data)
    },
    handleOpenTerm(data) {
      // this.$router.push({name: 'commandPanel', query: {solutionID: this.$route.query.solutionID}})
      window.open(`/command-panel?id=${data.id}`, '_blank')
    },
    // 初始化 blockly 工作空间
    initBlocklyWS() {
      // 清空工具箱
      this.toolbox.contents[1].contents = []
      this.allFunctionCodeList.forEach(data => {
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
          this.code = Blockly.Python.workspaceToCode(this.blocklyWorkSpaceIns)
        })
      }

      return this.blocklyWorkSpaceIns
    },
    // 更新页面初始数据
    updateInitInfo() {
      // 加载面板信息
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})

      // 加载自定义函数
      api.definedBlock.list({
        page: 1,
        page_size: config.devPanel.DEFAULT_USER_DEFINED_BLOCKS_NUMBER,
        solutionID: this.$route.query.solutionID
      }).then(res => {
        this.allFunctionCodeList = res.data.results
        this.initBlocklyWS()
      })

      // 加载自定义模板
      api.codeTemplate.list({
        page: 1,
        page_size: config.devPanel.DEFAULT_USER_DEFINED_TEMPLATE_NUMBER,
        solutionID: this.$route.query.solutionID
      }).then(res => {
        this.allTemplateList = res.data.results
      })

      // 加载远程主机
      api.remoteMachine.list({
        page: 1,
        page_size: config.devPanel.DEFAULT_REMOTE_MACHINE_NUMBER,
        solutionID: this.$route.query.solutionID
      }).then(res => {
        this.allRemoteMachineList = res.data.results
      })
    },
    // 更新解决方案
    updateSolution: _.debounce(function () {
      if (lib.isEmptyStr(this.code)) {
        return -1
      }

      api.solution.update({
        code: lib.getBlocklyXMLText(this.blocklyWorkSpaceIns),
        object_code: this.code
      }, this.$route.query.solutionID).then(res => {
        this.$message.success('保存成功')
      })
    }, 1000),
    // 自动更新解决方案
    updateSolutionAuto() {
      if (lib.isEmptyStr(this.code)) {
        return -1
      }

      api.solution.update({
        code: lib.getBlocklyXMLText(this.blocklyWorkSpaceIns),
        object_code: this.code
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

    // 编辑机器人连接配置事件
    handleEditRemoteMachine(data) {
      this.isShowRemoteMachineEditor = true
      this.currentRemoteMachineName = data.name
      this.currentRemoteMachineIP = data.ip
      this.currentRemoteMachinePort = data.port
      this.currentRemoteSSHPort = data.ssh_port
      this.currentRemoteSSHUser = data.ssh_user
      this.currentRemoteSSHPassword = data.ssh_password
      this.currentEditedRemoteMachine = data
    },
    // 删除机器人连接配置事件
    handleDeleteRemoteMachine(id) {
      this.$confirm('是否永久删除该机器人连接配置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.remoteMachine.remove({}, id)
           .then(res => {
             this.$message.success('连接配置已移除')
             this.updateInitInfo()
             api.remoteMachine.list(this.queryRemoteMachineParams)
                .then(res => {
                  this.remoteMachineTableForm.count = res.data.count
                  this.remoteMachineTableForm.results = res.data.results
                })
                .catch(() => {
                  this.remoteMachineTableForm.results = []
                })
           })
      })
    },
    // 编辑自定义函数事件
    handleEditFunctionCode(data) {
      this.isShowFunctionCodeEditor = true
      this.functionName = data.name
      this.functionCode = data.code
      this.currentEditedFunction = data
    },
    // 删除自定义函数事件
    handleDeleteFunctionCode(id) {
      this.$confirm('是否永久删除该自定义函数？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.definedBlock.remove({}, id)
           .then(res => {
             this.$message.success('删除成功')
             this.updateInitInfo()
             api.definedBlock.list(this.queryFunctionParams)
                .then(res => {
                  this.functionTableForm.count = res.data.count
                  this.functionTableForm.results = res.data.results
                })
                .catch(() => {
                  this.functionTableForm.results = []
                })
           })
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
    // 项目列表页码变换事件
    handleProjectTablePageChange(page) {
      this.projectTableForm.page = page
      api.solution.list(this.queryProjectParams)
         .then(res => {
           this.projectTableForm.count = res.data.count
           this.projectTableForm.results = res.data.results
         })
         .catch(() => {
           this.projectTableForm.results = []
         })
    },
    // 远程机器人列表页码变换事件
    handleRemoteMachineTablePageChanged(page) {
      this.remoteMachineTableForm.page = page
      api.remoteMachine.list(this.queryRemoteMachineParams)
         .then(res => {
           this.remoteMachineTableForm.count = res.data.count
           this.remoteMachineTableForm.results = res.data.results
         })
         .catch(() => {
           this.remoteMachineTableForm.results = []
         })
    },
    // 自定义函数列表页码变换事件
    handleFunctionTablePageChanged(page) {
      this.functionTableForm.page = page
      api.definedBlock.list(this.queryFunctionParams)
         .then(res => {
           this.functionTableForm.count = res.data.count
           this.functionTableForm.results = res.data.results
         })
         .catch(() => {
           this.functionTableForm.results = []
         })
    },
    // 发送代码确认事件
    handleConfirmSendCode() {
      if (!this.code) {
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
      const form = Object.assign({code: this.code, solutionID: this.$route.query.solutionID}, this.codeSenderForm)
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
      if (!this.code) {
        this.$message.error('空的工作空间无法生成代码')
        return -1
      }

      const form = Object.assign({code: this.code}, this.templateAdderForm)
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
    },
    // 自定义函数添加 确认事件
    handleConfirmFunctionCodeAdder: _.debounce(function (functionName) {
      if (lib.isEmptyStr(this.functionCode) || lib.isEmptyStr(functionName)) {
        return -1
      }

      const form = {
        name: this.functionName,
        code: this.functionCode
      }

      this.isLoading = true
      api.definedBlock.save(form, this.$route.query.solutionID)
         .then(res => {
           this.isLoading = false
           if (res.status === 201) {
             this.isShowFunctionCodeAdder = false
             this.functionCode = ''
             this.functionName = ''
             this.$message.success('保存成功')
             this.updateInitInfo()
             api.definedBlock.list(this.queryFunctionParams)
                .then(res => {
                  this.functionTableForm.count = res.data.count
                  this.functionTableForm.results = res.data.results
                })
                .catch(() => {
                  this.functionTableForm.results = []
                })
           } else {
             this.$message.error('保存失败')
           }
         })
         .catch(res => {
           this.isLoading = false
           if (res.response.data.name[0] === '具有 函数名 的 Blockly自定义函数 已存在。') {
             this.$message.error('该函数名称已存在，保存失败')
           }
         })

    }, 400),
    // 自定义函数添加 取消事件
    handleCancelFunctionCodeAdder() {
      this.isShowFunctionCodeAdder = false
      this.functionName = ''
      this.functionCode = ''
    },
    // 自定义函数编辑 确认事件
    handleConfirmFunctionCodeEditor: _.debounce(function () {
      if (lib.isEmptyStr(this.functionCode) || lib.isEmptyStr(this.functionName)) {
        return -1
      }

      const form = {
        name: this.functionName,
        code: this.functionCode
      }

      api.definedBlock.update(form, this.currentEditedFunction.id)
         .then(res => {
           this.isShowFunctionCodeEditor = false
           this.functionCode = ''
           this.functionName = ''
           this.$message.success('保存成功')
           this.updateInitInfo()
           api.definedBlock.list(this.queryFunctionParams)
              .then(res => {
                this.functionTableForm.count = res.data.count
                this.functionTableForm.results = res.data.results
              })
              .catch(() => {
                this.functionTableForm.results = []
              })
         })
    }, 400),
    // 自定义函数编辑 取消事件
    handleCancelFunctionCodeEditor() {
      this.isShowFunctionCodeEditor = false
      this.functionName = ''
      this.functionCode = ''
    },
    // 机器人连接配置添加 确认事件
    handleConfirmRemoteMachineAdder: _.debounce(function () {
      if (lib.isEmptyStr(this.remoteMachineForm.name) ||
        lib.isEmptyStr(this.remoteMachineForm.ip) ||
        lib.isEmptyStr(this.remoteMachineForm.port) ||
        lib.isEmptyStr(this.remoteMachineForm.ssh_port) ||
        lib.isEmptyStr(this.remoteMachineForm.ssh_user) ||
        lib.isEmptyStr(this.remoteMachineForm.ssh_password)) {
        return -1
      }

      api.remoteMachine.save(this.remoteMachineForm, this.$route.query.solutionID)
         .then(res => {
           this.remoteMachineForm = {
             name: '默认配置',
             ip: 'localhost',
             port: '8888',
             ssh_port: '22',
             ssh_user: 'root',
             ssh_password: ''
           }
           this.isShowRemoteMachineAdder = false
           this.$message.success('保存成功')
           this.updateInitInfo()
           api.remoteMachine.list(this.queryRemoteMachineParams)
              .then(res => {
                this.remoteMachineTableForm.count = res.data.count
                this.remoteMachineTableForm.results = res.data.results
              })
              .catch(() => {
                this.remoteMachineTableForm.results = []
              })
         })
         .catch(err => {
           console.log(err.response)
           this.$message.warning(err.response.data.name[0] === '具有 名称 的 远程机器 已存在。' ? '该名称已存在' : '请见检查提交的数据')
         })
    }, 400),
    // 机器人连接配置添加 取消事件
    handleCancelRemoteMachineAdder() {
      this.remoteMachineForm = {
        name: '',
        ip: '',
        port: ''
      }
      this.isShowRemoteMachineAdder = false
    },
    // 机器人连接配置编辑 确认事件
    handleConfirmRemoteMachineEditor: _.debounce(function () {
      if (lib.isEmptyStr(this.currentRemoteMachineName) ||
        lib.isEmptyStr(this.currentRemoteMachineIP) ||
        lib.isEmptyStr(this.currentRemoteMachinePort) ||
        lib.isEmptyStr(this.currentRemoteSSHUser) ||
        lib.isEmptyStr(this.currentRemoteSSHPort) ||
        lib.isEmptyStr(this.currentRemoteSSHPassword)) {
        return -1
      }

      const form = {
        name: this.currentRemoteMachineName,
        ip: this.currentRemoteMachineIP,
        port: this.currentRemoteMachinePort,
        ssh_port: this.currentRemoteSSHPort,
        ssh_user: this.currentRemoteSSHUser,
        ssh_password: this.currentRemoteSSHPassword
      }

      api.remoteMachine.update(form, this.currentEditedRemoteMachine.id)
         .then(res => {
           this.isShowRemoteMachineEditor = false
           this.currentRemoteMachineName = ''
           this.currentRemoteMachineIP = ''
           this.currentRemoteMachinePort = ''
           this.currentRemoteSSHPort = ''
           this.currentRemoteSSHUser = ''
           this.currentRemoteSSHPassword = ''
           this.$message.success('配置已更新')
           this.updateInitInfo()
           api.remoteMachine.list(this.queryRemoteMachineParams)
              .then(res => {
                this.remoteMachineTableForm.count = res.data.count
                this.remoteMachineTableForm.results = res.data.results
              })
              .catch(() => {
                this.remoteMachineTableForm.results = []
              })
         })
    }, 400),
    // 机器人连接配置 取消事件
    handleCancelRemoteMachineEditor() {
      this.isShowRemoteMachineEditor = false
      this.currentRemoteMachineName = ''
      this.currentRemoteMachineIP = ''
      this.currentRemoteMachinePort = ''
      this.currentRemoteSSHPort = ''
      this.currentRemoteSSHUser = ''
      this.currentRemoteSSHPassword = ''
    }
  },
  created() {
    this.loadSolution()
    this.updateInitInfo()
    this.autoSaveSolutionTimer = setInterval(() => {
      this.updateSolutionAuto()
    }, 1000 * 60 * 2) // 2分钟自动保存一次
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
