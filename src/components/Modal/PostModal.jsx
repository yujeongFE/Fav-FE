import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const PostModal = ({ writing, onClose }) => {
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
                <button className="btn btn-danger flex-grow-1">바빠요</button>
                <button className="btn btn-warning flex-grow-1">보통이에요</button>
                <button className="btn btn-success flex-grow-1">여유로워요</button>
              </div>
            </div>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="게시글을 입력해주세요."></textarea>
            <button className="btn btn-primary w-100" onClick={onClose}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
