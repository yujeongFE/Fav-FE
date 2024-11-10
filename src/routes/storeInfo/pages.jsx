import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios"; 

const StoreRegistration = () => {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("store_name", storeName);
    formData.append("store_address", storeAddress);
    formData.append("store_info", storeDescription);
    if (storeImage) formData.append("store_photo", storeImage); // 파일이 있을 때만 추가
    formData.append("boss_id", "672cc71589f2134d84012164"); // 예시 boss_id를 추가합니다.

    try {
      const response = await axios.post("http://localhost:3000/storeInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Store successfully registered:", response.data);
      alert("가게가 성공적으로 등록되었습니다!");

      setStoreName("");
      setStoreAddress("");
      setStoreDescription("");
      setStoreImage(null);
      setFileName("");
    } catch (error) {
      console.error("Error registering store:", error);
      alert("가게 등록 중 오류가 발생했습니다.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setStoreImage(file);
    setFileName(file ? file.name : "");
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 vw-100"
      style={{ backgroundColor: "#FFECB3" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
                  style={{ width: "64px", height: "64px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B4B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <h2 className="mt-3 mb-1">안녕하세요, 사장님!</h2>
                <p className="text-muted">가게 정보를 입력해주세요</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>가게 이름</Form.Label>
                  <Form.Control
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>가게 주소</Form.Label>
                  <Form.Control
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>가게 설명</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>가게 사진</Form.Label>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => document.getElementById("storeImage").click()}
                      className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="me-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      파일 선택
                    </Button>
                    <Form.Control
                      id="storeImage"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {fileName && <span className="ms-2 text-muted">{fileName}</span>}
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2"
                  style={{ backgroundColor: "#4A90E2", borderColor: "#4A90E2" }}>
                  가게 등록하기
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreRegistration;
