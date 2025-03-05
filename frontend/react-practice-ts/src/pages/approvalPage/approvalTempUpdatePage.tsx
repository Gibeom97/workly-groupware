import { useEffect, useState } from "react";
import ApprovalWriteTempBody from "../../components/approval/approvalWriteTempBody";
import { ApprovalWriteTempFooter } from "../../components/approval/approvalWriteTempFooter"; // ✅ 새로 추가된 푸터
import { ApprovalWriteHeader } from "../../components/approval/approvalWriteHeader";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const TempUpdatePage = () => {
  const [searchParams] = useSearchParams();
  const tempNo = searchParams.get("tempNo"); // ✅ URL에서 tempNo 가져오기

  const [approvalData, setApprovalData] = useState({
    tempNo: null, // ✅ 임시저장 번호 추가
    approvalTitle: "",
    approvalContent: "",
    approvalType: "",
    approvalLines: [],
    references: [],
    attachments: [],
  });

  useEffect(() => {
    if (tempNo) {
      axios.get(`http://localhost:8003/workly/api/approvalTemp/${tempNo}`)
        .then(response => {
          console.log("📌 불러온 임시저장 데이터:", response.data);
          setApprovalData(response.data); // ✅ 불러온 데이터 적용
        })
        .catch(error => console.error("🚨 임시저장 불러오기 실패:", error));
    }
  }, [tempNo]);

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div style={scrollableContentStyle}>
          <ApprovalWriteHeader approvalData={approvalData} setApprovalData={setApprovalData} />
          <ApprovalWriteTempBody approvalData={approvalData} setApprovalData={setApprovalData} isTempUpdate={true} />
          <ApprovalWriteTempFooter approvalData={approvalData} setApprovalData={setApprovalData} />
        </div>
      </div>
    </div>
  );
};

// ✅ 스타일 추가
const scrollableContentStyle = {
  overflowY: "auto",
  maxHeight: "calc(100vh - 100px)",
  paddingRight: "10px",
};
