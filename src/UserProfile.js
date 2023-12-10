import React from "react";
import NavberTop from "./components/NavberTop";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const UserProfile = () => {
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const { email, image, username } = storageData;
  return (
    <>
      <NavberTop />
      <div className="my-4">
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Card body  className='p-4 card_position'>
                    <Card.Title className="text-center">User Details</Card.Title>
                    <div className="text-center mb-4">
                        <Image src={image} thumbnail />
                    </div>
                    <h5>User Name : {username}</h5>
                    <p>Email : {email}</p>
                </Card>
                </Col>
            </Row>
          
        </Container>
      </div>
    </>
  );
};

export default UserProfile;
