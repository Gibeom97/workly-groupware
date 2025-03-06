import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ApprovalWriteTempFooter = ({ approvalData, setApprovalData }) => {
  const navigate = useNavigate();

  // ✅ 임시저장 수정 또는 저장
  const handleTempSave = async () => {
    try {
      if (!approvalData) {
        alert("저장할 데이터가 없습니다.");
        return;
      }

      const tempApprovalData = {
        userNo: approvalData.userNo,
        approvalType: approvalData.approvalType || "일반",
        approvalStatus: 4, // 임시저장 상태
        approvalTitle: approvalData.approvalTitle || "",
        approvalContent: approvalData.approvalContent || "",
        approvalNo: approvalData.approvalNo || null,
      };

      console.log("✅ 저장 요청 데이터:", tempApprovalData);

      if (approvalData.tempNo) {
        // ✅ 기존 임시저장 문서 업데이트
        console.log("✅ 임시저장 업데이트 요청:", tempApprovalData);
        await axios.put(
          `http://localhost:8003/workly/api/approvalTemp/update/${approvalData.tempNo}`,
          tempApprovalData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("임시저장 수정 완료!");
      } else {
        // ✅ 새로운 임시저장
        console.log("✅ 새로운 임시저장 요청:", tempApprovalData);
        const response = await axios.post(
          "http://localhost:8003/workly/api/approvalTemp/save",
          tempApprovalData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("임시저장 완료!");

        // ✅ 새롭게 생성된 tempNo를 state에 반영
        setApprovalData((prevData) => ({
          ...prevData,
          tempNo: response.data.tempNo,
        }));
      }
    } catch (error) {
      console.error("🚨 임시저장 실패:", error.response?.data || error.message);
      alert("임시 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <footer style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "20px" }}>
      <button onClick={handleTempSave} style={{ background: "#4880FF", color: "white" }}>
        임시저장
      </button>
    </footer>
  );
};
