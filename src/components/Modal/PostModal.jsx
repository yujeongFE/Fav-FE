import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";

export const PostModal = ({ writing, onClose, post, onPostUpdated, storeId }) => {
  const [content, setContent] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bossId, setBossId] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAmericanoGame, setShowAmericanoGame] = useState(false);

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
        setBossId(decoded._id);
      } catch (error) {
        console.error("Invalid JWT Token:", error);
      }
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

      await onPostUpdated();
      onClose();
      setContent("");
      setCrowdLevel("");
      setIsEditing(false);
      setShowAmericanoGame(false); // Reset game section visibility
    } catch (error) {
      console.error("Error posting data:", error.response || error.message);
    }
  };

  const selectRandomWinner = async () => {
    setIsSpinning(true);

    try {
      // Fetch followers of the store using storeId
      const response = await axios.get(`http://localhost:3000/followers/${storeId}`);
      const followerIds = response.data.followers;

      if (followerIds.length === 0) {
        alert("No followers to choose from.");
        setIsSpinning(false);
        return;
      }

      // Randomly select a follower
      const randomIndex = Math.floor(Math.random() * followerIds.length);
      const selectedFollower = followerIds[randomIndex];
      setWinner(selectedFollower);
      setIsSpinning(false);

      // Create a winner announcement post
      const winnerPostData = {
        boss_id: bossId,
        content: `🎉 축하합니다! 랜덤 아메리카노 추첨 당첨자는: ${selectedFollower}님 입니다!`,
        is_open: true,
        crowd_level: "LOW",
      };

      await axios.post("http://localhost:3000/posts", winnerPostData);
      await onPostUpdated();
      alert("Winner has been announced in a new post!");
    } catch (error) {
      console.error("Error selecting random winner:", error);
    } finally {
      setIsSpinning(false);
    }
  };

  const resetWinner = () => setWinner(null);

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
              onClick={() => {
                onClose();
                setShowAmericanoGame(false);
              }}
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {!showAmericanoGame && (
              <>
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
                <button className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>
                  {isEditing ? "수정하기" : "등록하기"}
                </button>

                <button
                  className="btn btn-success w-100 mb-4"
                  onClick={() => setShowAmericanoGame(true)}>
                  랜덤 아메리카노 게임
                </button>
              </>
            )}

            {showAmericanoGame && (
              <>
                <h5 className="mb-3">랜덤 아메리카노 게임</h5>
                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={selectRandomWinner}
                  disabled={isSpinning}>
                  {isSpinning ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"></span>
                      선택 중...
                    </>
                  ) : (
                    <>당첨자 뽑기</>
                  )}
                </button>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={resetWinner}
                  disabled={!winner}>
                  초기화
                </button>
                {winner && (
                  <div className="alert alert-success mt-3" role="alert">
                    <h6 className="alert-heading">🎉 당첨자</h6>
                    <p>{winner}</p>
                  </div>
                )}
                <button
                  className="btn btn-outline-primary w-100 mt-3"
                  onClick={() => setShowAmericanoGame(false)}>
                  게시물 작성으로 돌아가기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
