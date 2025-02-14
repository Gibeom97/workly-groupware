import React from "react";

interface ApprovalComment {
  department: string;
  name: string;
  comment: string;
}

interface ApprovalCompleteReplyProps {
  approvalComments?: ApprovalComment[];
}

const ApprovalCompleteReply: React.FC<ApprovalCompleteReplyProps> = ({
  approvalComments = [
    // ✅ 기본 예제 데이터 추가
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
  ],
}) => {
  return (
    <div style={containerStyle}>
      {/* 결재 의견 제목 */}
      <div style={titleStyle}>결재 의견</div>
      <div style={dividerStyle}></div>

      {/* 의견 리스트 */}
      {approvalComments.length > 0 ? (
        approvalComments.map((comment, index) => (
          <div key={index} style={commentContainerStyle}>
            {/* 결재자 정보 */}
            <div style={approverBoxStyle}>
              {comment.department} / {comment.name}
            </div>
            {/* 의견 */}
            <div style={commentTextStyle}>{comment.comment}</div>

            {/* ✅ 마지막 요소가 아닐 때만 구분선 추가 */}
            {index < approvalComments.length - 1 && <hr style={lineStyle} />}
          </div>
        ))
      ) : (
        <div style={noCommentsStyle}>등록된 결재 의견이 없습니다.</div>
      )}

      <div style={dividerStyle}></div>
    </div>
  );
};

// ✅ **스타일 정의**
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "center",
  padding: "10px",
  width: "100%",
  maxWidth: "900px",
  background: "white",
  borderRadius: "8px",
  margin: "0 auto", // ✅ 좌우 중앙 정렬
};

const titleStyle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#202224",
  marginBottom: "5px",
  marginTop: "5px",
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
};

const approverBoxStyle = {
  display: "inline-block",
  backgroundColor: "white",
  border: "1px solid #A0C1FF", // ✅ 더 연한 파란색 테두리
  borderRadius: "5px",
  padding: "3px 8px", // ✅ 크기 줄임
  fontSize: "12px", // ✅ 더 작은 폰트
  fontWeight: "bold",
  color: "#4880FF",
  alignSelf: "flex-start",
};

const commentTextStyle = {
  fontSize: "12px", // ✅ 더 작은 글씨 크기
  color: "#666", // ✅ 글씨 색을 더 연한 회색으로 변경
};

const noCommentsStyle = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
  padding: "10px",
};

// ✅ **구분선 스타일**
const lineStyle = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.1)", // ✅ 조금 더 연한 회색
  border: "none",
  margin: "10px 0",
};

// ✅ **사용 예시 (데이터 없이 실행 가능)**
export const ExampleUsage = () => {
  return <ApprovalCompleteReply />;
};

export default ApprovalCompleteReply;
