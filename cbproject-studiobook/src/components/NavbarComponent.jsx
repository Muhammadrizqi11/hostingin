import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../data/index";
import { NavLink, Link } from "react-router-dom";

const NavbarComponent = () => {
  let navigate = useNavigate();
  const [changeColor, setChangeColor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);

    const token = localStorage.getItem("accessToken");
    if (token) {
      // Decode the JWT token manually
      const payload = JSON.parse(atob(token.split(".")[1]));

      const name = payload.name;
      if (name) {
        setUsername(name);
      }
      const role = payload.role;
      if (role) {
        setRole(role);
      }
      setIsLoggedIn(true);
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
      <img src="/src/assets/img/testimonial/people-1.jpg" alt="Profile" style={{ borderRadius: "50%", marginRight: "8px", maxWidth: "30px" }} />
      {username}
    </span>
  );

  return (
    <div>
      <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
        <Container>
          <Navbar.Brand href="/" className="fs-4 fw-bold">
            Studiobook.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              {navLinks.map((link) => (
                <div className="nav-link" key={link.path}>
                  <NavLink to={link.path} className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")} end>
                    {link.text}
                  </NavLink>
                </div>
              ))}
            </Nav>
            <div className="text-center">
              {isLoggedIn ? (
                <>
                  <Dropdown alignRight show={showDropdown} onToggle={handleDropdownToggle}>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <ProfileMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/editprofile">
                        Edit Profile
                      </Dropdown.Item>

                      <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleShowLogoutModal}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <button className="btn btn-outline-dark rounded-1 me-2 mb-xs-0" onClick={() => navigate("/regisfor")}>
                    Daftar
                  </button>
                  <button className="btn btn-outline-dark rounded-1" onClick={() => navigate("/loginfor")}>
                    Login
                  </button>
                </>
              )}
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
    </div>
  );
};

export default NavbarComponent;
