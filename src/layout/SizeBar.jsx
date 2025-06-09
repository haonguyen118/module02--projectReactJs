import { Link, NavLink, useNavigate } from "react-router-dom";

export default function SizeBar() {
  const navigate = useNavigate();
  const logout = () => {
    const confirm_logout = confirm("Bạn có chắc chắn muốn thoát không?");
    if (confirm_logout) {
      localStorage.removeItem("isLogin");
      navigate("/login");
    }
  };
  return (
    <div
      style={{
        width: 240,
        height: "100vh",
        backgroundColor: "#F6F8F9",
      }}
    >
      <p style={{ marginTop: 10 }}>
        <i
          style={{ color: "red" }}
          className="fa-solid fa-fire-flame-curved"
        ></i>{" "}
        Ecommence
      </p>
      <br />
      <div>
        {" "}
        <i className="fa-solid fa-house"></i>
        <NavLink to={"/admin/all"}> Thống kê</NavLink>
      </div>

      <br />
      <div>
        {" "}
        <i className="fa-solid fa-user-group"></i>
        <NavLink to={"/admin"} end>
          {" "}
          Quản lý tài khoản
        </NavLink>
      </div>
      <br />
      <div>
        {" "}
        <i className="fa-solid fa-image"></i>
        <NavLink to={"/admin/product"}> Quản lý sản phẩm</NavLink>
      </div>
      <br />
      <div style={{ display: "flex", gap: 5 }}>
        {" "}
        <i
          style={{ marginTop: 5 }}
          class="fa-solid fa-arrow-right-from-bracket"
        ></i>
        <p onClick={logout}> Đăng xuất</p>
      </div>
    </div>
  );
}
