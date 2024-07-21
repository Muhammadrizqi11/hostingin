import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Breadcrumb } from "react-bootstrap";

const Reservasi = () => {
  const [pemesanans, setPemesanans] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getPemesanans();
  }, []);

  const getPemesanans = async () => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    try {
      const response = await axios.get(`http://localhost:5000/pemesanan/owner/${payload.userId}`);
      setPemesanans(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="pagetitle">
        <h4>Reservasi Studio</h4>
        <Breadcrumb>
          <Breadcrumb.Item href="#" style={{ textDecoration: "none" }}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Reservasi studio</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "16px", borderRadius: "6px" }}>
        <p className="mt-2">
          Semua pemesanan studio akan ditampilkan di tabel dan hanya Admin/Owner Studio yang dapat menjalankan perintah
          <a href="#" target="_blank">
            Create, Read, Update, dan Delete
          </a>{" "}
          untuk data <code>Studio</code>
        </p>
        <Table hover size="min-vh-200 mt-5">
          <thead>
            <tr className="fw-bold">
              <th>User</th>
              <th>Studio</th>
              <th>Tanggal Sewa</th>
              <th>Durasi</th>
              <th>Total Bayar</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pemesanans.map((pemesanan, index) => (
              <tr key={index}>
                <td>{pemesanan.user.name}</td>
                <td>{pemesanan.studio.name}</td>
                <td>
                  {new Date(pemesanan.tanggalMulai).toLocaleDateString()} - {new Date(pemesanan.tanggalSelesai).toLocaleDateString()}
                </td>
                <td>{pemesanan.durasi} jam</td>
                <td>{pemesanan.totalHarga}</td>
                <td>{pemesanan.pembayaran[0].status}</td>
                <td className="col-lg-1">
                  <div className="d-flex flex-column gap-2">
                    <Button type="button" className="btn btn-secondary">
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                    {/* Tambahkan logika untuk aksi lainnya jika diperlukan */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Reservasi;
