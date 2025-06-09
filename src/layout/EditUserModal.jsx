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
import bcrypt from "bcryptjs";

import {
  userAdd,
  userFindAll,
  userUpdate,
} from "../redux/api/service/userService";
import { useForm } from "antd/es/form/Form";

export default function EditUserModal({
  isModalEditOpen,
  showModalEdit,
  setIsModalEditOpen,
  dataEdit,
  handleEditOk,
}) {
  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const [form] = useForm();

  console.log("users1", users);
  const handleCancel = () => {
    setIsModalEditOpen(false);
  };

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
    console.log("Success:", values);

    const updateUser = {
      email: values.email,
      name: values.username,

      dateOfBirth: values.dateOfBirth,
      created_at: new Date(),
      role: values.role,
      status: values.status,
    };
    await userUpdate(updateUser, dataEdit.id).then(() =>
      dispatch(userFindAll())
    );
    notification.success({ message: "Cập nhật thành công", duration: 2 });

    setIsModalEditOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    console.log("dataedit", dataEdit);

    if (dataEdit) {
      form.setFieldsValue({
        username: dataEdit.name,
        email: dataEdit.email,

        dateOfBirth: dataEdit.dateOfBirth,
        status: dataEdit.status,
        role: dataEdit.role,
      });
    }
    dispatch(userFindAll());
  }, [dataEdit]);
  return (
    <>
      <Modal
        style={{ gap: 20 }}
        title="Cập nhật tài khoản"
        open={isModalEditOpen}
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
                message: "Họ và tên không được để trống!!!!",
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
                message: "Vui lòng nhập ngày sinh!!!!",
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
              disabled
              placeholder="you@gmail.com"
              style={{ width: 480 }}
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Radio.Group
              options={[
                { value: 1, label: "Đang hoạt động" },
                { value: 0, label: "Ngừng hoạt động" },
              ]}
            />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Radio.Group
              options={[
                { value: "Quản trị viên", label: "Quản trị viên" },
                { value: "Người dùng", label: "Người dùng" },
              ]}
            />
          </Form.Item>

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
                style={{ width: 70 }}
                type="primary"
                htmlType="submit"
                onClick={handleEditOk}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
