import axios from 'axios'
const HOST = 'http://localhost:8000'
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
