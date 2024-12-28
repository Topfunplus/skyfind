import {
  BarcodeOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Tabs,
  TabsProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../api/login/index";
import { useAppDispatch } from "../../hooks/redux";
import { AjaxResult } from "../../http/index";
import { setUser } from "../../store/slices/authSlice";
import "./style.css";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [imgSrc, setImgSrc] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let uuid: string = "";

  function getCode() {
    LoginApi.getCodeImg().then((res: AjaxResult) => {
      setImgSrc(`data:image/gif;base64,` + res.data.img);
      uuid = res.data.uuid as string;
    });
  }
  useEffect(() => {
    getCode();
  }, []);

  const handleLogin = (values: {
    username: string;
    password: string;
    code: string;
  }) => {
    LoginApi.log(`login options: ${values.username}${values.password} `);

    const LoginBody = {
      username: values.username,
      password: values.password,
      code: values.code,
      uuid: uuid,
    };
    LoginApi.Login(LoginBody).then((res: AjaxResult) => {
      console.log(res);
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
    });
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

          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码！" }]}
          >
            <Input prefix={<BarcodeOutlined />} placeholder="验证码" />
          </Form.Item>

          <Form.Item>
            <Flex gap={10} align="center" justify="space-between">
              <img src={imgSrc} alt="验证码"></img>

              <div>
                看不清？
                <a href="#" onClick={getCode}>
                  换一张
                </a>
              </div>
            </Flex>
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
