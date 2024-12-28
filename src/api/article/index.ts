import { ApiService } from "../../http/index";

const BASE_URL = "/system/article";

export class ArticleApi {
  static getArticles(params?: Record<string, any>) {
    return ApiService.request({
      url: BASE_URL,
      method: "get",
      params: params || {},
    });
  }

  static getArticleById(id: string) {
    return ApiService.request({
      url: `${BASE_URL}/${id}`,
      method: "get",
    });
  }

  static createArticle(data: Record<string, any>) {
    return ApiService.request({
      url: BASE_URL,
      method: "post",
      data,
    });
  }

  static updateArticle(id: string, data: Record<string, any>) {
    return ApiService.request({
      url: `${BASE_URL}/${id}`,
      method: "put",
      data,
    });
  }

  static deleteArticle(id: string) {
    return ApiService.request({
      url: `${BASE_URL}/${id}`,
      method: "delete",
    });
  }
}
