import { Container, Navbar, Nav, Dropdown, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [payload, setPayload] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsLoggedIn(true);
      setPayload(payload);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setShowLogoutModal(false); // Close the modal
    alert("You have been logged out.");
    navigate("/");
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const ProfileMenu = () => (
    <span onClick={handleDropdownToggle} className="profile-menu">
      <img src="\src\assets\img\testimonial\people-1.jpg" alt="Profile" style={{ borderRadius: "50%", marginRight: "8px", maxWidth: "30px" }} />
      {payload.name}
    </span>
  );

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: "white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Container>
          <Navbar.Brand href="/dashboard" className="fs-4 fw-bold">
            Studiobook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "end" }}>
            <div className="d-flex align-items-center">
              <div style={{ position: "relative", marginRight: "10px" }}>
                <input type="text" placeholder="Search" className="form-control mr-sm-2" />
                <i className="fa fa-search" style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} />
              </div>
              <Dropdown alignRight show={showDropdown} onToggle={handleDropdownToggle}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <ProfileMenu />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#action/3.1">Action</Dropdown.Item>
                  <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleShowLogoutModal}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HeaderAdmin;
