import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditStudios = ({ studio, onClose }) => {
  const [image, setImage] = useState(studio.image || "");
  const [name, setName] = useState(studio.name || "");
  const [address, setAddress] = useState(studio.address || "");
  const [price, setPrice] = useState(studio.price || "");
  const [description, setDescription] = useState(studio.description || "");

  const navigate = useNavigate();

  useEffect(() => {
    setImage(studio.image);
    setName(studio.name);
    setAddress(studio.address);
    setPrice(studio.price);
    setDescription(studio.description);
  }, [studio]);

  const updateStudio = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/studio/${studio.id}`, {
        image,
        name,
        address,
        price: parseInt(price), // Pastikan harga dikirim sebagai angka
        description,
      });
      console.log("Studio updated successfully");
      onClose(); // Tutup modal setelah update
      navigate("/kelola");
    } catch (error) {
      console.log("Terjadi kesalahan saat menyimpan studio:", error.response ? error.response.data : error.message);
      alert("Gagal menyimpan studio: " + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <Form onSubmit={updateStudio} className="p-4">
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Gambar</Form.Label>
        <Form.Control type="text" placeholder="Gambar" value={image} onChange={(e) => setImage(e.target.value)} />
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
        <Form.Control as="textarea" rows={5} placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default EditStudios;
