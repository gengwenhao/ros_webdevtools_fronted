import axios from 'axios'

const HOST = 'http://localhost:8000'
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
