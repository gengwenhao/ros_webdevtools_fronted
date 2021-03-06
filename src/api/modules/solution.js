import axios from './axios'

// 保存解决方案
export const save = (data) => axios.request({
  url: `/api/solution/`,
  method: 'post',
  data
})

// 加载全部解决方案
export const list = (params) => axios.request({
  url: `/api/solution/`,
  method: 'get',
  params
})

// 加载解决方案
export const get = (params, id) => axios.request({
  url: `/api/solution/${id}/`,
  method: 'get',
  params
})

// 修改解决方案
export const update = (data, id) => axios.request({
  url: `/api/solution/${id}/`,
  method: 'put',
  data
})

// 删除解决方案
export const remove = (params, id) => axios.request({
  url: `/api/solution/${id}/`,
  method: 'delete',
  params
})

// 初始化解决方案
export const init = (id) => axios.request({
  url: `/api/solution_init/?solutionID=${id}`,
  method: 'post'
})
