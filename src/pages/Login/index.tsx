import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../api/login/index";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../store/slices/authSlice";
import "./style.css";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (values: { username: string; password: string }) => {
    LoginApi.log(`login options: ${values.username}${values.password} `);

    // 这里模拟登录成功
    dispatch(
      setUser({
        id: "1",
        username: values.username,
        email: "user@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    message.success("登录成功！");
    navigate("/");
  };

  const handleRegister = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    // 这里模拟注册成功
    message.success("注册成功！");
    setActiveTab("login");
  };

  const items: (typeof TabsProps)["items"] = [
    {
      key: "login",
      label: "登录",
      children: (
        <Form name="login" onFinish={handleLogin} size="large">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "register",
      label: "注册",
      children: (
        <Form name="register" onFinish={handleRegister} size="large">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "请输入邮箱！" },
              { type: "email", message: "请输入有效的邮箱地址！" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="login-container">
      <Card bordered={false} className="login-card">
        <Tabs
          activeKey={activeTab}
          items={items}
          onChange={setActiveTab}
          centered
        />
      </Card>
    </div>
  );
};

export default Login;
