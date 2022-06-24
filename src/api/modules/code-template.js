import axios from './axios'

// 保存代码模板
export const save = (data, solutionID) => axios.request({
  url: `/api/code_template/?solutionID=${solutionID}`,
  method: 'post',
  data
})

// 删除代码模板
export const remove = (params, id) => axios.request({
  url: `/api/code_template/${id}/`,
  method: 'delete',
  params
})

// 修改代码模板
export const update = (data, id) => axios.request({
  url: `/api/code_template/${id}/`,
  method: 'put',
  data
})


// 加载代码模板
export const list = (params, config) => axios.request({
  url: `/api/code_template/`,
  method: 'get',
  params
})
