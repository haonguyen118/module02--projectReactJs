export default function Dashboard() {
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
          Thống kê
        </p>

        <div
          style={{
            fontSize: 30,
            fontFamily: "inherit",
          }}
        >
          <i
            style={{ marginTop: 300, marginRight: 500, color: "blue" }}
            className="fa-solid fa-spinner"
          ></i>
          <p>Đang cập nhật</p>
        </div>
      </div>
    </>
  );
}
