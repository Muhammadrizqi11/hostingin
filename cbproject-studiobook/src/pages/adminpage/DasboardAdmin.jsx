import React from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import HeaderAdmin from "../../components/HeaderAdmin";

const DashboardAdmin = ({ children }) => {    
  return (
      <div>
        <HeaderAdmin />
        <SideBar />
      </div>
    );
  
  
};

export default DashboardAdmin;
