import { instance } from "../../http/index";
import BaseApi from "../common/index";

type LoginBody = {
  username: string;
  password: string;
  code: string;
  uuid: string;
};

export default class LoginApi extends BaseApi {
  Login(data: LoginBody) {
    return instance.request({
      url: "/login",
      method: "POST",
      data: data,
    });
  }
}
