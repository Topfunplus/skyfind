// 获取某个url(ollama)下的models
import { ollama_api } from "../../http";

export function getModels(URL: string) {
  return ollama_api.request({
    url: URL + "/api/tags",
    method: "GET",
  });
}
