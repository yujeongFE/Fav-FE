import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jwtDecode } from "jwt-decode";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainContent = () => {
  const [userName, setUserName] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [bossId, setBossId] = useState(null);
  const todayDate = new Date().toLocaleDateString();

  const times = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const [followerData, setFollowerData] = useState(Array(times.length).fill(0));
  const [visitorData, setVisitorData] = useState(Array(times.length).fill(0));
  const [salesData, setSalesData] = useState(Array(times.length).fill(0));

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
      fetch(`http://localhost:3000/dashboard/${bossId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched dashboard data:", data);
          setDashboardData(data);
          setUserName(data?.boss_id?.name || "");
          console.log(userName);
        })
        .catch((error) => console.error("대시보드 데이터를 가져오는데 실패했습니다.", error));
    }
  }, [bossId]);

  const incrementData = (data, index, increment) => {
    const newData = [...data];
    newData[index] += increment;
    return newData;
  };

  useEffect(() => {
    const updateFollowerCount = setInterval(() => {
      setFollowerData((prevData) => incrementData(prevData, new Date().getHours(), 1));
    }, 15000);

    const updateVisitorCount = setInterval(
      () => {
        setVisitorData((prevData) => incrementData(prevData, new Date().getHours(), 1));
      },
      Math.random() * 5000 + 5000
    );

    const updateSalesAmount = setInterval(() => {
      setSalesData((prevData) => incrementData(prevData, new Date().getHours(), 10000));
    }, 30000);

    return () => {
      clearInterval(updateFollowerCount);
      clearInterval(updateVisitorCount);
      clearInterval(updateSalesAmount);
    };
  }, []);

  const getChartData = (data, label) => ({
    labels: times,
    datasets: [
      {
        label: label,
        data: data,
        borderColor:
          label === "팔로우 수" ? "#0066FF" : label === "방문자 수" ? "#888888" : "#28a745",
        fill: false,
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "5px" }}>
            안녕하세요 <span style={{ color: "#0066FF" }}>{userName}</span>님,
          </h1>
          <p style={{ color: "#666" }}>오늘의 대시보드입니다.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "20px",
          }}>
          {[
            {
              title: "팔로우 수",
              value: `${followerData.reduce((a, b) => a + b, 0)}명`,
              icon: "👥",
            },
            {
              title: "방문자 수",
              value: `${visitorData.reduce((a, b) => a + b, 0)}명`,
              icon: "🚶",
            },
            {
              title: "매출액",
              value: `${salesData.reduce((a, b) => a + b, 0) / 10000}만원`,
              icon: "💰",
            },
          ].map((metric, index) => (
            <div
              key={index}
              style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ marginRight: "10px", fontSize: "24px" }}>{metric.icon}</span>
                <span style={{ color: "#666", fontSize: "14px" }}>{metric.title}</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{metric.value}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>팔로우 수 차트</h2>
          <Line data={getChartData(followerData, "팔로우 수")} options={options} />
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>방문자 수 차트</h2>
          <Line data={getChartData(visitorData, "방문자 수")} options={options} />
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>매출액 차트</h2>
          <Line data={getChartData(salesData, "매출액")} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
