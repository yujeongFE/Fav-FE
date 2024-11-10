import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Utility function to decode JWT and extract user ID
const getUserInfoFromToken = () => {
  const token = Cookies.get("authToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return { id: decoded._id, name: decoded.name };
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
      return { id: null, name: null };
    }
  }
  return { id: null, name: null };
};

// Fetch posts for followed stores
const fetchFollowedPosts = async (userId) => {
  try {
    const token = Cookies.get("authToken");
    const response = await fetch(
      `http://43.201.2.61:3000/posts/followed/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching followed posts:", error);
    return [];
  }
};

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function FeedItem({ item, onLike, onFollow }) {
  const content = item.content || "";

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "20px",
        width: "100%",
        padding: "16px",
        marginBottom: "10px",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <img
            src={item.image}
            alt={`${item.title} 가게 이미지`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                {item.title}
              </h2>
              <span style={{ fontSize: "14px", color: "#666" }}>
                {item.time}
              </span>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#333" }}>
              {content}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => onLike(item.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: item.liked ? "red" : "#666",
            }}
            aria-label={item.liked ? "좋아요 취소" : "좋아요"}
          >
            <HeartIcon filled={item.liked} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserNewsFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const { id: fetchedUserId, name: fetchedUserName } = getUserInfoFromToken();
    setUserId(fetchedUserId);
    setUserName(fetchedUserName);

    const loadPosts = async () => {
      setLoading(true);
      if (fetchedUserId) {
        const data = await fetchFollowedPosts(fetchedUserId);
        setFeedItems(data);
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

  const handleLike = (id) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const sendFollowRequest = async (storeId) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Auth Token:", token);
      if (!token) {
        throw new Error("인증 토큰을 찾을 수 없습니다");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      console.log("팔로우 요청 보내는 중:", { userId, storeId });

      const response = await fetch("http://43.201.2.61:3000/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, storeId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "팔로우 요청 실패");
      }

      return data;
    } catch (error) {
      console.error("팔로우 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const handleFollow = async (storeId) => {
    try {
      console.log("가게 팔로우/언팔로우 시도:", storeId);
      const result = await sendFollowRequest(storeId);
      console.log("팔로우 요청 결과:", result);
      setSearchResults((prev) =>
        prev.map((item) =>
          item._id === storeId ? { ...item, followed: !item.followed } : item
        )
      );
      // 팔로우/언팔로우 후 피드 새로고침
      const updatedFeed = await fetchFollowedPosts(userId);
      setFeedItems(updatedFeed);
    } catch (error) {
      console.error("가게 팔로우 실패:", error.message);
      alert(`가게 팔로우 실패: ${error.message}`);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      try {
        const token = Cookies.get("authToken");
        const response = await fetch(
          `http://43.201.2.61:3000/storeinfo/search?q=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const results = await response.json();
        setSearchResults(results);
      } catch (error) {
        console.error("검색 중 오류가 발생했습니다.", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "40vh",
        margin: "0 auto",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BpDKq494k2vGEAtePMrbcfdRmb8N5d.png"
          alt="커피 컵 로고"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <span
          style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px" }}
        >
          안녕하세요 {userName ? userName : "Guest"} 님!
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "8px",
          marginBottom: "16px",
          position: "relative",
        }}
      >
        <input
          type="text"
          placeholder="검색..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "24px",
            outline: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            backgroundColor: "white",
            color: "black",
          }}
        />
        {searchQuery && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 1,
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div
                  key={item._id}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`${item.store_name} 이미지`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span>{item.store_name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow(item._id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1a73e8",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {item.followed ? "팔로우 취소" : "팔로우"}
                  </button>
                </div>
              ))
            ) : (
              <div style={{ padding: "8px", textAlign: "center" }}>
                검색 결과 없음
              </div>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "100%" }}>
          {feedItems.map((item) => (
            <FeedItem
              key={item.id}
              item={item}
              onLike={handleLike}
              onFollow={handleFollow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
