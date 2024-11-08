import React from "react";
import Logo from "../Logo/Logo";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    if (location.pathname === "/board") {
      setActiveNav("board");
    } else if (location.pathname === "/dashboard") {
      setActiveNav("dashboard");
    }
  }, [location.pathname]);

  const handleClickBoard = () => {
    setActiveNav("board");
    navigate("/board");
  };

  const handleClickDash = () => {
    setActiveNav("dashboard");
    navigate("/dashboard");
  };

  const handleClickStore = () => {
    setActiveNav("storeInfo");
    navigate("/storeInfo");
  };

  return (
    <div
      style={{
        width: "240px",
        borderRight: "1px solid #e0e0e0",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}>
        <Logo />
        <span style={{ fontWeight: "bold", fontSize: "18px", position: "relative", top: "2px" }}>
          Fav
        </span>
      </div>

      <nav>
        <button
          onClick={() => handleClickDash("dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: location.pathname === "/dashboard" ? "#f0f0f0" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
          }}>
          <span style={{ marginRight: "10px", color: "black" }}>📊 대시보드</span>
        </button>
        <button
          onClick={() => handleClick("/board")}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: location.pathname === "/board" ? "#f0f0f0" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
          }}>
          <span style={{ marginRight: "10px", color: "black" }}>📋 게시판</span>
        </button>
        <button
          onClick={() => handleClickStore()}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: activeNav === "storeInfo" ? "#f0f0f0" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
          }}>
          <span style={{ marginRight: "10px", color: "black" }}>🏪 가게 정보</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
