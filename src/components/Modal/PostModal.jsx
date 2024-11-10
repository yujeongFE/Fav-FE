import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const PostModal = ({ writing, onClose }) => {
  const [content, setContent] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      boss_id: "672cc71589f2134d84012164",
      content: content,
      is_open: true,
      crowd_level: crowdLevel,
    };

    try {
      const response = await axios.post("http://localhost:3000/posts", postData);
      console.log("Post created:", response.data);

      onClose(); // 모달 닫기
      setContent(""); // 내용 초기화
      setCrowdLevel(""); // 혼잡도 초기화
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
            <h5 className="modal-title fw-bold">메가커피 성수역점</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <p className="mb-2">혼잡도</p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={() => setCrowdLevel("HIGH")}>
                  바빠요
                </button>
                <button
                  className="btn btn-warning flex-grow-1"
                  onClick={() => setCrowdLevel("MEDIUM")}>
                  보통이에요
                </button>
                <button
                  className="btn btn-success flex-grow-1"
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
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
