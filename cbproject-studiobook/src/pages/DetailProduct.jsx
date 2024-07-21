import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import BookingForm from "../components/Booking";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailProduct = ({ user }) => {
  const { id } = useParams(); // Ambil parameter id dari URL
  const [studio, setStudio] = useState(null);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/studio/${id}`);
        setStudio(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pemesanan/studio/${id}`);
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudio();
    fetchBookings();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!studio) {
    return <p>Loading...</p>;
  }

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const getImageSrc = (image) => {
    if (isBase64(image)) {
      return `data:image/jpeg;base64,${image}`;
    }
    return `${image}`; // Assuming images are served from /images directory on your server
  };

  return (
    <div className="detailproduct">
      <div className="detailproduct-page">
        <Container className="mt-5 w-100">
          <Row>
            <Col className="text-center">
              <h1 className="text-center fw-bold">{studio.name}</h1>
              <p className="text-center">{studio.description}</p>
              {studio.image && (
                <img
                  src={getImageSrc(studio.image)}
                  alt={studio.name}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={7}>
              <h4 className="fw-bold">Deskripsi Product</h4>
              <p>{studio.description}</p>
              <div className="row pe-4 mt-5">
                <div className="col-lg-12">
                  <ul className="d-flex flex-wrap gap-4 text-center">
                    <li>
                      <i className="fa-solid fa-location-dot"></i>
                      <p className="fw-medium text-dark mt-2">
                        Alamat: <span className="fw-light opacity-75">{studio.address}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={12} lg={5}>
              <div className="box-payment">
                <BookingForm studio={studio} bookings={bookings} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default withAuth(DetailProduct);
