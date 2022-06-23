import axios from 'axios'
const HOST = 'http://localhost:8000'
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
