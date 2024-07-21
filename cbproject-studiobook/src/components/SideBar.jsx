import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

const SideBar = () => {
  const [studioNavOpen, setStudioNavOpen] = useState(false);
  const [reservationNavOpen, setReservationNavOpen] = useState(false);
  const [reviewNavOpen, setReviewNavOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const payload = JSON.parse(atob(token.split(".")[1]));

    setRole(payload.role);
  }, []);

  const toggleStudioNav = () => {
    setStudioNavOpen(!studioNavOpen);
  };

  const toggleReservationNav = () => {
    setReservationNavOpen(!reservationNavOpen);
  };

  const toggleReviewNav = () => {
    setReviewNavOpen(!reviewNavOpen);
  };

  return (
    <Card className="sidebaradmin">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link collapse" to="/dashboard">
            <i className="fa fa-th-list"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {role === "OWNER" && (
          <>
            <li className="nav-heading">Manajemen</li>
            <li className="nav-item ">
              <a className={`nav-link collapsed ${studioNavOpen ? "expanded" : ""}`} onClick={toggleStudioNav} style={{ cursor: "pointer" }}>
                <i className="fa fa-server"></i>
                <span>Studio</span>
                <i className={`fa fa-chevron-down ms-auto ${studioNavOpen ? "rotate-icon" : ""}`}></i>
              </a>
              <ul className={`nav-content collapse ${studioNavOpen ? "show" : ""}`}>
                <li>
                  <Link to="/dashboard/kelola">
                    <i className="fa fa-circle-o"></i>
                    <span>Kelola Studio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <i className="fa fa-circl-o"></i>
                    <span>Kelola Ketersediaan Studio</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className={`nav-link collapsed ${reservationNavOpen ? "expanded" : ""}`} onClick={toggleReservationNav} style={{ cursor: "pointer" }}>
                <i className="fa fa-address-book"></i>
                <span>Reservasi</span>
                <i className={`fa fa-chevron-down ms-auto ${reservationNavOpen ? "rotate-icon" : ""}`}></i>
              </a>
              <ul className={`nav-content collapse ${reservationNavOpen ? "show" : ""}`}>
                <li>
                  <Link to="/dashboard/reservasi">
                    <i className="fa fa-circle-o"></i>
                    <span>Kelola Reservasi</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className={`nav-link collapsed ${reviewNavOpen ? "expanded" : ""}`} onClick={toggleReviewNav} style={{ cursor: "pointer" }}>
                <i className="fa fa-address-book"></i>
                <span>Review Pelanggan</span>
                <i className={`fa fa-chevron-down ms-auto ${reviewNavOpen ? "rotate-icon" : "180"}`}></i>
              </a>
              <ul className={`nav-content collapse ${reviewNavOpen ? "show" : ""}`}>
                <li>
                  <a href="/dashboard/#">
                    <i className="fa fa-circl-o"></i>
                    <span>Kelola Review</span>
                  </a>
                </li>
              </ul>
            </li>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <li className="nav-heading">Manajemen</li>
            <li className="nav-item ">
              <a className={`nav-link collapsed ${studioNavOpen ? "expanded" : ""}`} onClick={toggleStudioNav} style={{ cursor: "pointer" }}>
                <i className="fa fa-server"></i>
                <span>Kelola</span>
                <i className={`fa fa-chevron-down ms-auto ${studioNavOpen ? "rotate-icon" : ""}`}></i>
              </a>
              <ul className={`nav-content collapse ${studioNavOpen ? "show" : ""}`}>
                <li>
                  <Link to="/dashboard/kelola">
                    <i className="fa fa-circle-o"></i>
                    <span>Kelola Studio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/kelolauser">
                    <i className="fa fa-circle-o"></i>
                    <span>Kelola User</span>
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}

        <li className="nav-heading">Others</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/profile">
            <i className="fa fa-user"></i>
            <span>Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" style={{ cursor: "pointer" }}>
            <i className="fa fa-question-circle"></i>
            <span>F.A.Q</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/contact" style={{ cursor: "pointer" }}>
            <i className="fa fa-envelope"></i>
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </Card>
  );
};

export default SideBar;
