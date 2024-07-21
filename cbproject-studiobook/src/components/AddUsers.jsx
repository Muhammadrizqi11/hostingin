import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [profile_picture, setPicture] = useState(null);
  const [instagram, setInstagram] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("instagram", instagram);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);

    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User created successfully");
      navigate("/dashboard/kelola"); // Redirect after successful save
    } catch (error) {
      console.error("Error saving User:", error);
      setError("Failed to save User. Please try again.");
    }
  };

  return (
    <Form onSubmit={saveUser} className="p-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formProfilePicture">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" onChange={(e) => setPicture(e.target.files[0])} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formIntagram">
        <Form.Label>Instagram</Form.Label>
        <Form.Control type="text" placeholder="Instagram required for Owner" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nama User</Form.Label>
        <Form.Control type="text" placeholder="Nama User" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="OWNER">OWNER</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="**********" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Simpan
      </Button>
    </Form>
  );
};

export default AddUsers;
