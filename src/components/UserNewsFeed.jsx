import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // js-cookie를 추가하여 쿠키를 쉽게 관리합니다.

// 가짜 API 호출 함수 (실제 서버 데이터로 교체 가능)
const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  return data;
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
  const [userId, setUserId] = useState(null); // 유저 아이디 상태 추가

  useEffect(() => {
    // 쿠키에서 유저 아이디를 읽어옴
    const userIdFromCookie = Cookies.get("userId");
    setUserId(userIdFromCookie || "Guest"); // 유저 아이디가 없으면 "Guest"로 설정

    setLoading(true);
    const loadPosts = async () => {
      const data = await fetchPosts();
      setFeedItems(data);
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

  const handleFollow = (id) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, followed: !item.followed } : item
      )
    );
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/storeinfo/search?q=${query}`
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
        flexDirection: "column", // 세로로 배치
        alignItems: "center", // 가운데 정렬
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
          flexDirection: "column", // 세로로 배치
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* 로고 부분 */}
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

        {/* 유저 인사 문구 */}
        <span
          style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px" }}
        >
          안녕하세요 {userId} 님!
        </span>
      </div>

      {/* 검색창 부분 */}
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
                  key={item.id}
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
                      src={item.image} // item 객체에 가게 이미지를 포함했다고 가정
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
                      handleFollow(item.id);
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
