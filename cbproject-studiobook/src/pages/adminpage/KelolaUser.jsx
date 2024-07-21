import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Breadcrumb, Table, Modal, Button, Image, Card } from "react-bootstrap";
import AddUsers from "../../components/AddUsers";
import EditUserModal from "../../components/EditUsers"; // Import komponen EditUserModal
import withAuth from "../../hoc/withAuth";
import { getImageSrc } from "../../data/fun";

const KelolaUser = () => {
  const [Users, setUser] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data) {
            console.error("Internal Server Error: ", error.response.data);
          } else {
            console.error(`Error ${error.response.status}: ${error.response.data}`);
          }
        } else if (error.request) {
          console.error("No response received: ", error.request);
        } else {
          console.error("Error in setting up request: ", error.message);
        }
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  const handleEditShow = (User) => {
    setSelectedUser(User);
    setShowEditModal(true);
  };
  const handleEditClose = () => setShowEditModal(false);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
      getUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data) {
            console.error("Internal Server Error: ", error.response.data);
          } else {
            console.error(`Error ${error.response.status}: ${error.response.data}`);
          }
        } else if (error.request) {
          console.error("No response received: ", error.request);
        } else {
          console.error("Error in setting up request: ", error.message);
        }
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const getImageSrc = (image, image_url) => {
    if (isBase64(image)) {
      return `data:image/jpeg;base64,${image}`;
    }
    return `${image_url}`; // Assuming images are served from /images directory on your server
  };

  return (
    <div>
      <div className="pagetitle">
        <h4>Kelola User</h4>
        <Breadcrumb>
          <Breadcrumb.Item href="#" style={{ textDecoration: "none" }}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Kelola User</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "16px", borderRadius: "6px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
          <h5 className="fw-bold">Daftar User</h5>
          <Button className="btn btn-outline-light" onClick={handleAddShow}>
            <i className="fa-solid fa-plus fa-fade me-2"></i>Buat User Baru
          </Button>
        </div>
        <p className="mt-2">
          All User available will be displayed in the table, and only Admin/Owner User can run commands
          <a href="#" target="_blank">
            Create, Read, Update, and Delete
          </a>{" "}
          for the data of <code>User</code>
        </p>
        <Table hover size="min-vh-200 mt-5">
          <thead>
            <tr className="fw-bold">
              <th>Gambar</th>
              <th>Nama User</th>
              <th>Alamat</th>
              <th>Harga</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((User, index) => (
              <tr key={index}>
                <td>
                  <Image src={getImageSrc(User.image, User.image_url)} alt={User.name} rounded style={{ height: "64px", width: "64px", objectFit: "cover" }} />
                </td>
                <td>{User.name}</td>
                <td>{User.address}</td>
                <td>{User.price}</td>
                <td style={{ maxWidth: "200px" }}>{User.description}</td>
                <td className="col-lg-1">
                  <div className="d-flex flex-column gap-2">
                    <Button type="button" className="btn btn-secondary">
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                    <Button type="button" className="btn btn-info" onClick={() => handleEditShow(User)}>
                      <i className="fa-solid fa-pen-to-square" style={{ color: "white" }}></i>
                    </Button>
                    <Button onClick={() => deleteUser(User.id)} type="button" className="btn btn-danger">
                      <i className="fa fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showAddModal} onHide={handleAddClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Buat User Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUsers />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Menggunakan komponen EditUserModal */}
      {selectedUser && <EditUserModal show={showEditModal} handleClose={handleEditClose} user={selectedUser} getUsers={getUsers} />}
    </div>
  );
};

export default withAuth(KelolaUser);
