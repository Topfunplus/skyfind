'use strict'

// 引入 fs 模块
const fs = require('fs')

// 引入 react-dev-utils/chalk 模块 - 用于在终端中输出彩色文字 - https://www.npmjs.com/package/chalk
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const ignoredFiles = require('react-dev-utils/ignoredFiles')
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware')
const paths = require('./paths')
const getHttpsConfig = require('./getHttpsConfig')

const host = process.env.HOST || '0.0.0.0'
const sockHost = process.env.WDS_SOCKET_HOST
const sockPath = process.env.WDS_SOCKET_PATH // 默认值: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT

module.exports = function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true'
  return {
    // WebpackDevServer 2.4.3 引入了一项安全修复，防止远程网站通过 DNS 重新绑定访问本地内容：
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // 但是，这使得某些现有的用例变得更复杂，比如云环境开发或开发中的子域名：
    // https://github.com/facebook/create-react-app/issues/2271
    // https://github.com/facebook/create-react-app/issues/2233
    // 在我们研究更好的解决方案时，目前我们采取一种折中方案。
    // 由于我们的 WDS 配置仅服务于 `public` 文件夹中的文件，我们不会认为访问这些文件是漏洞。
    // 但是，如果使用 `proxy` 功能，这会更危险，因为它可能暴露像 Django 和 Rails 这样的后端的远程代码执行漏洞。
    // 因此，我们通常会禁用主机检查，但如果你指定了 `proxy` 设置，则会启用它。
    // 最后，如果你确实知道自己在做什么，可以使用一个特殊的环境变量覆盖该行为。
    // 注意：["localhost", ".localhost"] 支持子域名 - 但我们可能需要手动设置 allowedHosts 来处理更复杂的设置。
    allowedHosts: disableFirewall ? 'all' : [allowedHost],
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有来源跨域请求
      'Access-Control-Allow-Methods': '*', // 允许所有方法
      'Access-Control-Allow-Headers': '*', // 允许所有请求头
    },
    // 启用生成文件的 gzip 压缩。
    compress: true,
    static: {
      // 默认情况下，WebpackDevServer 会从当前目录提供物理文件，
      // 除此之外，还会提供从内存中生成的虚拟构建产品。
      // 这可能会造成混淆，因为这些文件不会自动出现在生产构建文件夹中，
      // 除非我们手动复制它们。然而，复制整个项目目录是危险的，
      // 因为我们可能会暴露敏感文件。
      // 因此，我们建立一个约定：只服务于 `public` 目录中的文件。
      // 我们的构建脚本会将 `public` 复制到 `build` 文件夹中。
      // 在 `index.html` 中，可以通过 %PUBLIC_URL% 获取 `public` 文件夹的 URL：
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // 在 JavaScript 代码中，可以通过 `process.env.PUBLIC_URL` 访问。
      // 注意：我们仅推荐将 `public` 文件夹用作某些文件的临时存储，比如 favicon.ico 和 manifest.json。
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      // 默认情况下，`contentBase` 中的文件不会触发页面重载。
      watch: {
        // 据报告，这可以避免某些系统上的 CPU 过载问题。
        // https://github.com/facebook/create-react-app/issues/293
        // src/node_modules 不会被忽略，以支持绝对导入。
        // https://github.com/facebook/create-react-app/issues/1065
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    // client 是 WebpackDevServer 的一个内部插件，用于在浏览器中打开 URL 或创建 WebSockets。
    client: {
      webSocketURL: {
        // 为热加载服务器启用自定义 sockjs 路径名。
        // 为热加载服务器启用自定义 sockjs 主机名、路径名和端口。
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true, // 显示错误覆盖层
        warnings: false, // 不显示警告覆盖层
      },
    },
    // 通过将 `publicPath` 设置为相对路径，我们可以让开发服务器在 `http://localhost:3000/` 下提供服务。
    devMiddleware: {
      // 告诉 WebpackDevServer 使用与 webpack 配置中指定的 "publicPath" 相同的路径。
      // 当主页为 '.' 时，默认从根路径服务。
      // 删除最后的斜杠，以便用户可以直接访问 `/test` 而不是 `/test/`。
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },

    https: getHttpsConfig(), // 配置 HTTPS
    host, // 配置主机地址
    historyApiFallback: {
      // 带点的路径仍应使用历史回退。
      // 参考 https://github.com/facebook/create-react-app/issues/387。
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    // `proxy` 会在 `before` 和 `after` 两个 WebpackDevServer 中间件之间运行。
    // 这允许我们在代理请求之前读取本地文件。
    proxy,
    onBeforeSetupMiddleware(devServer) {
      // 在 `redirectServedPath` 之前保留 `evalSourceMapMiddleware` 中间件，
      // 否则不会生效。
      // 这使得我们可以从 webpack 中获取错误覆盖层的源码内容。
      devServer.app.use(evalSourceMapMiddleware(devServer))

      if (fs.existsSync(paths.proxySetup)) {
        // 注册用户提供的中间件，用于代理目的。
        require(paths.proxySetup)(devServer.app)
      }
    },
    onAfterSetupMiddleware(devServer) {
      // 如果 URL 不匹配，重定向到 `PUBLIC_URL` 或 `package.json` 中的 `homepage`。
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath))

      // 此 service worker 文件实际上是一个 "无操作" 文件，
      // 用于重置之前为相同主机:端口组合注册的任何 service worker。
      // 我们在开发环境中这样做，以避免使用生产缓存。
      // 参考 https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath))
    },

    // proxy 是一个对象，用于将请求代理到另一个服务器。
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  }
}
