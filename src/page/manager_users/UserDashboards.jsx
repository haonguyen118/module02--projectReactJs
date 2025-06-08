import { Button, Input, Select } from "antd";
import ListUsers from "../../layout/ListUsers";
import AddUserModal from "../../layout/AddUserModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import { userFindAll } from "../../redux/api/service/userService";

export default function UserDashboards() {
  const { users } = useSelector((state) => state.users);
  const [tabActive, setTabActive] = useState(null);
  // const [inputSearch, setInputSearch] = useState(""); // State quản lý giá trị input tìm kiếm

  // ham search theo ten
  //   const handleInputSearch = (event) = {
  //     setInputSearch(event.target.value);

  // }
  const dispatch = useDispatch();
  const [filterUser, setFilterUser] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeActive = () => {
    if (tabActive === null) {
      setFilterUser(users);
    } else if (tabActive === 1) {
      setFilterUser(users.filter((item) => item.status));
    } else {
      setFilterUser(users.filter((item) => item.status));
    }
  };
  useEffect(() => {
    dispatch(userFindAll);
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <p style={{ fontSize: 24, fontFamily: "inte", fontWeight: 700 }}>
          Tài khoản
        </p>
        <Button type="primary" onClick={showModal}>
          Thêm mới tài khoản
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
        <Select
          style={{ width: 200 }}
          onChange={handleChangeActive}
          options={[
            { value: 1, label: "Đang hoạt động" },
            { value: 0, label: "Ngừng hoạt động" },
            { value: null, label: "Tất cả" },
          ]}
        ></Select>
        <Input
          // onChange={handleInputSearch}
          style={{ width: 200 }}
          type="search"
          name="search"
          placeholder="Tìm kiếm theo tên"
        ></Input>
      </div>
      <ListUsers />
      <AddUserModal
        handleCancel={handleCancel}
        handleChange={handleOk}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddUserModal>
    </>
  );
}
