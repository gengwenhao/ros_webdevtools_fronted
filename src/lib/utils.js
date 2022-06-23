// 业务逻辑相关的工具
import Blockly from "blockly"

// 设置浏览器窗口标题
export const setTitle = (title) => {
  document.title = title || ''
}

// 获得 blockly 工作区代码
export function getBlocklyXMLText(workspace) {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) || ''
}

// 清空 blockly 工作区代码
export function clearBlocklyWorkspace(workspace) {
  if (workspace) {
    workspace.clear()
  }
}

// 回显 blockly 工作区
export function blocklyXMLToDOM(xmlText, workspace) {
  if (xmlText && workspace) {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlText), workspace)
  }
}

// toolbox 默认配置
export const DEFAULT_TOOLBOX_SETTINGS = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '核心模块',
      contents: [
        {
          kind: 'category',
          name: '逻辑',
          contents: [
            {
              kind: 'block',
              type: 'controls_if'
            },
            {
              kind: 'block',
              type: 'logic_compare'
            },
            {
              kind: 'block',
              type: 'logic_boolean'
            },
            {
              kind: 'block',
              type: 'logic_operation'
            },
            {
              kind: 'block',
              type: 'logic_negate'
            },
            {
              kind: 'block',
              type: 'logic_null'
            },
            {
              kind: 'block',
              type: 'logic_ternary'
            }
          ]
        },
        {
          kind: 'category',
          name: '循环',
          contents: [
            {
              kind: 'block',
              type: 'controls_repeat_ext'
            },
            {
              kind: 'block',
              type: 'controls_for'
            },
            {
              kind: 'block',
              type: 'controls_forEach'
            },
            {
              kind: 'block',
              type: 'controls_flow_statements'
            }
          ]
        },
        {
          kind: 'category',
          name: '数学',
          contents: [
            {
              kind: 'block',
              type: 'math_number'
            },
            {
              kind: 'block',
              type: 'math_arithmetic'
            },
            {
              kind: 'block',
              type: 'math_single'
            },
            {
              kind: 'block',
              type: 'math_trig'
            },
            {
              kind: 'block',
              type: 'math_constant'
            },
            {
              kind: 'block',
              type: 'math_number_property'
            },
            {
              kind: 'block',
              type: 'math_round'
            },
            {
              kind: 'block',
              type: 'math_on_list'
            },
            {
              kind: 'block',
              type: 'math_modulo'
            },
            {
              kind: 'block',
              type: 'math_constrain'
            },
            {
              kind: 'block',
              type: 'math_random_int'
            },
            {
              kind: 'block',
              type: 'math_random_float'
            }
          ]
        }
      ]
    },
    {
      kind: 'category',
      name: '自定义函数',
      contents: []
    }
  ]
}
