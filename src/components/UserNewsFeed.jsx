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
    console.log("Fetching posts for user:", userId);
    const response = await fetch(`http://43.201.2.61/posts/followed/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    console.log("Fetched posts:", data);
    return data;
  } catch (error) {
    console.error("Error fetching followed posts:", error);
    return [];
  }
};

function FeedItem({ post }) {
  const content = post.content || "";
  const storeName = post.store_name || "Unknown Store";
  const storePhoto = post.photo || "/placeholder.svg";

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "20px",
        width: "100%",
        padding: "16px",
        marginBottom: "10px",
        backgroundColor: "white",
      }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}>
            {storeName}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}>
            <span style={{ fontSize: "14px", color: "#666" }}>
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#333" }}>{content}</p>
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

      const response = await fetch("http://43.201.2.61/api/follow", {
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
      console.log("Following/Unfollowing store:", storeId);
      const result = await sendFollowRequest(storeId);
      console.log("Follow/Unfollow result:", result);
      setSearchResults((prev) =>
        prev.map((item) => (item._id === storeId ? { ...item, followed: !item.followed } : item))
      );
      // 팔로우/언팔로우 후 즉시 피드 새로고침
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

        const response = await fetch(`http://43.201.2.61/storeInfo/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        width: "40vh",
        height: "100vh",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
      }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#f0f0f0",
          zIndex: 10,
          padding: "16px 0",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px",
          }}>
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

          <span style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px" }}>
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
          }}>
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
              }}>
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
                    }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}>
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
                      }}>
                      {item.followed ? "팔로우 취소" : "팔로우"}
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ padding: "8px", textAlign: "center" }}>검색 결과 없음</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexGrow: 1, overflowY: "auto", padding: "0 16px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          feedItems.map((post) => <FeedItem key={post._id} post={post} />)
        )}
        {/* 디버그 정보 */}
      </div>
    </div>
  );
}
