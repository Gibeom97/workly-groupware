import React from "react";

interface ApprovalCompleteDocumentProps {
  fileName?: string; // 저장된 파일 이름 (선택적)
  fileUrl?: string; // 파일의 URL (선택적)
}

export const ApprovalCompleteDocument: React.FC<ApprovalCompleteDocumentProps> = ({
  fileName = "예시 문서.pdf", // ✅ 기본 파일명
  fileUrl = "https://www.orimi.com/pdf-test.pdf", // ✅ 기본 파일 URL (테스트용 PDF)
}) => {
  return (
    <div style={containerStyle}>

      {/* 파일 정보 표시 */}
      <div style={fileInfoStyle}>
        <span style={fileNameStyle}>{fileName}</span>
        <a href={fileUrl} download style={downloadLinkStyle}>
          다운로드
        </a>
      </div>

      {/* 문서 미리 보기 (PDF, 이미지 등 지원) */}
      <div style={previewContainerStyle}>
        {fileUrl.endsWith(".pdf") ? (
          <iframe src={fileUrl} style={iframeStyle} title="문서 미리보기"></iframe>
        ) : (
          <img src={fileUrl} alt="Uploaded Document" style={imageStyle} />
        )}
      </div>
    </div>
  );
};

// ✅ **스타일 정의**
const containerStyle = {
  maxWidth: "800px",
  margin: "1px auto",
  background: "#fff",
  borderRadius: "4px",
  textAlign: "center" as const,
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#202224",
  marginBottom: "20px",
};

const fileInfoStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "5px",
};

const fileNameStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333",
};

const downloadLinkStyle = {
  fontSize: "14px",
  color: "#4880FF",
  textDecoration: "none",
  fontWeight: "bold",
};

const previewContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

const iframeStyle = {
  width: "100%",
  height: "500px",
  border: "none",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "500px",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

// ✅ **예제 화면 (테스트용)**
export const ExampleUsage = () => {
  return <ApprovalCompleteDocument />;
};

export default ApprovalCompleteDocument;
