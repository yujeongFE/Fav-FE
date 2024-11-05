import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Header } from "../../components/Header/Header";
import { PostModal } from "../../components/Modal/PostModal";

const MessageCard = ({ content, date, status }) => (
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
          <small className="text-muted">{date}</small>
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
      <MessageCard content="오늘은 너무 더워요" date="2024.11.04" status="busy" />
      <MessageCard content="시럽이 너무 많아요" date="2024.11.04" status={null} />
      <MessageCard content="나는 너무너무 실상하고" date="2024.11.03" status="relaxed" />
      <MessageCard content="오늘의 특별 할인!" date="2024.11.04" status={null} />
      <MessageCard content="다음주에 새로운 메뉴 출시!" date="2024.11.03" status="busy" />
      <MessageCard content="고객님들의 소중한 의견을 주세요!" date="2024.11.02" status="relaxed" />
    </div>
  </main>
);

const Board = () => {
  const [writing, setWriting] = useState(false);

  const handleModalOpen = () => {
    setWriting(true);
  };

  const handleModalClose = () => {
    setWriting(false);
  };

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
