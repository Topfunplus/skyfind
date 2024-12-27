import axios from "axios";
const ipConf = {
  SERVER_IP: "172.20.193.205",
  PC1_IP: "172.20.193.187",
};

export const OLLAMA_API_ADDRESS = `http://${ipConf.SERVER_IP}:3001/api`;
export const BACKEND_API_BASE = `http://${ipConf.PC1_IP}:7700/backend/api`;

// 导出一个全局唯一的axios实例
export const ollama_api = axios.create({
  baseURL: "http://",
  timeout: 5000,
});

export const instance = axios.create({
  baseURL: BACKEND_API_BASE,
  timeout: 5000,
});

instance.interceptors.request.use((config: any) => {
  // 在请求头中添加token
  config.headers[`Authorization`] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default ipConf;
