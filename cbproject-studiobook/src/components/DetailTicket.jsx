import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import withAuth from "../hoc/withAuth";

const DetailTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pemesanan/${id}`);

      setTicket(response.data);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg('Tidak dapat terhubung ke server.');
      }
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleCancel = async () => {
    try {
      await axios.post(`http://localhost:5000/pembayaran/cancel/${id}`);
      setMsg('Tiket berhasil dibatalkan.');
      navigate('/riwayatpemesanan');
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg('Tidak dapat membatalkan tiket.');
      }
    }
  };

  const isExpired = ticket && (new Date() - new Date(ticket.createdAt) > 24 * 60 * 60 * 1000);
  const isCancelled = ticket && ticket.pembayaran[0].status === "cancelled";
  const handleRedirect = () => {
    window.location.href = ticket.pembayaran[0].redirectUrl;
  };

  const refreshhalaman = () => {
    window.location.reload();
  };

  return (
    <div className="riwayat-page">
      <Container className="ticket-container">
        <Row className="ticket-row d-flex justify-content-between align-items-center">
          <Col className="ticket-details">
            <Button variant="secondary" onClick={() => navigate('/riwayatpemesanan')} className="mb-3">Kembali</Button>
            {ticket ? (
              <>
                <p>Id Pemesanan: {ticket.id}</p>
                <h3 className="fw-bold">nama studio : {ticket.studio.name}</h3>
                <p className="fw-semibold mb-2">Sewa Studio untuk tanggal {new Date(ticket.tanggalMulai).toLocaleString()}</p>
                <div className="d-flex gap-5">
                  <span className="d-flex gap-3 text-dark">
                    <i className="fa fa-building"></i>
                    <p className="fw-semibold m-0">Ruang Studio {ticket.studio.name}</p>
                  </span>
                  <span className="d-flex gap-3 text-dark">
                    <i className="fa fa-clock"></i>
                    <p className="fw-semibold m-0">Durasi Sewa {ticket.durasi} Jam</p>
                  </span>
                </div>
                <span className="d-flex gap-3 mt-3">
                  <i className="fa fa-check-circle"></i>
                  <p className="fw-semibold text-uppercase">TIKET PEMESANAN</p>
                </span>
                <span className="d-flex gap-3 mt-3">
                  <i className="fa fa-info-circle"></i>
                  <p className="fw-semibold m-0">Status Pembayaran: {ticket.pembayaran[0].status}</p>
                </span>
                
                {isExpired ? (
                  <p className="text-danger">Tiket hangus karena sudah melewati waktu 24 jam untuk pembayaran.</p>
                ) : (
                  !isCancelled && (
                    <>
                    <Button onClick={handleRedirect} className="mt-3">Lanjutkan Pembayaran</Button>

                    <Button variant="danger" onClick={handleCancel}>Batalkan Pemesanan</Button>
                    </>
                  )
                  
                )}
                <Button variant="success" onClick={refreshhalaman} className="mt-3">
                  <i className="fa fa-refresh"></i>
                </Button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Col>
          <Col>
            {msg && <p>{msg}</p>}
            {ticket && <img src={`data:image/jpeg;base64,${ticket.studio.image}`} alt={ticket.studio.name} className="rounded-3 ticket-image text-right" />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withAuth(DetailTicket);
