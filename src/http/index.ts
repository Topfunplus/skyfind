import { message } from "antd";
import axios from "axios";
import { AxiosHeaders } from "../../node_modules/axios/index";

const ipConf = {
  SERVER_IP: "172.20.193.205",
  PC1_IP: "172.20.193.187",
};
export type httpMethod = "get" | "post" | "put" | "delete";
export interface HttpConfig {
  url: string;
  method: "get" | "post" | "put" | "delete";
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export interface AjaxResult {
  config: any;
  data: {
    code: number;
    msg: string;
    data: string;
    img?: string;
    uuid?: string;
    captchaEnabled?: string;
    token?: string;
  };
  headers: AxiosHeaders;
  request: any;
  status: number;
  statusText: string;
}

export class ApiService {
  static request(config: HttpConfig) {
    return instance.request(config);
  }
}

export const OLLAMA_API_ADDRESS = `http://${ipConf.SERVER_IP}:4000/api`;
export const BACKEND_API_BASE = `http://${ipConf.PC1_IP}:7700/back`;
export const REDERECT_BACKEND_URL = `http://${ipConf.SERVER_IP}:4000/back`;

// 导出一个全局唯一的axios实例
export const ollama_api = axios.create({
  baseURL: "http://",
  timeout: 5000,
});

export const instance = axios.create({
  baseURL: REDERECT_BACKEND_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config: any) => {
  // 在请求头中添加token
  config.headers[`Authorization`] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use(
  (response: any) => {
    if (response.data.code === 200) {
      return response;
    } else {
      message.error(`错误: ${response.data.msg}`);
      return Promise.reject(response.data.msg);
    }
  },
  (error: any) => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      message.error(
        `服务器错误: ${error.response.status} - ${error.response.data.msg}`,
      );
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message.error("请求超时或网络错误");
    } else {
      // 其他错误
      message.error(`请求错误: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

export default ipConf;
