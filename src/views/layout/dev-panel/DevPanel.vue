<template>
  <div id="dev-panel">
    <!-- 按钮组 -->
    <div class="icon-group-con">
      <div class="icon-group">
        <div class="icon-con" @click="$refs['code-template-lister'].isShow = true">
          <el-badge :value="globalInfo.templateCnt">
            <el-tooltip class="item" effect="dark" content="新建代码生成模板 Ctrl+Alt+T" placement="bottom-start">
              <i class="iconfont icon-daimaji"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="$refs['defined-block-lister'].isShow = true">
          <el-badge :value="globalInfo.blocklyFunctionCnt">
            <el-tooltip class="item" effect="dark" content="新建自定义函数 Ctrl+Alt+B" placement="bottom-start">
              <i class="iconfont icon-block"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="$refs['remote-machine-lister'].isShow = true">
          <el-badge :value="globalInfo.remoteMachineCnt">
            <el-tooltip class="item" effect="dark" content="新建机器人连接配置 Ctrl+Alt+I" placement="bottom-start">
              <i class="iconfont icon-jiqiren"></i>
            </el-tooltip>
          </el-badge>
        </div>

        <div class="icon-con" @click="saveSolution('保存成功！', '工作空间内 暂无任何内容')">
          <el-tooltip class="item" effect="dark" content="保存到云端 Ctrl+Alt+S" placement="bottom-start">
            <i class="iconfont icon-baocun"></i>
          </el-tooltip>
        </div>
      </div>

      <div class="icon-group">
        <div class="icon-con" @click="$refs['code-packager'].isShow = true">
          <el-tooltip class="item" effect="dark" content="打包代码 Ctrl+Alt+P" placement="bottom-start">
            <i class="iconfont icon-dabaoxiazai"></i>
          </el-tooltip>
        </div>

        <div class="icon-con" @click="$refs['code-sender'].isShow = true">
          <el-tooltip class="item" effect="dark" content="发送代码 Ctrl+Alt+Enter" placement="bottom-start">
            <i class="iconfont icon-icon_sent"></i>
          </el-tooltip>
        </div>
      </div>
    </div>

    <blockly-workspace
      ref="blockly-workspace"
      v-if="isShowBlocklyWS"
      :block-list="globalInfo.blockList"
      :opt-settings="optOptions"
      :toolbox-settings="toolbox"
      :xml-code.sync="xmlCode"
      :converted-code.sync="convertedCode"
    />

    <!--  弹出层：自定义函数列表  -->
    <defined-block-lister
      ref="defined-block-lister"
    />

    <!--  弹出层：代码模板列表  -->
    <code-template-lister
      ref="code-template-lister"
    />

    <!-- 弹出层：机器人列表 -->
    <remote-machine-lister
      ref="remote-machine-lister"
    />

    <!-- 弹出层：代码发送 -->
    <code-sender
      ref="code-sender"
      :code="convertedCode"
      @success="$message.success"
      @error="$message.error"
    />

    <!-- 弹出层：代码打包 -->
    <code-packager
      ref="code-packager"
      :code="convertedCode"
      @success="handleCodePackagerSuccess"
    />

  </div>
</template>

<script>
import 'blockly/python'
import _ from 'lodash'
import moment from 'moment'
import JsFileDownloader from 'js-file-downloader'

import {mapState} from 'vuex'
import api from '@/api'
import lib from '@/lib'
import config from '@/config'
import CodeTemplateLister from '@/components/code-template/CodeTemplateLister'
import DefinedBlockLister from '@/components/defined-block/DefinedBlockLister'
import RemoteMachineLister from '@/components/remote-machine/RemoteMachineLister'
import CodeSender from '@/components/code-package/CodeSender'
import CodePackager from '@/components/code-package/CodePackager'
import BlocklyWorkspace from '@/components/blockly/BlocklyWorkspace'

