import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

const StoreRegistration = () => {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Store Name:", storeName);
    console.log("Store Address:", storeAddress);
    console.log("Store Description:", storeDescription);
    console.log("Store Image:", storeImage);
  };

  return (
    <div className="d-flex flex-column flex-md-row vw-100 vh-100">
      <Container fluid className="flex-grow-1 bg-light p-4 overflow-auto">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h1 className="mb-4 text-center">가게 등록</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="storeName">
                    <Form.Label>가게 이름</Form.Label>
                    <Form.Control
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="storeAddress">
                    <Form.Label>가게 주소</Form.Label>
                    <Form.Control
                      type="text"
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="storeDescription">
                    <Form.Label>가게 설명</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="storeImage">
                    <Form.Label>가게 사진</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setStoreImage(e.target.files[0])}
                      accept="image/*"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                      가게 등록하기
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StoreRegistration;
