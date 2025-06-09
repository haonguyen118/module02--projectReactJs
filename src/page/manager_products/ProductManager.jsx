import { Button, Input, Select } from "antd";
export default function ProductManager() {
  const handleChange = () => {};
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
          Danh sách sản phẩm
        </p>
        <Button type="primary">Thêm mới sản phẩm</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
        <Select
          defaultValue="Tất cả"
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: "true", label: "Đang bán" },
            { value: "false", label: "Ngừng bán" },
            { value: "null", label: "Tất cả" },
          ]}
        ></Select>
        <Input
          style={{ width: 200 }}
          type="search"
          name="search"
          placeholder="search product by name"
        ></Input>
      </div>
      <div
        style={{
          fontSize: 30,
          fontFamily: "inherit",
          display: "flex",
          justifyContent: "center",
          marginTop: 300,
          marginLeft: 150,
          gap: 20,
        }}
      >
        <i
          style={{ marginTop: 8, color: "blue" }}
          className="fa-solid fa-spinner"
        ></i>
        <p>Đang cập nhật</p>
      </div>
    </>
  );
}
