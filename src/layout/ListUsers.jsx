import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userFindAll } from "../redux/api/service/userService";
import DeleteCofirmModal from "./DeleteCofirmModal";
import EditUserModal from "./EditUserModal";

export default function ListUsers({ searchData }) {
  const { users } = useSelector((state) => state.users);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [oldStatus, setOldStatus] = useState(null);
  const [id, setId] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const showModalEdit = (id) => {
    setDataEdit(users.find((e) => e.id === id));

    setId(id);
    setIsModalEditOpen(true);
  };
  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };
  const showModal = (myId, myOldStatus) => {
    setId(myId);
    setOldStatus(myOldStatus);
    setIsModalDeleteOpen(true);
  };
  const handleOk = () => {
    setIsModalDeleteOpen(false);
  };
  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (oldStatus == 1) {
      await deleteUser(0, id).then(() => dispatch(userFindAll()));
    } else {
      await deleteUser(1, id).then(() => dispatch(userFindAll()));
    }
    setIsModalDeleteOpen(false);
  };
  useEffect(() => {
    dispatch(userFindAll());
  }, [dispatch]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Quyền hạn",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status ? (
            <Tag color="success">Đang hoạt động</Tag>
          ) : (
            <Tag color="error">Ngừng hoạt động</Tag>
          )}
        </>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "active",
      key: "active",
      render: (_, record) => (
        <Space size="middle">
          <i
            style={{ color: "blue" }}
            className="fa-solid fa-pencil"
            onClick={() => showModalEdit(record.id)}
          ></i>
          <i
            style={{ color: "red" }}
            className="fa-solid fa-trash-can"
            onClick={() => showModal(record.id, record.status)}
          ></i>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <Table
          style={{
            width: 1140,
            alignContent: "center",
            top: 194.5,
            left: 264,
          }}
          dataSource={searchData}
          columns={columns}
        />
      </div>
      <DeleteCofirmModal
        isModalDeleteOpen={isModalDeleteOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        handleDelete={handleDelete}
        oldStatus={oldStatus}
      />

      <EditUserModal
        isModalEditOpen={isModalEditOpen}
        showModalEdit={showModalEdit}
        setIsModalEditOpen={setIsModalEditOpen}
        dataEdit={dataEdit}
        handleEditOk={handleEditOk}
      />
    </>
  );
}
