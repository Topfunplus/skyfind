import '@copilotkit/react-ui/styles.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import AppRoutes from './routes/index'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
