import { ApiService } from "../../http/index";
import BaseApi from "../common/index";

type LoginBody = {
  username: string;
  password: string;
  code: string;
  uuid: string;
};

export default class LoginApi extends BaseApi {
  static Login(data: LoginBody) {
    return ApiService.request({
      url: "/login",
      method: "post",
      data: data,
    });
  }

  static getCodeImg() {
    return ApiService.request({
      url: "/captchaImage",
      method: "get",
    });
  }
}
