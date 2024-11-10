import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";

export const PostModal = ({ writing, onClose, post, onPostUpdated }) => {
  const [content, setContent] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bossId, setBossId] = useState(null);

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setCrowdLevel(post.crowd_level);
      setIsEditing(true);
    } else {
      setContent("");
      setCrowdLevel("");
      setIsEditing(false);
    }
  }, [post]);

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
  }, [jwtToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      boss_id: bossId,
      content: content,
      is_open: true,
      crowd_level: crowdLevel,
    };

    try {
      let response;
      if (isEditing && post) {
        response = await axios.put(`http://localhost:3000/posts/${post._id}`, postData);
      } else {
        response = await axios.post("http://localhost:3000/posts", postData);
      }

      await onPostUpdated(response.data); // 수정된 부분: 상태 업데이트 대기
      onClose(); // 모달 닫기
      setContent("");
      setCrowdLevel("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error posting data:", error.response || error.message);
    }
  };

  return (
    <div
      className={`modal ${writing ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="modal-title fw-bold">{isEditing ? "수정하기" : "새 게시물 작성"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {isEditing && (
              <div className="alert alert-info mb-3">
                <strong>수정 중입니다!</strong> 기존 게시물을 수정 중입니다.
              </div>
            )}
            <div className="mb-3">
              <p className="mb-2">혼잡도</p>
              <div className="d-flex gap-2">
                <button
                  className={`btn flex-grow-1 ${
                    crowdLevel === "HIGH" ? "btn-danger active" : "btn-outline-danger"
                  }`}
                  onClick={() => setCrowdLevel("HIGH")}>
                  바빠요
                </button>
                <button
                  className={`btn flex-grow-1 ${
                    crowdLevel === "MEDIUM" ? "btn-warning active" : "btn-outline-warning"
                  }`}
                  onClick={() => setCrowdLevel("MEDIUM")}>
                  보통이에요
                </button>
                <button
                  className={`btn flex-grow-1 ${
                    crowdLevel === "LOW" ? "btn-success active" : "btn-outline-success"
                  }`}
                  onClick={() => setCrowdLevel("LOW")}>
                  여유로워요
                </button>
              </div>
            </div>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="게시글을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              {isEditing ? "수정하기" : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
