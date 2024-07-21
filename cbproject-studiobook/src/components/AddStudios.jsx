import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddStudios = ({ onClose, revalidate }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const saveStudio = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "OWNER") return alert("You are not owner!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("userId", payload.userId);

    try {
      await axios.post("http://localhost:5000/studio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Studio created successfully");
      onClose();
      revalidate();
      navigate("/dashboard/kelola"); // Redirect after successful save
    } catch (error) {
      console.error("Error saving studio:", error);
      setError("Failed to save studio. Please try again.");
    }
  };

  return (
    <Form onSubmit={saveStudio} className="p-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Gambar</Form.Label>
        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nama Studio</Form.Label>
        <Form.Control type="text" placeholder="Nama Studio" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Alamat</Form.Label>
        <Form.Control type="text" placeholder="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Harga</Form.Label>
        <Form.Control type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Simpan
      </Button>
    </Form>
  );
};

export default AddStudios;
