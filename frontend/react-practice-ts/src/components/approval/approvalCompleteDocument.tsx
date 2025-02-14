import React from "react";

interface ApprovalComment {
  department: string;
  name: string;
  comment: string;
}

interface ApprovalDocumentProps {
  reason: string;
  startDate: string;
  endDate: string;
  approvalComments: ApprovalComment[];
}

const ApprovalCompleteBody: React.FC<ApprovalDocumentProps> = ({
  reason,
  startDate,
  endDate,
  approvalComments = [], // ✅ undefined 방지 기본값 설정
}) => {
  return (
    <div style={containerStyle}>
      <h2>결재 완료 문서</h2> {/* ✅ 확인을 위한 제목 추가 */}
      
      {/* 문서 내용 테이블 */}
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={cellStyleBold}>사 유</td>
            <td colSpan={3} style={cellStyle}>{reason}</td>
          </tr>
          <tr>
            <td style={cellStyleBold}>기 간</td>
            <td colSpan={3} style={cellStyle}>{`${startDate} ~ ${endDate}`}</td>
          </tr>
          <tr>
            <td colSpan={4} style={messageStyle}>
              위와 같이 휴가를 신청하오니 재가하여 주시기 바랍니다.
            </td>
          </tr>
        </tbody>
      </table>

      {/* 결재 의견 섹션 */}
      <div style={commentSectionStyle}>
        <div style={commentTitleStyle}>결재의견</div>
        <div style={dividerStyle}></div>

        {(approvalComments || []).map((comment, index) => (
          <div key={index} style={commentItemStyle}>
            <span style={approverStyle}>
              {comment.department} / {comment.name}
            </span>
            <span style={commentTextStyle}>{comment.comment}</span>
          </div>
        ))}

        <div style={dividerStyle}></div>
      </div>
    </div>
  );
};

// ✅ 기본 데이터 추가
ApprovalCompleteBody.defaultProps = {
  reason: "개인 사유",
  startDate: "2025-02-03",
  endDate: "2025-02-03 (오후 반차)",
  approvalComments: [
    { department: "개발본부", name: "김철수", comment: "승인합니다." },
    { department: "경영본부", name: "이영희", comment: "확인했습니다." },
  ],
};

// ✅ **스타일 정의**
const containerStyle = {
  width: "70%",
  margin: "0 auto",
  textAlign: "center" as const,
  border: "2px solid red", // ✅ 확인을 위한 테두리 추가
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "10px",
  border: "2px solid black",
};

const cellStyleBold = {
  fontWeight: "bold",
  border: "1px solid black",
  padding: "10px",
  textAlign: "center" as const,
  width: "20%",
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
  textAlign: "center" as const,
  width: "80%",
};

const messageStyle = {
  border: "1px solid black",
  padding: "15px",
  textAlign: "center" as const,
  fontSize: "14px",
  fontWeight: "500",
  backgroundColor: "white",
};

const commentSectionStyle = {
  marginTop: "20px",
  textAlign: "left" as const,
};

const commentTitleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#202224",
  marginBottom: "10px",
};

const dividerStyle = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  margin: "10px 0",
};

const commentItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
  color: "#666",
  marginBottom: "5px",
};

const approverStyle = {
  fontWeight: "bold",
  color: "#4880FF",
};

const commentTextStyle = {
  fontSize: "13px",
  color: "#202224",
};

export default ApprovalCompleteBody;
