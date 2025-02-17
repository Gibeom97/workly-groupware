import { useState } from "react";
import search from "../../assets/Images/chat/search.png";

const SearchClick = () => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 검색어 상태

  // 검색 API 요청 함수
  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // ✅ 빈 값 방지

    try {
      const response = await fetch(`http://localhost:8080/api/search?query=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("검색 실패");

      const data = await response.json();
      console.log("검색 결과:", data); // ✅ 응답 데이터 확인
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  // Enter 키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchClick" style={{ width: 274, height: 28, position: "relative" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ Enter 입력 시 검색 실행
        placeholder="이름 검색"
        style={{
          width: "225px",
          height: "28px",
          paddingLeft: "15px",
          paddingRight: "10px",
          borderRadius: "9999px",
          border: "1px solid #D9D9D9",
          outline: "none",
          fontSize: "14px",
          fontWeight: "600",
          color: "#B3B3B3",
        }}
        
      />
      {/* 검색 버튼 (클릭 시 검색 실행) */}
      <img onClick={handleSearch}
        className="noticeIcon" 
        style={{ width: "15px", height: "15px", left: "215px", top: "8px",right: "10px", cursor: "pointer", position: "absolute" }} 
        src={search} 
      />
    </div>
  );
};

export default SearchClick;

