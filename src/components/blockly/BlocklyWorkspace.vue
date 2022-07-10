<template>
  <div id="blockly-workspace">
    <!-- 面板 -->
    <div class="main-panel" :style="{width, height}">
      <!-- blockly显示区 -->
      <div id="blockly-container" ref="blockly-container" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<script>
import 'blockly/python'
import Blockly from 'blockly'

export default {
  name: "BlocklyWorkspace",

  props: {
    /**
     * 容器默认的宽度样式属性
     */
    width: {
      type: String,
      default: '100%'
    },
    /**
     * 容器默认的高度样式属性
     */
    height: {
      type: String,
      default: 'calc(100vh - 130px)'
    },
    /**
     * 自定义 blockly 块
     */
    blockList: {
      type: Array,
      default: () => []
    },
    /**
     * blockly toolbox default settings
     */
    toolboxSettings: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * blockly opt default settings
     */
    optSettings: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * blockly 工作空间的图形代码
     */
    xmlCode: {
      type: String,
      default: ''
    },
    /**
     * blockly 工作控件图形代码转后成的 python 代码
     */
    convertedCode: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      // Blockly 工作空间实例
      blocklyWorkSpaceIns: null,
      // Blockly 工具箱配置
      toolbox: null,
      // Blockly 其他配置
      optOptions: null
    }
  },

  watch: {
    blockList: {
      handler(val, oldVal) {
        if (val.length !== oldVal.length) {
          this.updateToolbox()
        }
      },
      deep: true
    }
  },

  methods: {
    // 刷新 blockly 工作空间
    updateBlocklyWS() {
      // 更新工具箱
      this.updateToolbox()

      // 创建 blockly 实例
      if (!this.blocklyWorkSpaceIns) {
        // init workspace instance
        this.blocklyWorkSpaceIns = Blockly.inject(this.$refs['blockly-container'], {
          toolbox: this.toolbox,
          ...this.optOptions
        })

        // bind event
        this.blocklyWorkSpaceIns.addChangeListener(() => {
          this.$emit('update:convertedCode', this.getBlocklyConvertedCode())
          this.$emit('update:xmlCode', this.getBlocklyXMLCode())
        })
      }

      // 回显工作区代码
      this.xmlTextToBlocklyDOM()

      return this.blocklyWorkSpaceIns
    },

    // 刷新工具箱
    updateToolbox() {
      // 清空工具箱
      this.toolbox.contents[1].contents = []

      // 刷新工具箱自定义函数
      this.blockList.forEach(data => {
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
        this.blocklyWorkSpaceIns.updateToolbox(this.toolbox)
      }
    },

    // 清空工作区
    clearWorkspace() {
      if (this.blocklyWorkSpaceIns) {
        this.blocklyWorkSpaceIns.clear()
      }
    },

    // 获得 blockly 工作区转换出来的 python 代码
    getBlocklyConvertedCode() {
      if (this.blocklyWorkSpaceIns) {
        return Blockly.Python.workspaceToCode(this.blocklyWorkSpaceIns)
      }

      return ''
    },

    // 获得 blockly 工作区代码
    getBlocklyXMLCode() {
      if (this.blocklyWorkSpaceIns) {
        return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.blocklyWorkSpaceIns))
      }

      return ''
    },

    // 回显 blockly 工作区
    xmlTextToBlocklyDOM() {
      if (this.xmlCode && this.blocklyWorkSpaceIns) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.xmlCode), this.blocklyWorkSpaceIns)
      }
    }
  },

  created() {
    this.toolbox = this.toolboxSettings
    this.optOptions = this.optSettings
  },

  mounted() {
    this.$nextTick(() => {
      this.updateBlocklyWS()
    })
  }
}
</script>

<style scoped>
#blockly-container {
  width: 100%;
  height: 500px;
}
</style>
