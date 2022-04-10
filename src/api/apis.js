import axios from 'axios'

// const HOST = 'http://localhost:8000'
const HOST = 'http://192.168.31.33:8000'
// const HOST = ''

// 发送代码到远程机器
export const sendCode = (data) => axios.post(`${HOST}/api/send_code/`, data)

// 加载远程机器列表
export const loadRemoteMachines = (params, config) => axios.get(`${HOST}/api/remote_machine/`, {...config, params})

// 添加远程机器
export const saveRemoteMachine = (data, solutionID) => axios.post(`${HOST}/api/remote_machine/?solutionID=${solutionID}`, data)

// 更新远程机器
export const updateRemoteMachine = (data, id) => axios.put(`${HOST}/api/remote_machine/${id}/`, data)

// 删除远程机器
export const deleteRemoteMachine = (params, id, config) => axios.delete(`${HOST}/api/remote_machine/${id}/`, {
  ...config,
  params
})

// 面板相关信息
export const getPanelInfo = (params, config) => axios.get(`${HOST}/api/panel_info/`, {...config, params})

// 保存解决方案
export const saveSolution = (data) => axios.post(`${HOST}/api/solution/`, data)

// 加载全部解决方案
export const loadSolutions = (params, config) => axios.get(`${HOST}/api/solution/`, {...config, params})

// 加载解决方案
export const loadSolutionDetail = (params, id, config) => axios.get(`${HOST}/api/solution/${id}/`, {...config, params})

// 修改解决方案
export const updateSolutionDetail = (data, id) => axios.put(`${HOST}/api/solution/${id}/`, data)

// 删除解决方案
export const deleteSolution = (params, id, config) => axios.delete(`${HOST}/api/solution/${id}/`, {...config, params})

// 保存用户自定义编程模块
export const saveDefinedBlock = (data, solutionID) => axios.post(`${HOST}/api/defined_block/?solutionID=${solutionID}`, data)

// 修改用户自定义编程模块
export const updateDefinedBlock = (data, id) => axios.put(`${HOST}/api/defined_block/${id}/`, data)

// 加载用户自定义编程模块
export const loadDefinedBlock = (params, config) => axios.get(`${HOST}/api/defined_block/`, {...config, params})

// 删除用户自定义编程模块
export const deleteDefinedBlock = (params, id, config) => axios.delete(`${HOST}/api/defined_block/${id}/`, {
  ...config,
  params
})

// 保存代码模板
export const saveCodeTemplate = (data, solutionID) => axios.post(`${HOST}/api/code_template/?solutionID=${solutionID}`, data)

// 修改代码模板
export const updateCodeTemplate = (data, id) => axios.put(`${HOST}/api/code_template/${id}/`, data)

// 删除代码模板
export const deleteCodeTemplate = (params, id, config) => axios.delete(`${HOST}/api/code_template/${id}/`, {
  ...config,
  params
})

// 加载代码模板
export const loadCodeTemplates = (params, config) => axios.get(`${HOST}/api/code_template/`, {...config, params})

// 生成代码
export const generateCode = (data) => axios.post(`${HOST}/api/generate_code/`, data)

// 代码下载地址
export const generateCodeURL = (timestamp) => `${HOST}/api/generate_code/${timestamp}`
