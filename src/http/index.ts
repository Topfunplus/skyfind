import axios from 'axios'

// 导出一个全局唯一的axios实例
export const ollama_api = axios.create({
    baseURL: 'http://',
    timeout: 5000,
})
