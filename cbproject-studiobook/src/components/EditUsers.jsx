import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditUserModal = ({ show, handleClose, user, getUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    instagram: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        instagram: user.instagram || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/user/${user.id}`, formData);
      getUsers();
      handleClose();
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formRole" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" name="role" value={formData.role} onChange={handleChange} required>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formInstagram" className="mt-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
