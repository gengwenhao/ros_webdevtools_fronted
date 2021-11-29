import Blockly from "blockly"

// 业务逻辑相关的工具
export const setTitle = (title) => {
  document.title = title || ''
}

// 获得blockly工作区代码
export function getBlocklyXMLText(workspace) {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) || ''
}

// 清空blockly工作区代码
export function clearBlocklyWorkspace(workspace) {
  if (workspace) {
    workspace.clear()
  }
}

// 回显blockly工作区
export function blocklyXMLToDOM(xmlText, workspace) {
  if (xmlText && workspace) {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlText), workspace)
  }
}
