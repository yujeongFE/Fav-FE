import React from "react";
import { useState } from "react";

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState(false);
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
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#0066FF",
            borderRadius: "8px",
            marginRight: "12px",
          }}></div>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Fav</span>
      </div>

      <nav>
        <button
          onClick={() => setActiveNav("dashboard")}
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
          onClick={() => setActiveNav("board")}
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
      </nav>
    </div>
  );
};

export default Sidebar;
