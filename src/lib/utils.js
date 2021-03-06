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
