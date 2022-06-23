// 加载远程机器列表
import axios from 'axios'
const HOST = 'http://localhost:8000'
// 加载全部远程机器
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