export default {
  name: "DevPanel",

  components: {BlocklyWorkspace, CodePackager, CodeSender, RemoteMachineLister, DefinedBlockLister, CodeTemplateLister},

  data() {
    return {
      //  是否显示 Blockly 工作空间
      isShowBlocklyWS: false,
      // Blockly 图形代码
      xmlCode: '',
      // Blockly 图形代码生成的 python 代码
      convertedCode: '',
      // Blockly 工具箱配置
      toolbox: config.blockly.DEFAULT_TOOLBOX_SETTINGS,
      // Blockly 其他配置
      optOptions: config.blockly.DEFAULT_OPT_OPTIONS,
      // 自动保存项目的定时器
      autosaveTimer: null
    }
  },

  computed: {
    ...mapState(['globalInfo'])
  },

  methods: {
    // 保存解决方案
    saveSolution: _.throttle(function (successTips, emptyTips) {
      if (lib.isEmptyStr(this.convertedCode)) {
        if (!lib.isEmptyStr(emptyTips)) {
          this.$message.warning(emptyTips)
        }

        return -1
      }

      api.solution
         .update({code: this.xmlCode, object_code: this.convertedCode}, this.$route.query.solutionID)
         .then((res) => {
           this.$message.success(successTips)
         })
    }, 1000),

    // 代码打包 成功事件
    handleCodePackagerSuccess(data) {
      if (!this.convertedCode) {
        this.$message.error('空的工作空间无法生成代码')
        return -1
      }

      this.$toast.success('代码生成完毕')

      // download file
      setTimeout(() => {
        new JsFileDownloader({
          url: api.commonAPI.generateCodeURL(data.timestamp),
          filename: `${data.timestamp}-results.py`
        }).then(() => {
        })
      }, 1000)
    }
  },

  created() {
    // 绑定热键
    this.$shortcut.bind('ctrl+alt+t', () => {
      this.$refs['code-template-lister'].isShow = true
    })
    this.$shortcut.bind('ctrl+alt+b', () => {
      this.$refs['defined-block-lister'].isShow = true
    })
    this.$shortcut.bind('ctrl+alt+i', () => {
      this.$refs['remote-machine-lister'].isShow = true
    })
    this.$shortcut.bind('ctrl+alt+s', () => {
      this.saveSolution('保存成功！', '工作空间内 暂无任何内容')
    })
    this.$shortcut.bind('ctrl+alt+p', () => {
      this.$refs['code-packager'].isShow = true
    })
    this.$shortcut.bind('ctrl+alt+enter', () => {
      this.$refs['code-sender'].isShow = true
    })

    // 加载解决方案信息
    api.solution
       .get({}, this.$route.query.solutionID)
       .then(res => {
         this.xmlCode = res.data.code
         this.isShowBlocklyWS = true
       })
       .catch(err => {
         this.$router.push({name: '404'})
       })

    // 将解决方案标记为已使用过
    api.solution
       .init(this.$route.query.solutionID)

    // 加载全局信息
    this.$store.dispatch('updateGlobalInfo', {
      solutionID: this.$route.query.solutionID
    })

    // 2 分钟自动保存解决方案一次
    this.autosaveTimer = setInterval(() => {
      moment.locale('zh-cn')
      this.saveSolution(`代码已于 ${moment().format('lll')} 自动保存`)
    }, 1000 * 60 * 5)
  },

  destroyed() {
    // 移除热键
    this.$shortcut.unbind([
      'ctrl+alt+t',
      'ctrl+alt+b',
      'ctrl+alt+i',
      'ctrl+alt+s',
      'ctrl+alt+p',
      'ctrl+alt+enter'
    ].join())

    // 移除解决方案自动保存定时器
    this.autosaveTimer && clearInterval(this.autosaveTimer)
    this.autosaveTimer = null
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {

      // 检查路由传入的 solutionID 是否合法
      if (!vm.$route.query.solutionID) {
        vm.$router.push({name: '404'})
      }

    })
  },

  beforeRouteLeave(to, from, next) {
    if (this.autosaveTimer) {
      clearInterval(this.autosaveTimer)
    }
    this.autosaveTimer = null

    next()
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
}
</style>
