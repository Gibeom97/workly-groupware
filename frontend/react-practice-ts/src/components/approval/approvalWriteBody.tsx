import React, { useState } from "react";

const ApprovalWriteBody = () => {
  const [content, setContent] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div
      data-svg-wrapper
      style={{
        display: "flex",
        justifyContent: "center", // 중앙 정렬
        alignItems: "center",
      }}
    >
        {/* 텍스트 입력 영역 */}
        <textarea
        value={content}
        onChange={handleChange}
        placeholder={"내용을 입력하세요"}
        style={{
            //position: "absolute",
            width: "870px", // ✅ 기존보다 더 작은 크기로 조정 (예: 900px)
            height: "440px", // ✅ 높이 유지
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
            backgroundColor: "transparent",
            color: "black",
            resize: "none", // 크기 조절 불가능하게 설정
            overflowY: "auto",
            textAlign: "left",
            marginTop: "-30px",
        }}
        />
    </div>
  );
};

export default ApprovalWriteBody;
