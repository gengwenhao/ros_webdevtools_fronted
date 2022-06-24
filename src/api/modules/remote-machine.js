// 加载远程机器列表
import axios from './axios'

// 添加远程机器
export const save = (data, solutionID) => axios.request({
  url: `/api/remote_machine/?solutionID=${solutionID}`,
  method: 'get',
  data
})

// 删除远程机器
export const remove = (params, id) => axios.request({
  url: `/api/remote_machine/${id}/`,
  method: 'delete',
  params
})

// 更新远程机器
export const update = (data, id) => axios.request({
  url: `/api/remote_machine/${id}/`,
  method: 'put',
  data
})

// 加载全部远程机器
export const list = (params) => axios.request({
  url: `/api/remote_machine/`,
  method: 'get',
  params
})
