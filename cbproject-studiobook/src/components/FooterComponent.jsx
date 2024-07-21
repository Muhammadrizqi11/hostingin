import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "boxicons";

const FooterComponent = () => {
  return (
    <div className="footer py-5">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold">Studiobook.</h3>
            <p className="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque dolor, molestiae sint eos consequatur sed laborum optio inventore debitis illum?</p>
            <div className="no mb-1 mt-4">
              <Link className="text-decoration-none">
                <i className="fa fa-whatsapp"></i>
                <p className="m-0">+62 877-9790-5819</p>
              </Link>
            </div>
            <div className="mail">
              <Link className="text-decoration-none">
                <i className="fa fa-envelope"></i>
                <p className="m-0">mhmmdrizqi2002@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            <Link to="">Home</Link>
            <Link to="fotografer">Fotografer</Link>
            <Link to="testimonial">Testimonial</Link>
            <Link to="faq">FAQ</Link>
            <Link to="syaratketen">Syarat & Ketentuan</Link>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Pesan dan kesan menarik kalian guys</h5>
            <div className="kesan">
              <input type="text" placeholder="haloooo" />
              <button className="btn btn-dark rounded-end rounded-0">Kirim</button>
            </div>
            <div className="sosmed mt-3">
              <i className="fa fa-brands fa-twitter"></i>
              <i className="fa fa-brands fa-facebook"></i>
              <i className="fa fa-brands fa-instagram"></i>
              <i className="fa fa-brands fa-linkedin"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">
              &copy; Copyright {new Date().getFullYear()} by <span className="fw-bold">muhammadrizqi</span>, Give u the best Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
