import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake"; // HTML → pdfMake 변환 라이브러리
import fontBase64 from "../../fonts/fontBase64.json"; // 한글 폰트 로드

// 한글 폰트 등록
pdfMake.vfs = {
  ...(pdfFonts.pdfMake.vfs?.vfs || {}),
  ...fontBase64, // Base64 인코딩된 폰트 추가
};
pdfMake.fonts = {
  NotoSansKR: {
    normal: "NotoSansKR-Regular.ttf",
    bold: "NotoSansKR-Bold.ttf",
    italics: "NotoSansKR-Regular.ttf",
    bolditalics: "NotoSansKR-Bold.ttf",
  },
};

export const ApprovalCompleteDocument = () => {
  const { approvalNo } = useParams();
  const [approvalContent, setApprovalContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("결재 문서.pdf");
  const documentRef = useRef<HTMLDivElement>(null);
  const [generatedFileUrl, setGeneratedFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!approvalNo) return;

    axios
      .get(`http://localhost:8003/workly/api/approval/getApprovalData`, {
        params: { approvalNo: Number(approvalNo) },
      })
      .then((response) => {
        if (response.data && response.data.approvalContent) {
          setApprovalContent(response.data.approvalContent);

          // HTML을 pdfMake가 인식할 수 있는 형식으로 변환
          const convertedHtml = htmlToPdfmake(response.data.approvalContent, {
            defaultStyles: { font: "NotoSansKR", fontSize: 12 },
          });

          // PDF 문서 정의
          const docDefinition: any = {
            content: [{ text: "전자결재 문서", style: "header" }, { text: " ", margin: [0, 10] }, convertedHtml],
            styles: {
              header: { fontSize: 18, bold: true, alignment: "center" },
            },
            defaultStyle: { font: "NotoSansKR" },
          };

          // PDF Blob 생성
          const pdfDocGenerator = pdfMake.createPdf(docDefinition);
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
      });
  }, [approvalNo]);

  return (
    <div style={containerStyle}>
      {/* 파일 정보 표시 */}
      <div style={fileInfoStyle}>
        <span style={fileNameStyle}>{fileName}</span>
        <a href={generatedFileUrl} download={fileName} style={downloadLinkStyle}>
          다운로드
        </a>
      </div>

      {/* 결재 문서 미리보기 */}
      <div ref={documentRef} style={previewContainerStyle}>
        <iframe
          src={generatedFileUrl}
          style={iframeStyle}
          title="문서 미리보기"
        ></iframe>
      </div>
    </div>
  );
};

// **스타일 정의**
const containerStyle = {
  maxWidth: "800px",
  margin: "1px auto",
  background: "#fff",
  borderRadius: "4px",
  textAlign: "center" as const,
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

export default ApprovalCompleteDocument;
