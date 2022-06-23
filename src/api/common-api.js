import axios from 'axios'

const HOST = 'http://localhost:8000'

// 发送代码到远程机器
export const sendCode = (data) => axios.post(`${HOST}/api/send_code/`, data)

// 面板相关信息
export const getPanelInfo = (params, config) => axios.get(`${HOST}/api/panel_info/`, {...config, params})

// 生成代码
export const generateCode = (data) => axios.post(`${HOST}/api/generate_code/`, data)

// 代码下载地址
export const generateCodeURL = (timestamp) => `${HOST}/api/generate_code/${timestamp}`
