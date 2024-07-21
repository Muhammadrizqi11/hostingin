import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PemilihanLogin = () => {
  let navigate = useNavigate();
  return (
    <div className="body-pemilihan">
      <div className="pemilihan">
        <Container className="container-pemilihan ">
          <Button className="btn-ajadeh btn btn-light border" onClick={() => navigate("/")}>
            <i className="fa fa-chevron-left "></i>
          </Button>
          <Row>
            <Col>
              <h2 className="text-center mb-2 fw-bold">Studiobook</h2>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <Button variant="primary" type="submit" className="btn-pemilihan btn btn-light opacity-75 rounded-1 me-2 mb-xs-0 mb-2 mt-4 border" onClick={() => navigate("/login")}>
                <i className="fa fa-user fw-bold"></i> Login Sebagai User
              </Button>
              <Button variant="primary" type="submit" className="btn-pemilihan btn btn-light opacity-75 rounded-1 me-2 mb-xs-0 mb-2 mt-4 border" onClick={() => navigate("/loginowner")}>
                <i className="fa fa-camera fw-bold"></i> Login Sebagai Pemilik Jasa/Studio
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PemilihanLogin;
