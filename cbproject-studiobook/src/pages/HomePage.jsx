import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/icon2.png";
import { dataSwiper } from "../data/index";
import { Link, useNavigate } from "react-router-dom";
import FaqComponent from "../components/FaqComponent";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

const HomePage = () => {
  const [kelasTerbaru, setsemuaKelas] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKelasTerbaru = async () => {
      try {
        const response = await axios.get("http://localhost:5000/studio");
        const semuaKelasServer = response.data;

        // Update data menyesuaikan bintang rating dan delay dengan data dari server
        const updatedSemuaKelas = semuaKelasServer.map((kelas) => {
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

    fetchKelasTerbaru();
  }, []);

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInLeft ">
                Abadikan <br /> <span>Momen Berhargamu</span> <br />
                Bersama Kami!
              </h1>
              <p className="mb-4 animate__animated animate__fadeInLeft ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae placeat voluptate, maiores ipsum est iure.</p>
              <button className="btn btn-dark -btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInLeft animate__delay-1s" onClick={() => navigate("/fotografer")}>
                Lihat Fotografer
              </button>
              <button className="btn btn-outline-dark -btn-lg rounded-1 mb-xs-0 mb-2 animate__animated animate__fadeInLeft animate__delay-1s">Lihat Jasa Foto</button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt5">
              <img src={HeroImage} alt="hero-img" className="animate__animated animate__fadeInRight animate__delay-1s" />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Fotografer Terbaru</h1>
              <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Col>
          </Row>
          <Row>
            {kelasTerbaru.map((kelas) => {
              return (
                <Col key={kelas.id} className="border border-dark shadow rounded" data-aos="fade-up" data-aos-duration="1100" data-aos-delay={kelas.delay}>
                  {kelas.image && <img src={isBase64(kelas.image) ? `data:image/jpeg;base64,${kelas.image}` : `${kelas.image}`} alt={kelas.name} className="w-100 mb-5 rounded-top" />}
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
                    <Link to={`/product/${kelas.id}`} className="btn btn-dark rounded-1">
                      Book Now
                    </Link>
                  </div>
                </Col>
              );
            })}
            <Col className="border border-dark shadow rounded" data-aos="fade-up" data-aos-duration="1000">
              <h5 className="mb-5 px-3">Tidak Menemukan Studio yang anda cari?</h5>
              <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                <p className="m-0 text-primary fw-bold"></p>
                <a href="https://www.google.com/maps/search/studio+terdekat/" className="btn btn-dark rounded-1">
                  Studio Terdekat
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <button className="btn btn-success rounded-5 btn-lg" data-aos="fade-up" data-aos-duration="1100" onClick={() => navigate("/fotografer")}>
                Lihat Semua Fotografer <i className="fa-solid fa-chevron-right ms-1"></i>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonial py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Testimonial</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((data) => {
                return (
                  <SwiperSlide key={data.id} className="shadow-sm">
                    <div className="people">
                      <img src={data.image} alt="" />
                      <div>
                        <h5 className="mb-1">{data.name}</h5>
                        <p className="m-0 fw-bold">{data.skill}</p>
                      </div>
                    </div>
                    <p className="desc">{data.desc}</p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Row>
        </Container>
      </div>
      {/* { Section FAQ} */}
      <FaqComponent />
      {/* { Section FAQ} */}
    </div>
  );
};

export default HomePage;
