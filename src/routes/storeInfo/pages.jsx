import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const StoreRegistration = () => {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bossId, setBossId] = useState("");
  const navigate = useNavigate();

  const getCookie = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) return value;
    }
    return null;
  };

  const jwtToken = getCookie("authToken");

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        console.log(decoded);

        const bossId = decoded._id;
        setBossId(bossId);

        console.log(`User ID: ${decoded._id}`);
      } catch (error) {
        console.error("Invalid JWT Token:", error);
      }
    } else {
      console.log("JWT token not found in cookies");
    }
  }, []);

  const resetForm = () => {
    setStoreName("");
    setStoreAddress("");
    setStoreDescription("");
    setStoreImage(null);
    setFileName("");
    setIsEditing(false);
  };

  useEffect(() => {
    if (bossId) {
      axios
        .get(`http://43.201.2.61/storeInfo/${bossId}`)
        .then((response) => {
          const { store_name, store_address, store_info, store_photo } = response.data || {};
          setStoreName(store_name || "");
          setStoreAddress(store_address || "");
          setStoreDescription(store_info || "");
          setFileName(store_photo || "");
          setIsEditing(!!response.data);
        })
        .catch((error) => console.error("Error fetching store data:", error));
    }
  }, [bossId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("store_name", storeName);
    formData.append("store_address", storeAddress);
    formData.append("store_info", storeDescription);
    if (storeImage) formData.append("store_photo", storeImage);

    try {
      if (isEditing) {
        await axios.put(`http://43.201.2.61/storeInfo/${bossId}`, formData);
        alert("가게 정보가 성공적으로 수정되었습니다!");
      } else {
        await axios.post(`http://43.201.2.61/storeInfo/${bossId}`, formData);
        alert("가게가 성공적으로 등록되었습니다!");
      }
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving store:", error);
      alert("가게 정보 저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 가게 정보를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://43.201.2.61/storeInfo/${bossId}`);
        alert("가게 정보가 성공적으로 삭제되었습니다!");
        resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting store:", error);
        alert("가게 삭제 중 오류가 발생했습니다.");
      }
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
                <p className="text-muted">
                  {isEditing ? "가게 정보를 수정하세요" : "가게 정보를 입력해주세요"}
                </p>
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
                  className="w-100 py-2 mb-2"
                  style={{ backgroundColor: "#4A90E2", borderColor: "#4A90E2" }}>
                  {isEditing ? "가게 정보 수정하기" : "가게 등록하기"}
                </Button>

                {isEditing && (
                  <Button
                    type="button"
                    variant="danger"
                    className="w-100 py-2"
                    onClick={handleDelete}>
                    가게 삭제하기
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreRegistration;
