import { UserOutlined } from '@ant-design/icons'
import { Layout as AntLayout, Button, Menu } from 'antd'
import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { RootState } from '../../store'
import './style.css'

const { Header, Content, Footer } = AntLayout

const Layout: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)

  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys = [location.pathname.split('/')[1] || 'home']

  // 顶部header的menu中的选项
  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'chat',
      label: <Link to="/chat">聊天</Link>,
    },
    ...(user
      ? [
          {
            key: 'create-post',
            label: <Link to="/create-post">写文章</Link>,
          },
          {
            key: 'profile',
            label: <Link to="/profile">个人中心</Link>,
          },
        ]
      : []),
  ]

  return (
    <AntLayout className="layout">
      <Header className="header">
        <div className="logo-container">
          <Link to="/" className="logo">
            穹顶寻宝
          </Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuItems}
          className="menu"
        />
        {!user && (
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => navigate('/login')}
            className="login-btn"
          >
            登录
          </Button>
        )}
      </Header>
      {/* 内容 */}
      <Content className="site-content">
        <div className="site-content-wrapper">
          {/* 占位符  */}
          <Outlet />
        </div>
      </Content>
      <Footer className="footer">穹顶寻宝 ©{new Date().getFullYear()}</Footer>
    </AntLayout>
  )
}

export default Layout
