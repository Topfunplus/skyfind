import chalk from "chalk";

export default class BaseApi {
  static readonly log = function (message: string) {
    console.log(chalk.rgb(142, 194, 241).underline(message));
  };
}
