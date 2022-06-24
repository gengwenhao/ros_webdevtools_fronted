import axios from './axios'

// 保存用户自定义编程模块
export const save = (data, solutionID) => axios.request({
  url: `/api/defined_block/?solutionID=${solutionID}`,
  method: 'post',
  data
})

// 删除用户自定义编程模块
export const remove = (params, id) => axios.request({
  url: `/api/defined_block/${id}/`,
  method: 'delete',
  params
})

// 修改用户自定义编程模块
export const update = (data, id) => axios.request({
  url: `/api/defined_block/${id}/`,
  method: 'put',
  data
})

// 加载用户自定义编程模块
export const list = (params) => axios.request({
  url: `/api/defined_block/`,
  method: 'get',
  params
})

