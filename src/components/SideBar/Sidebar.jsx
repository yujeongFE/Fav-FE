import React, { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    if (location.pathname === "/page/board") {
      setActiveNav("board");
    } else if (location.pathname === "/page/dashboard") {
      setActiveNav("dashboard");
    } else if (location.pathname === "/page/storeInfo") {
      setActiveNav("storeInfo");
    }
  }, [location.pathname]);

  const handleClickBoard = () => {
    setActiveNav("board");
    navigate("/page/board");
  };

  const handleClickDash = () => {
    setActiveNav("dashboard");
    navigate("/page/dashboard");
  };

  const handleClickStore = () => {
    setActiveNav("storeInfo");
    navigate("/page/storeInfo");
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
          onClick={handleClickDash}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: activeNav === "dashboard" ? "#f0f0f0" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
          }}>
          <span style={{ marginRight: "10px", color: "black" }}>📊 대시보드</span>
        </button>

        <button
          onClick={handleClickBoard}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: activeNav === "board" ? "#f0f0f0" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
          }}>
          <span style={{ marginRight: "10px", color: "black" }}>📋 게시판</span>
        </button>

        <button
          onClick={handleClickStore}
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
