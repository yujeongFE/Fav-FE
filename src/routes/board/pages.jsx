import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Header } from "../../components/Header/Header";
import { PostModal } from "../../components/Modal/PostModal";
const postId = "672cc71589f2134d84012164";

const Board = () => {
  const [writing, setWriting] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleModalOpen = () => {
    setWriting(true);
  };

  const handleModalClose = () => {
    setWriting(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts?id=${postId}`);
        setPosts(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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

  const MessageCard = ({ content, updated_at, status }) => (
    <div className={`card mb-3 ${status ? "bg-light" : ""}`}>
      <div className="card-body">
        <div className="d-flex">
          <img
            src="https://github.com/mdo.png"
            alt="User Avatar"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <div className="flex-grow-1">
            <p className="mb-1">{content}</p>
            <small className="text-muted">{formatDate(updated_at)}</small>
          </div>
          {status && (
            <button className={`btn btn-sm ${status === "busy" ? "btn-danger" : "btn-success"}`}>
              {status === "busy" ? "혼잡해요" : "여유로워요"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const MainContent = ({ handleModalOpen }) => (
    <main className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h2">메가커피 성수역점</h1>
          <div className="mt-2">
            <button className="btn bg-primary me-2" style={{ color: "white" }}>
              사장님
            </button>
            <button className="btn btn-outline-secondary">고객님</button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleModalOpen}>
          글 추가하기
        </button>
      </div>

      <div className="overflow-auto flex-grow-1">
        {posts.map((post) => (
          <MessageCard
            key={post._id}
            content={post.content}
            updated_at={post.updated_at}
            status={post.crowd_level}
          />
        ))}
      </div>
    </main>
  );

  return (
    <div className="d-flex vh-100" style={{ width: "100vw" }}>
      <Sidebar writing={writing} />
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <Header />
        <MainContent handleModalOpen={handleModalOpen} />
        <PostModal writing={writing} onClose={handleModalClose} />
      </div>
    </div>
  );
};

export default Board;
