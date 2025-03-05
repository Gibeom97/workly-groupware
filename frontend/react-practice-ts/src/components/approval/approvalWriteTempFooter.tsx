import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ApprovalWriteTempFooter = ({ approvalData, setApprovalData }) => {
  const navigate = useNavigate();

  // ✅ 임시저장 수정 (기존 tempNo가 있으면 업데이트, 없으면 새로 저장)
  const handleTempSave = async () => {
    try {
      const tempApprovalData = {
        userNo: approvalData.userNo,
        approvalType: approvalData.approvalType || "일반",
        approvalStatus: 4, // 임시저장 상태
        approvalTitle: approvalData.approvalTitle || "",
        approvalContent: approvalData.approvalContent || "",
        approvalNo: approvalData.approvalNo || null,
      };

      if (approvalData.tempNo) {
        // ✅ 기존 임시저장된 문서 업데이트
        await axios.put(
          `http://localhost:8003/workly/api/approvalTemp/update/${approvalData.tempNo}`,
          tempApprovalData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("임시저장 수정 완료!");
      } else {
        // ✅ 새로운 임시저장
        await axios.post(
          "http://localhost:8003/workly/api/approvalTemp/save",
          tempApprovalData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("임시저장 완료!");
      }
    } catch (error) {
      console.error("임시저장 실패:", error.response?.data || error.message);
      alert("임시 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ✅ 임시저장 삭제
  const handleDelete = async () => {
    if (!approvalData.tempNo) {
      alert("삭제할 임시저장 문서가 없습니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `http://localhost:8003/workly/api/approvalTemp/delete/${approvalData.tempNo}`
      );
      alert("임시저장이 삭제되었습니다.");
      navigate("/approvalTempPage"); // 삭제 후 임시저장 목록 페이지로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 20px",
        width: "100%",
        gap: "700px",
      }}
    >
      {/* ✅ 임시저장 버튼 */}
      <button
        style={{
          width: 75,
          height: 30,
          background: "#4880FF",
          borderRadius: 14,
          border: "0.30px solid #B9B9B9",
          color: "white",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={handleTempSave}
      >
        임시저장
      </button>

      {/* ✅ 삭제 버튼 */}
      <button
        style={{
          width: 75,
          height: 30,
          background: "#FF5C5C",
          borderRadius: 14,
          border: "0.30px solid #B9B9B9",
          color: "white",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={handleDelete}
      >
        삭제
      </button>
    </footer>
  );
};
