import React, { useState, useEffect } from "react";

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();
  return data; // 받은 데이터를 그대로 반환
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

function FeedItem({ item, onLike, onToggleDetails }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "20px",
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
              {item.message}
            </p>
          </div>
        </div>
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
      {item.showDetails && (
        <div style={{ marginTop: "12px", fontSize: "14px", color: "#333" }}>
          {item.details}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <button
          onClick={() => onToggleDetails(item.id)}
          style={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {item.showDetails ? "접기" : "더보기"}
        </button>
      </div>
    </div>
  );
}

export default function UserNewsFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 데이터 로딩 (fetch 요청)
  useEffect(() => {
    setLoading(true);
    const loadPosts = async () => {
      const data = await fetchPosts();
      setFeedItems(data); // 받아온 데이터를 상태에 설정
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

  const handleToggleDetails = (id) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = feedItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* App Icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "#f0f0f0",
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
      </div>

      {/* Search Bar */}
      <div
        style={{
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
          onFocus={() => setSearchExpanded(true)}
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
        {searchExpanded && searchQuery && (
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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchExpanded(false);
                    setSearchQuery(item.title);
                  }}
                >
                  {item.title}
                </div>
              ))
            ) : (
              <div style={{ padding: "8px", color: "#999" }}>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feed Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          feedItems.map((item) => (
            <FeedItem
              key={item.id}
              item={item}
              onLike={handleLike}
              onToggleDetails={handleToggleDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}
