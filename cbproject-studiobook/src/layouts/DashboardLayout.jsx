import { Navigate, Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
  const token = localStorage.getItem("accessToken");
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (token === null) return <Navigate to="/" />;
  if (payload.role === "USER") return <Navigate to="/" />;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeaderAdmin />
      <div style={{ display: "flex", width: "100vw", overflow: "hidden", paddingTop: "96px", flex: "1 1 0%", gap: "16px", paddingLeft: "16px", paddingRight: "16px" }}>
        <SideBar />
        <div style={{ flex: "1 1 0%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
