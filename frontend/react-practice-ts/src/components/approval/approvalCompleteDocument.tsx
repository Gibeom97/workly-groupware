import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import fontBase64 from "../../fonts/fontBase64.json"; // :흰색_확인_표시: 변환된 파일을 가져오기

// ✅ 한글 폰트 등록
pdfMake.vfs = {
  ...pdfFonts.pdfMake.vfs,
  ...fontBase64, // Base64 인코딩된 폰트 추가
};
pdfMake.fonts = {
  NotoSansKR: {
    normal: "NotoSansKR-Regular.ttf",
    bold: "NotoSansKR-Bold.ttf",
    italics: "NotoSansKR-Regular.ttf",
    bolditalics: "NotoSansKR-Bold.ttf"
  }
};



interface ApprovalCompleteDocumentProps {
  fileName?: string; // 저장된 파일 이름 (선택적)
  fileUrl?: string; // 파일의 URL (선택적)
}

export const ApprovalCompleteDocument: React.FC<ApprovalCompleteDocumentProps> = () => {
  const {approvalNo} = useParams();
  const [approvalContent, setApprovalContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("결재 문서.pdf"); // 제목을 useState로 관리
  const [fileUrl, setFileUrl] = useState<string>("https://www.orimi.com/pdf-test.pdf");
  const [error, setError] = useState<string | null>(null);
  const documentRef = useRef<HTMLDivElement>(null); //PDF 변환을 위한 참조
  const [generatedFileUrl, setGeneratedFileUrl] = useState<string | null>(null); // approvalContent 기반 PDF URL

  // PDF 변환 및 다운로드 기능
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: fileName,
  });

  useEffect(() => {
    if(!approvalNo) return;

    axios
      .get(`http://localhost:8003/workly/api/approval/getApprovalData`, {
        params: {approvalNo: Number(approvalNo)},
      })
      .then((response) => {
        if(response.data && response.data.approvalContent){
          setApprovalContent(response.data.approvalContent);

          // PDF 변환을 위한 문서 구조 생성
          const docDefinition = {
            content: [{text: response.data.approvalContent, font: "NotoSansKR", fontSize: 14}],
          };
          
          // PDF Blob 생성
          const pdfDocGenerator  = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBlob((blob) => {
            const pdfUrl = URL.createObjectURL(blob);
            setGeneratedFileUrl(pdfUrl);
            setFileName(response.data.approvalTitle ? `${response.data.approvalTitle}.pdf` : `결재문서.pdf`);
          });
        } else {
          setApprovalContent("내용을 불러올 수 없습니다.");
        }
      })
      .catch((err) => {
        console.error("문서 데이터 로드 실패:", err);
        setError("문서 내용을 불러오는 데 실패했습니다.");
      })
  }, [approvalNo]);
  

  return (
    <div style={containerStyle}>

      {/* 파일 정보 표시 */}
      <div style={fileInfoStyle}>
        <span style={fileNameStyle}>{fileName}</span>
        <a href={generatedFileUrl || fileUrl} download={fileName} style={downloadLinkStyle}>
          다운로드
        </a>
      </div>

 {/* ✅ 결재 문서 미리보기 */}
 <div ref={documentRef} style={previewContainerStyle}>
        <iframe
          src={generatedFileUrl || fileUrl} // approvalContent로 생성된 PDF를 우선 표시
          style={iframeStyle}
          title="문서 미리보기"
        ></iframe>
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

// ✅ **문서 내용 스타일**
const contentContainerStyle = {
  padding: "20px",
  textAlign: "left" as const,
  border: "1px solid #ddd",
  borderRadius: "5px",
  background: "#f9f9f9",
};

const contentTitleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const contentTextStyle = {
  fontSize: "14px",
  color: "#333",
  whiteSpace: "pre-line", // 줄바꿈 유지
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
};

const loadingStyle = {
  color: "#888",
  fontSize: "14px",
};


// ✅ **예제 화면 (테스트용)**
export const ExampleUsage = () => {
  return <ApprovalCompleteDocument />;
};

export default ApprovalCompleteDocument;
