import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Header } from "../../components/Header/Header";
import { PostModal } from "../../components/Modal/PostModal";

const Board = () => {
  const [writing, setWriting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const handleModalOpen = () => {
    setWriting(true);
  };

  const handleModalClose = () => {
    setWriting(false);
    setCurrentPost(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = async (id) => {
    const postToEdit = posts.find((post) => post._id === id);
    setCurrentPost(postToEdit); 
    setWriting(true);

    // 필요한 수정 데이터 예시
    const updatedData = {
      content: postToEdit.content,
      is_open: postToEdit.is_open,
      crowd_level: postToEdit.crowd_level,
    };

    try {
      const response = await axios.put(`http://localhost:3000/posts/${id}`, updatedData);

      // 수정된 포스트로 상태 업데이트
      const updatedPost = response.data;
      setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
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

  const MessageCard = ({ content, updated_at, status, postId, onEdit, onDelete }) => (
    <div
      className={`card mb-3 shadow-sm rounded-lg ${status === "busy" ? "border-danger" : "border-success"}`}>
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
            <span className={`badge ${status === "busy" ? "bg-danger" : "bg-success"}`}>
              {status === "busy" ? "혼잡해요" : "여유로워요"}
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

  const MainContent = ({ handleModalOpen }) => (
    <main className="flex-grow-1 p-4 white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">메가커피 성수역점</h1>
          <div className="mt-2">
            <button className="btn btn-outline-primary me-2">사장님</button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleModalOpen}>
          <i className="bi bi-plus-circle me-2"></i> 글 추가하기
        </button>
      </div>

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
        <MainContent handleModalOpen={handleModalOpen} />
        <PostModal writing={writing} onClose={handleModalClose} post={currentPost} />
      </div>
    </div>
  );
};

export default Board;
