import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan Anda mengimpor axios

const FotograferPage = () => {
  const [semuaKelas, setsemuaKelas] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsemuaKelas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/studio");
        const semuaKelasServer = response.data;

        // Update data menyesuaikan bintang rating dan delay dengan data dari server
        const updatedSemuaKelas = semuaKelasServer.map(kelas => {
          const getRandomStar = () => (Math.random() > 0.5 ? "fa-solid fa-star" : "fa-solid fa-star-half-stroke");
            const getRandomDelay = () => Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
        
            return {
              ...kelas,
              star1: "fa-solid fa-star",
              star2: "fa-solid fa-star",
              star3: "fa-solid fa-star",
              star4: getRandomStar(),
              star5: getRandomStar(),
              delay: getRandomDelay(),
            };
          
        });

        setsemuaKelas(updatedSemuaKelas);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        } else {
          setMsg("Tidak dapat terhubung ke server.");
        }
      }
    };

    fetchsemuaKelas();
  }, []);

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="studios-page">
      <div className="studios min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">Semua Studio</h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est aliquam esse illum eveniet placeat cumque.</p>
            </Col>
          </Row>
          <Row>
            {semuaKelas.map((kelas) => {
              return (
                <Col key={kelas.id} className="border border-dark shadow rounded" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={kelas.delay}>
                  {kelas.image && (
                    <img
                      src={isBase64(kelas.image) ? `data:image/jpeg;base64,${kelas.image}` : `${kelas.image}`}
                      alt={kelas.name}
                      className="w-100 mb-5 rounded-top"
                    />
                  )}
                  <div className="star mb-2 px-3">
                    <i className={kelas.star1}></i>
                    <i className={kelas.star2}></i>
                    <i className={kelas.star3}></i>
                    <i className={kelas.star4}></i>
                    <i className={kelas.star5}></i>
                  </div>
                  <h5 className="mb-5 px-3">{kelas.name}</h5>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                    <p className="m-0 text-primary fw-bold">{kelas.price}</p>
                    <a href={`product/${kelas.id}`} className="btn btn-dark rounded-1">book now</a>
                  </div>
                </Col>
              );
              
            })}
                 <Col className="border border-dark shadow rounded" data-aos="fade-up" data-aos-duration="1000" >
                
                <h5 className="mb-5 px-3">Tidak Menemukan Studio yang anda cari?</h5>
                <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                  <p className="m-0 text-primary fw-bold"></p>
                  <a href="https://www.google.com/maps/search/studio/" className="btn btn-dark rounded-1">Studio Terdekat</a>
                </div>
              </Col>

          </Row>
          <Row>
          <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s mt-3">Cari Studio Terdekat Anda</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d94659.67126584469!2d108.85239774335456!3d-6.912010404860451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sstudio!5e0!3m2!1sen!2sid!4v1720800664173!5m2!1sen!2sid" width="1200" height="600" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </Row>
        </Container>
      </div>

      <FaqComponent />
    </div>
  );
};

export default FotograferPage;
