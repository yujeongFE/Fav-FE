import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Header } from "../../components/Header/Header";
import { PostModal } from "../../components/Modal/PostModal";
import { jwtDecode } from "jwt-decode";

const Board = () => {
  const [writing, setWriting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [bossId, setBossId] = useState("");
  const [store_Name, setStore_Name] = useState("");
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

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

  useEffect(() => {
    if (bossId) {
      fetchPosts(bossId);

      const fetchStoreName = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/storeInfo/${bossId}`);
          setStore_Name(response.data.storeName);
        } catch (error) {
          console.error("Error fetching store name:", error);
        }
      };

      fetchStoreName();
    }
  }, [bossId]);

  const handleModalOpen = () => {
    setWriting(true);
  };

  const handleModalClose = () => {
    setWriting(false);
    setCurrentPost(null);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${bossId}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post._id === id);
    setCurrentPost(postToEdit);
    setWriting(true);
  };

  const handlePostUpdated = async (updatedPost) => {
    try {
      // 글이 등록 또는 수정된 후 서버에서 최신 글 목록을 다시 가져옵니다.
      const response = await axios.get(`http://localhost:3000/posts/${bossId}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching updated posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("ko-KR", options);
  };

  const selectRandomWinner = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setWinner(posts[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  const resetWinner = () => {
    setWinner(null);
  };

  const MessageCard = ({ content, updated_at, status, postId, onEdit, onDelete, isWinner }) => (
    <div
      className={`card mb-3 shadow-sm rounded-lg ${status === "busy" ? "border-danger" : "border-success"} ${
        isWinner ? "border-primary border-4" : ""
      }`}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src="https://github.com/mdo.png"
            alt="User Avatar"
            width="40"
            height="40"
            className="rounded-circle me-3"
          />
          <div className="flex-grow-1">
            <p className="mb-1 text-truncate">{content}</p>
            <small className="text-muted">{formatDate(updated_at)}</small>
          </div>
          {status && (
            <span
              className={`badge ${
                status === "HIGH" ? "bg-danger" : status === "MEDIUM" ? "bg-warning" : "bg-success"
              }`}>
              {status === "HIGH" ? "혼잡해요" : status === "MEDIUM" ? "보통이에요" : "여유로워요"}
            </span>
          )}
          <div className="ms-3">
            <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(postId)}>
              <i className="bi bi-pencil"></i> 수정
            </button>
            <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => onDelete(postId)}>
              <i className="bi bi-trash"></i> 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <main className="flex-grow-1 p-4 white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">{store_Name}</h1>
          <button className="btn btn-outline-primary mt-2 me-2">사장님</button>
        </div>
        <button className="btn btn-primary" onClick={handleModalOpen}>
          <i className="bi bi-plus-circle me-2"></i> 글 추가하기
        </button>
      </div>

      <div className="mb-4">
        <h2 className="h4 mb-3">랜덤 아메리카노 게임</h2>
        <button
          className="btn btn-success me-2"
          onClick={selectRandomWinner}
          disabled={isSpinning || posts.length === 0}>
          {isSpinning ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"></span>
              선택 중...
            </>
          ) : (
            <>
              <i className="bi bi-cup-hot me-2"></i>
              당첨자 뽑기
            </>
          )}
        </button>
        <button className="btn btn-outline-secondary" onClick={resetWinner} disabled={!winner}>
          <i className="bi bi-arrow-counterclockwise me-2"></i>
          초기화
        </button>
      </div>

      {winner && (
        <div className="alert alert-success mb-4" role="alert">
          <h4 className="alert-heading">🎉 당첨자</h4>
          <p>{winner.content}</p>
          <hr />
          <p className="mb-0">작성 시간: {formatDate(winner.updated_at)}</p>
        </div>
      )}

      <div className="overflow-auto">
        {posts.map((post) => (
          <MessageCard
            key={post._id}
            postId={post._id}
            content={post.content}
            updated_at={post.updated_at}
            status={post.crowd_level}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isWinner={winner && winner._id === post._id}
          />
        ))}
      </div>
    </main>
  );

  return (
    <div className="d-flex vh-100 vw-100">
      <Sidebar writing={writing} />
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <Header />
        <MainContent />
        <PostModal
          writing={writing}
          onClose={handleModalClose}
          post={currentPost}
          onPostUpdated={handlePostUpdated}
        />
      </div>
    </div>
  );
};

export default Board;
