import axios from 'axios'

// const HOST = 'http://localhost:8000'
// const HOST = 'http://192.168.1.105:8000'
const HOST = ''

// 发送代码到远程机器
export const sendCode = (data) => axios.post(`${HOST}/send_code/`, data)

// 加载远程机器列表
export const loadRemoteMachines = (params, config) => axios.get(`${HOST}/remote_machine/`, {...config, params})

// 添加远程机器
export const saveRemoteMachine = (data) => axios.post(`${HOST}/remote_machine/`, data)

// 更新远程机器
export const updateRemoteMachine = (data) => axios.put(`${HOST}/remote_machine/`, data)

// 删除远程机器
export const deleteRemoteMachine = (params, config) => axios.delete(`${HOST}/remote_machine/`, {...config, params})

// 面板相关信息
export const getPanelInfo = (params, config) => axios.get(`${HOST}/panel_info/`, {...config, params})

// 保存项目
export const saveProject = (data) => axios.post(`${HOST}/project/`, data)

// 加载项目列表
export const loadProjects = (params, config) => axios.get(`${HOST}/project/`, {...config, params})

// 加载项目
export const loadProjectDetail = (params, id, config) => axios.get(`${HOST}/project/${id}/`, {...config, params})

// 删除项目
export const deleteProject = (params, id, config) => axios.delete(`${HOST}/project/${id}/`, {...config, params})

// 保存自定义Blockly函数
export const saveFunctionCode = (data) => axios.post(`${HOST}/blockly_block/`, data)

// 修改自定义Blockly函数
export const updateFunctionCode = (data, id) => axios.put(`${HOST}/blockly_block/${id}/`, data)

// 加载自定义Blockly函数
export const loadFunctionCodes = (params, config) => axios.get(`${HOST}/blockly_block/`, {...config, params})

// 删除自定义Blockly函数
export const deleteFunctionCode = (params, id, config) => axios.delete(`${HOST}/blockly_block/${id}/`, {
  ...config,
  params
})

// 保存代码模板
export const saveGenerateTemplate = (data) => axios.post(`${HOST}/code_template/`, data)

// 修改代码模板
export const updateGenerateTemplate = (data, id) => axios.put(`${HOST}/code_template/${id}/`, data)

// 删除代码模板
export const deleteGenerateTemplate = (params, id, config) => axios.delete(`${HOST}/code_template/${id}/`, {
  ...config,
  params
})

// 加载代码模板
export const loadGenerateTemplates = (params, config) => axios.get(`${HOST}/code_template/`, {...config, params})

// 生成代码
export const generateCode = (data) => axios.post(`${HOST}/generate_code/`, data)

// 代码下载地址
export const generateCodeURL = (timestamp) => `${HOST}/generate_code/${timestamp}`
