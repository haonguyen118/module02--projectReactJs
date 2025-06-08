import { Button, Input, Select } from "antd";
import ListUsers from "../../layout/ListUsers";
import AddUserModal from "../../layout/AddUserModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userFindAll } from "../../redux/api/service/userService";

export default function UserDashboards() {
  const { users } = useSelector((state) => state.users);

  const [inputSearch, setInputSearch] = useState(""); // State quản lý giá trị input tìm kiếm
  const [searchData, setSearchData] = useState([...users]);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userFindAll);
  }, [dispatch]);

  // ham search theo ten
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    let filteredData = [...users]; // Khởi tạo filteredData từ users

    if (inputSearch !== "" && status !== null) {
      filteredData = filteredData
        .filter((e) => e.name.toLowerCase().includes(inputSearch.toLowerCase()))
        .filter((e) => e.status == status);
    } else if (inputSearch !== "" && status === null) {
      filteredData = filteredData.filter((e) =>
        e.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
    } else if (inputSearch === "" && status !== null) {
      filteredData = filteredData.filter((e) => e.status == status);
    }

    setSearchData(filteredData); // Cập nhật searchData với kết quả đã lọc
  }, [inputSearch, status, users]); // Thêm users vào dependency array

  const handleFilterStatus = (status) => {
    setStatus(status);
  };

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
          defaultValue={null}
          style={{ width: 200 }}
          onChange={handleFilterStatus}
          options={[
            { value: true, label: "Đang hoạt động" },
            { value: false, label: "Ngừng hoạt động" },
            { value: null, label: "Tất cả" },
          ]}
        ></Select>
        <Input
          onChange={handleInputSearch}
          style={{ width: 200 }}
          type="search"
          name="search"
          placeholder="Tìm kiếm theo tên"
        ></Input>
      </div>
      <ListUsers searchData={searchData} />
      <AddUserModal
        handleCancel={handleCancel}
        handleChange={handleOk}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddUserModal>
    </>
  );
}
