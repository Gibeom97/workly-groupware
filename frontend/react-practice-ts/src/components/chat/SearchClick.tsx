import { useState } from "react";
import search from "../../assets/Images/chat/search.png";
import { Member } from "../../type/chatType";

interface SearchClickProps {
  onProfileClick: (member: Member) => void; // ✅ Chat.tsx에서 받은 함수 실행
}

const SearchClick: React.FC<SearchClickProps> = ({ onProfileClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);

  // ✅ 검색 API 요청
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8003/workly/api/chat/search?userName=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("검색 실패");

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSearchResults([]);
    }
  };

  // ✅ Enter 키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchClick" style={{ width: "274px", position: "relative" }}>
      {/* 🔹 검색 입력창 */}
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="이름 검색"
          style={{
            width: "205px",
            height: "32px",
            padding: "0 40px 0 12px",
            borderRadius: "16px",
            border: "1px solid #D9D9D9",
            outline: "none",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
          }}
        />
        <img
          onClick={handleSearch}
          className="searchIcon"
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            right: "25px",
            cursor: "pointer",
          }}
          src={search}
          alt="search"
        />
      </div>

      {/* 🔹 검색 결과 출력 */}
      {searchTerm && (
        <ul
          style={{
            position: "absolute",
            top: "38px",
            width: "255px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto",
            padding: "5px 0",
            listStyle: "none",
            zIndex: 10,
            margin: 0,
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((member) => (
              <li
                key={member.userNo}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background-color 0.2s",
                }}
                onClick={() => onProfileClick(member)} 
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#202224" }}>{member.userName}</div>
                  <div style={{ fontSize: "12px", color: "#8C8C8D" }}>
                    {member.deptName} · {member.positionName}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li
              style={{
                padding: "12px 16px",
                fontSize: "14px",
                color: "#8C8C8D",
                textAlign: "center",
              }}
            >
              없는 사원입니다.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchClick;
