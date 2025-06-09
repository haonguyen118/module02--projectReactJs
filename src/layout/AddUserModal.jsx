import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  notification,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAdd, userFindAll } from "../redux/api/service/userService";
import { useForm } from "antd/es/form/Form";
import bcrypt from "bcryptjs";

export default function AddUserModal({
  handleCancel,
  handleOk,
  isModalOpen,
  setIsModalOpen,
}) {
  const { users } = useSelector((state) => state.users);

  // console.log("users1", users);

  const dispatch = useDispatch();
  const [form] = useForm();
  const [validateStatus, setValidateStatus] = useState("");
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return regex.test(email);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setValidateStatus("success");
    } else {
      setValidateStatus("error");
    }
  };
  const onFinish = async (values) => {
    // ham ma hoa mat khau
    const salt = bcrypt.genSaltSync(10); // Tạo salt
    const hash = bcrypt.hashSync(values.password, salt); // Mã hóa password

    console.log("Success:", values);
    const emailExists = users.some((user) => user.email === values.email);
    if (emailExists) {
      notification.error({ message: "Email đã tồn tại😣", duration: 2 });
    } else {
      const newUser = {
        email: values.email,
        name: values.username,
        password: hash,
        dateOfBirth: values.dateOfBirth,
        created_at: new Date(),
        role: "Người dùng",
        status: 1,
      };
      await userAdd(newUser).then(() => dispatch(userFindAll()));
      notification.success({ message: "Thêm user thành công💐", duration: 2 });
    }
    setIsModalOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    dispatch(userFindAll());
  }, [dispatch]);
  return (
    <>
      <Modal
        style={{ gap: 20 }}
        title="Thêm mới tài khoản"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {" "}
        <Form
          form={form}
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
            <Input style={{ width: 480 }} />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Vui lòng nhap ngày sinh!!!!",
              },
            ]}
          >
            <Input style={{ width: 480 }} />
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
              style={{ width: 480 }}
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item
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
            <Input.Password style={{ width: 480 }} />
          </Form.Item>

          <p>Trạng thái</p>
          <Radio.Group
            options={[
              { value: 1, label: "Đang hoạt động" },
              { value: 0, label: "Ngừng hoạt động" },
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 5,
              position: "relative",
              left: 350,
              bottom: 0,
            }}
          >
            <Form.Item label={null}>
              <Button onClick={handleCancel} style={{ width: 50 }}>
                Huỷ
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                style={{ width: 50 }}
                type="primary"
                htmlType="submit"
                onClick={handleOk}
              >
                Thêm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
