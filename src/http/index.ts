import axios from 'axios'

// 导出一个全局唯一的axios实例
export const ollama_api = axios.create({
  baseURL: 'http://',
  timeout: 5000,
})

export const OLLAMA_API_ADDRESS = `http://172.20.193.205:3001/api`
