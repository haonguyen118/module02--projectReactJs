import PrivateRoute from "../component/PrivateRoute";
import UserDashboards from "../page/manager_users/UserDashboards";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../page/dashboard/Dashboard";
import ProductManager from "../page/manager_products/ProductManager";

export const adminRoutes = {
  path: "admin",
  element: (
    // <PrivateRoute>
    <AdminLayout />
    // </PrivateRoute>
  ),
  children: [
    { index: 1, element: <UserDashboards /> },
    { path: "all", element: <Dashboard /> },
    { path: "product", element: <ProductManager /> },
  ],
};
