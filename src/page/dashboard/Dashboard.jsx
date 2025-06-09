export default function Dashboard() {
  return (
    <>
      <p style={{ fontSize: 24, fontFamily: "inte", fontWeight: 700 }}>
        Thống kê
      </p>

      <div
        style={{
          fontSize: 30,
          fontFamily: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 150,
          marginTop: 300,
          gap: 20,
        }}
      >
        <i style={{ color: "blue" }} className="fa-solid fa-spinner"></i>
        <p>Đang cập nhật</p>
      </div>
    </>
  );
}
