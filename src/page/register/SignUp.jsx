import { Button, Checkbox, Form, Input, notification } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userAdd, userFindAll } from "../../redux/api/service/userService";

export default function Register() {
  //tao useState luu gia tri password
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  //lay danh sach users tu server
  const { users } = useSelector((state) => state.users);
  console.log("users1", users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validateStatus, setValidateStatus] = useState("");
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return regex.test(email);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const handleChangePassword = () => {
  //   const salt = bcrypt.genSaltSync(10); // Tạo salt
  //   const hash = bcrypt.hashSync(password, salt); // Mã hóa password
  //   setHashedPassword(hash); // Lưu hashed password
  //   console.log("hash", hash);
  //   bcrypt.compare(password, hash, (err, result) => {
  //     if (err) {
  //       console.error("Không trung khớp");
  //       return;
  //     }
  //     if (result) {
  //       console.log("Mật khẩu khớp!");
  //     } else {
  //       console.log("Mật khẩu không khớp!");
  //     }
  //   });
  // };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setValidateStatus("success");
    } else {
      setValidateStatus("error");
    }
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    //tao ham ma hoa mat khau

    //tao ham check email
    const emailExists = users.some((user) => user.email === values.email);
    if (emailExists) {
      notification.error({ message: "Email đã tồn tại", duration: 2 });
    } else {
      const newUser = {
        email: values.email,
        name: values.username,
        password: values.password,
        created_at: new Date(),
        role: "Người dùng",
        status: 1,
      };
      await userAdd(newUser).then(() => dispatch(userFindAll()));
      notification.success({
        message: "Chúc mừng bạn đã đăng ký thành công!!!💐",
        duration: 2,
      });
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(userFindAll());
  }, [dispatch]);
  return (
    <div>
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

            maxWidth: 600,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <p style={{ fontSize: 30 }}>Đăng ký tài khoản</p>
          <p style={{ fontSize: 12, color: "grey" }}>
            Đăng ký tài khoản để sử dụng dịch vụ
          </p>
          <br />
          <Form
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống!!!!",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>
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
              <Input
                placeholder="you@gmail.com"
                style={{ width: 300 }}
                onChange={handleEmailChange}
              />
            </Form.Item>

            <Form.Item
              onChange={handleChangePassword}
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống!!!!" },
                {
                  min: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự!",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt!",
                },
              ]}
            >
              <Input.Password style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmpassword"
              rules={[
                { required: true, message: "Mật khẩu không được để trống!!!!" },
                {
                  min: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự!",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt!",
                },
              ]}
            >
              <Input.Password style={{ width: 300 }} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>
                Bạn đồng ý với{" "}
                <Link className="text-teal-600">chính sách và điều khoản</Link>
              </Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button style={{ width: 300 }} type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
            <p>
              Bạn đã có tài khoản?<Link to={"/login"}> Đăng nhập</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
