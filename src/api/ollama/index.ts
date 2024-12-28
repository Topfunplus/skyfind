// 获取某个url(ollama)下的models
import { ollama_api, OLLAMA_API_ADDRESS } from "../../http";
import { HttpConfig } from "../../http/index";
let requestBody: HttpConfig = {} as HttpConfig;
export class OllamaApi {
  static getModels() {
    requestBody = {
      url: `${OLLAMA_API_ADDRESS}/tags`,
      method: "get",
      params: {},
    };
    return ollama_api.request(requestBody);
  }
}
