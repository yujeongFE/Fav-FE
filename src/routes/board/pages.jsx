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

  const jwtToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("authToken"))
    ?.split("=")[1];
  useEffect(() => {
    if (jwtToken) {
      try {
        const { _id: bossId } = jwtDecode(jwtToken);
        setBossId(bossId);
      } catch (error) {
        console.error("Invalid JWT Token:", error);
      }
    }
  }, [jwtToken]);

  useEffect(() => {
    if (bossId) {
      fetchPosts(bossId);

      const fetchStoreName = async () => {
        try {
          const response = await axios.get(`http://43.201.2.61/storeInfo/${bossId}`);
          setStore_Name(response.data.store_name);
        } catch (error) {
          console.error("Error fetching store name:", error);
        }
      };

      fetchStoreName();
    }
  }, [bossId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://43.201.2.61/posts/${bossId}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchStoreName = async () => {
    try {
      const response = await axios.get(`http://43.201.2.61/posts/${bossId}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching store name:", error);
    }
  };

  const handleModalOpen = () => setWriting(true);
  const handleModalClose = () => {
    setWriting(false);
    setCurrentPost(null);
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post._id === id);
    if (!isAmericanoPost(postToEdit)) {
      setCurrentPost(postToEdit);
      setWriting(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://43.201.2.61/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const selectRandomWinner = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setWinner(posts[Math.floor(Math.random() * posts.length)]);
      setIsSpinning(false);
    }, 2000);
  };

  const resetWinner = () => setWinner(null);

  const isAmericanoPost = (post) => {
    return (
      post.content && post.content.includes("Congratulations! The winner for the Americano is:")
    );
  };

  return (
    <div className="d-flex vh-100 vw-100">
      <Sidebar writing={writing} />
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <Header />
        <main className="flex-grow-1 p-4 white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold">{store_Name}</h1>
            <button className="btn btn-primary" onClick={handleModalOpen}>
              <i className="bi bi-plus-circle me-2"></i> 글 추가하기
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
              <div
                key={post._id}
                className={`card mb-3 shadow-sm rounded-lg ${post.crowd_level === "busy" ? "border-danger" : "border-success"} ${winner && winner._id === post._id ? "border-primary border-4" : ""}`}>
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
                      <p className="mb-1 text-truncate">{post.content}</p>
                      <small className="text-muted">{formatDate(post.updated_at)}</small>
                    </div>
                    {!isAmericanoPost(post) && ( // Hide crowd level badge for Americano posts
                      <span
                        className={`badge ${post.crowd_level === "HIGH" ? "bg-danger" : post.crowd_level === "MEDIUM" ? "bg-warning" : "bg-success"}`}>
                        {post.crowd_level === "HIGH"
                          ? "혼잡해요"
                          : post.crowd_level === "MEDIUM"
                            ? "보통이에요"
                            : "여유로워요"}
                      </span>
                    )}
                    <div className="ms-3">
                      {!isAmericanoPost(post) && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleEdit(post._id)}>
                            <i className="bi bi-pencil"></i> 수정
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => handleDelete(post._id)}>
                            <i className="bi bi-trash"></i> 삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <PostModal
          writing={writing}
          onClose={handleModalClose}
          post={currentPost}
          onPostUpdated={fetchPosts}
        />
      </div>
    </div>
  );
};

export default Board;
