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
    } else if (response.data.code === 401) {
      message.error(`系统未授权，请先登录!`);
      return Promise.reject(response.data.msg);
    } else if (response.data.code === 500) {
      message.error(`服务器错误` + response.data.msg);
      return Promise.reject(response.data.msg);
    } else {
      message.error(`未知错误` + response.data.msg);
      return Promise.reject(response.data.msg);
    }
  },
  (error: any) => {
    message.error("This is a normal message");
    return Promise.reject(error);
  },
);

export default ipConf;
