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
          defaultValue="All"
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: "Selling", label: "Selling" },
            { value: "Stop selling", label: "Stop seling" },
            { value: "All", label: "All" },
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

          marginTop: 250,
          marginLeft: 400,
        }}
      >
        <i
          style={{ marginLeft: 100, color: "blue" }}
          className="fa-solid fa-spinner"
        ></i>
        <p>Đang cập nhật</p>
      </div>
    </>
  );
}
