import { useEffect } from "react";

const ApprovalWriteTempBody = ({ approvalData, setApprovalData }) => {
  // ✅ 모든 입력 필드의 상태를 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApprovalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("✅ approvalData 업데이트됨:", approvalData);
  }, [approvalData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="text"
        name="approvalTitle"
        value={approvalData.approvalTitle || ""}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
        style={{ width: "870px", padding: "10px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" }}
      />

      <select
        name="approvalType"
        value={approvalData.approvalType || ""}
        onChange={handleChange}
        style={{ width: "870px", padding: "8px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" }}
      >
        <option value="">-- 결재 유형 선택 --</option>
        <option value="일반">일반</option>
        <option value="휴가원">휴가원</option>
        <option value="지출결의">지출결의</option>
      </select>

      <textarea
        name="approvalContent"
        value={approvalData.approvalContent || ""}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
        style={{ width: "870px", height: "440px", padding: "10px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" }}
      />
    </div>
  );
};

export default ApprovalWriteTempBody;
