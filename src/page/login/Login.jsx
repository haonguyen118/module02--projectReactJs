import { Button, Checkbox, Form, Input, message, notification } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userFindAll } from "../../redux/api/service/userService";

export default function Login() {
  // const [form] = Form.useForm();
  const [validateStatus, setValidateStatus] = useState("");
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log("users", users);
  useEffect(() => {
    dispatch(userFindAll());
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    const emailExists = users.some(
      (user) => user.email === values.email && user.password === values.password
    );
    if (emailExists) {
      notification.success({ message: "Dang nhap thanh cong", duration: 3 });
      navigate("/admin");
    } else {
      notification.error({
        message: "Email hoac mat khau khong trung khop",
        duration: 3,
      });

      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setValidateStatus("success");
    } else {
      setValidateStatus("error");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <p style={{ fontSize: 30, textAlign: "center" }}>Đăng nhập</p>
          <p style={{ fontSize: 12, color: "grey" }}>
            Đăng nhập tài khoản để sử dụng hệ thống quản lý
          </p>
          <br />
          <Form
            layout="vertical"
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!!!!" },
                {
                  validator: (_, value) => {
                    if (validateEmail(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Email không hợp lệ!"));
                  },
                },
              ]}
            >
              <Input style={{ width: 300 }} onChange={handleEmailChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password không được để trống!!!" },
              ]}
            >
              <Input.Password style={{ width: 300 }} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Nhớ tài khoản</Checkbox>
              <Link style={{ position: "relative", left: 80 }}>
                Quên mật khẩu?
              </Link>
            </Form.Item>

            <Form.Item label={null}>
              <Button style={{ width: 300 }} type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <p>
            Bạn đã có tài khoản?<Link to={"/"}> Đăng ký</Link>
          </p>
        </div>
      </div>
    </>
  );
}
