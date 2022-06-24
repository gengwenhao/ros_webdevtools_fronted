import axios from './axios'

// 发送代码到远程机器
export const sendCode = (data) => axios.request({
  url: `/api/send_code/`,
  method: 'post',
  data
})

// 面板相关信息
export const getPanelInfo = (params) => axios.request({
  url: `/api/panel_info/`,
  method: 'get',
  params
})

// 生成代码
export const generateCode = (data) => axios.request({
  url: `/api/generate_code/`,
  method: 'post',
  data
})

// 代码下载地址
export const generateCodeURL = (timestamp) => `/api/generate_code/${timestamp}`
