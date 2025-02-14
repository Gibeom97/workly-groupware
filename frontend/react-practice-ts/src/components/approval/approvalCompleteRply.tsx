import React from "react";

interface ApprovalComment {
  department: string;
  name: string;
  comment: string;
}

interface ApprovalCompleteReplyProps {
  approvalComments: ApprovalComment[];
}

const ApprovalCompleteReply: React.FC<ApprovalCompleteReplyProps> = ({
  approvalComments = [],
}) => {
  return (
    <div style={containerStyle}>
      {/* 결재 의견 제목 */}
      <div style={titleStyle}>결재의견</div>
      <div style={dividerStyle}></div>

      {/* 의견 리스트 */}
      {approvalComments.map((comment, index) => (
        <div key={index} style={commentContainerStyle}>
          {/* 결재자 정보 */}
          <div style={approverBoxStyle}>
            {comment.department} / {comment.name}
          </div>
          {/* 의견 */}
          <div style={commentTextStyle}>{comment.comment}</div>
        </div>
      ))}

      <div style={dividerStyle}></div>
    </div>
  );
};

// ✅ **스타일 정의**
const containerStyle = {
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Nunito Sans, sans-serif",
};

const titleStyle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#202224",
  marginBottom: "10px",
};

const dividerStyle = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  margin: "10px 0",
};

const commentContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "5px",
  padding: "10px",
};

const approverBoxStyle = {
  display: "inline-block",
  backgroundColor: "white",
  border: "2px solid #4880FF",
  borderRadius: "5px",
  padding: "5px 10px",
  fontSize: "13px",
  fontWeight: "bold",
  color: "#4880FF",
  alignSelf: "flex-start",
};

const commentTextStyle = {
  fontSize: "13px",
  color: "#202224",
};

// ✅ **사용 예시**
export const ExampleUsage = () => {
  return (
    <ApprovalCompleteReply
      approvalComments={[
        {
          department: "개발본부 / IT팀",
          name: "조용해 팀장",
          comment: "김웡카 과장 2/1 긴급 서버 점검으로 인한 추가 근무 관련 보상휴가 건 입니다.",
        },
        {
          department: "경영본부 / 인사팀",
          name: "만경만 이사",
          comment: "확인했습니다.",
        },
      ]}
    />
  );
};

export default ApprovalCompleteReply;
