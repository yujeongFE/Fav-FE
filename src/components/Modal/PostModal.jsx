import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const PostModal = ({ writing, onClose, post }) => {
  const [content, setContent] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 중 상태 추가

  // 수정 모드일 경우 기존 데이터 로드
  useEffect(() => {
    if (post) {
      setContent(post.content);
      setCrowdLevel(post.crowd_level);
      setIsEditing(true); // 수정 모드 활성화
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      boss_id: "672cc71589f2134d84012164",
      content: content,
      is_open: true,
      crowd_level: crowdLevel,
    };

    try {
      if (isEditing && post) {
        // 수정할 때는 PUT 요청
        const response = await axios.put(
          `http://localhost:3000/posts/${post._id}`, // 게시물 ID를 URL에 추가하여 PUT 요청
          postData
        );
        console.log("Post updated:", response.data);
      } else {
        // 새로운 게시물일 경우 POST 요청
        const response = await axios.post("http://localhost:3000/posts", postData);
        console.log("Post created:", response.data);
      }

      onClose(); // 모달 닫기
      setContent(""); // 내용 초기화
      setCrowdLevel(""); // 혼잡도 초기화
      setIsEditing(false); // 수정 모드 초기화
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
              {isEditing ? "수정하기" : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
