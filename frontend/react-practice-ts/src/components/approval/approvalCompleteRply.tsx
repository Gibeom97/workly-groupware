import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface ApprovalComment {
  MEMO_NO: number
  DEPT_NAME: string;
  USER_NAME: string;
  POSITION_NAME: string;
  MEMO_CONTENT: string;
  USER_NO: number;
}

interface ApprovalCompleteReplyProps {
  approvalComments?: ApprovalComment[];
}

const ApprovalCompleteReply: React.FC<ApprovalCompleteReplyProps> = () => {
  const userNo = useSelector((state: any) => state.user.userNo);
  const {approvalNo} = useParams(); // URL에서 approvalNo 가져오기
  const [approvalComments, setApprovalComments] = useState<ApprovalComment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    if(!approvalNo) return;

    axios.get(`http://localhost:8003/workly/api/approval/getApprovalReply`, {
      params: {
              approvalNo: approvalNo,
              userNo: userNo
            }
    })
    .then((response) => {
      if(response.data && Array.isArray(response.data)){
        setApprovalComments(
          response.data.sort((a, b) => a.MEMO_NO - b.MEMO_NO)
        );
      }else {
        setApprovalComments([]);
      }
    })
    .catch((err) => {
      console.error("결재 의견 데이터 로드 실패:", err);
      setError("결재 의견을 불러오는 데 실패했습니다.");
    });
  }, [approvalNo]);

  const handleDelete = (memoNo: number) => {
    if(!window.confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8003/workly/api/approvalMemos/deleteApprovalReply`, {
        data: {memoNo},
      })
      .then((response) => {
        setApprovalComments(approvalComments.filter((c) => c.MEMO_NO !== memoNo));
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  };

  const handleEdit = (memo: ApprovalComment) => {
    setEditingComment(memo.MEMO_NO);
    setEditedContent(memo.MEMO_CONTENT);
  }

  const handleSaveEdit = (memoNo: number) => {
    axios
      .put(`http://localhost:8003/workly/api/approvalMemos/updateApprovalReply`, {
        memoNo,
        memoContent: editedContent,
      })
      .then(() => {
        setApprovalComments(
          approvalComments.map((c) => 
          c.MEMO_NO === memoNo ? {...c, MEMO_CONTENT: editedContent} : c
          )
        );
        setEditingComment(null);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다");
      })
  }

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
              {comment.DEPT_NAME} / {comment.USER_NAME} {comment.POSITION_NAME}
            </div>

            {/* 의견 (수정 가능 여부) */}
            {editingComment === comment.MEMO_NO ? (
              <>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  style={editTextAreaStyle}
                />
                <div style={buttonContainerStyle}>
                  <button style={saveButtonStyle} onClick={() => handleSaveEdit(comment.MEMO_NO)}>
                    저장
                  </button>
                  <button style={cancelButtonStyle} onClick={() => setEditingComment(null)}>
                    취소
                  </button>
                </div>
              </>
            ) : (
              <div style={commentTextStyle}>{comment.MEMO_CONTENT}</div>
            )}

            {/* ✅ 본인 의견일 경우 수정/삭제 버튼 표시 */}
            {comment.USER_NO === userNo && (
              <div style={buttonContainerStyle}>
                <button style={editButtonStyle} onClick={() => handleEdit(comment)}>
                  수정
                </button>
                <button style={deleteButtonStyle} onClick={() => handleDelete(comment.MEMO_NO)}>
                  삭제
                </button>
              </div>
            )}

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
  margin: "0 auto",
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
  border: "1px solid #A0C1FF",
  borderRadius: "5px",
  padding: "3px 8px",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#4880FF",
  alignSelf: "flex-start",
};

const commentTextStyle = {
  fontSize: "12px",
  color: "#666",
};

const editTextAreaStyle = {
  width: "100%",
  height: "60px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  padding: "5px",
  fontSize: "12px",
  resize: "none",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "5px",
  marginTop: "5px",
};

const editButtonStyle = {
  background: "#FFA500",
  color: "white",
  border: "none",
  padding: "5px 10px",
  fontSize: "12px",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  background: "#FF0000",
  color: "white",
  border: "none",
  padding: "5px 10px",
  fontSize: "12px",
  borderRadius: "4px",
  cursor: "pointer",
};

const saveButtonStyle = {
  background: "#4880FF",
  color: "white",
  border: "none",
  padding: "5px 10px",
  fontSize: "12px",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  background: "#888",
  color: "white",
  border: "none",
  padding: "5px 10px",
  fontSize: "12px",
  borderRadius: "4px",
  cursor: "pointer",
};

const noCommentsStyle = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
  padding: "10px",
};

const lineStyle = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  border: "none",
  margin: "10px 0",
};

export default ApprovalCompleteReply;
