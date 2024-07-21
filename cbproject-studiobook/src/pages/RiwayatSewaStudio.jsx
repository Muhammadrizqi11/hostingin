import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import axios from "axios";
import { Link } from "react-router-dom";

const RiwayatSewaStudio = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("User not authenticated");
          return;
        }

        // Decode the JWT token manually
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const userId = payload.userId; // Sesuaikan dengan struktur JWT Anda

        if (!userId) {
          setError("User ID not found in token");
          return;
        }

        const response = await axios.get(`http://localhost:5000/pemesanan/user/${userId}`);
        setRiwayat(response.data);
      } catch (err) {
        console.error("Terjadi kesalahan saat mengambil riwayat pemesanan:", err); // Log error
        setError(err.message);
      }
    };

    fetchRiwayat();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="riwayat-page">
      <Container className="ticket-container">
        {riwayat.map((reservation) => (
          <Row key={reservation.id} className="ticket-row d-flex justify-content-between align-items-center my-5">
            <Col className="ticket-details">
              <p>Id Pemesanan : {reservation.id}</p>
              <h3 className="fw-bold">{reservation.studio.name}</h3>
              <p className="fw-semibold mb-2">Sewa Studio untuk waktu pada {new Date(reservation.tanggalMulai).toLocaleString()}</p>
              <div className="d-flex gap-5">
                <span className="d-flex gap-3 text-dark">
                  <i className="fa fa-building"></i>
                  <p className="fw-semibold m-0">Ruang Studio {reservation.studio.name}</p>
                </span>
                <span className="d-flex gap-3 text-dark">
                  <i className="fa fa-clock"></i>
                  <p className="fw-semibold m-0">Durasi Sewa {reservation.durasi} Jam</p>
                </span>
              </div>
              <span className="d-flex gap-3 mt-3">
                <i className="fa fa-check-circle"></i>
                <p className="fw-semibold text-uppercase">TIKET PEMESANAN</p>
              </span>
              <Link to={`/detail-ticket/${reservation.id}`} className="d-flex gap-3 text-dark">
                <i className="fa fa-info-circle"></i>
                <p className="fw-semibold m-0">Detail Tiket</p>
              </Link>
            </Col>
            <Col>{reservation.studio.image && <img src={`data:image/jpeg;base64,${reservation.studio.image}`} alt={reservation.studio.name} className="rounded-3 ticket-image text-right" />}</Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default withAuth(RiwayatSewaStudio);
