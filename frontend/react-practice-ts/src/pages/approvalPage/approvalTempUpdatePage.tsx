import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApprovalWriteTempBody from "../../components/approval/approvalWriteTempBody";
import ApprovalWriteTempFooter from "../../components/approval/approvalWriteTempFooter";
import ApprovalWriteTempHeader from "../../components/approval/approvalWriteTempHeader";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

export const ApprovalTempUpdatePage = () => {
  const { tempNo } = useParams(); // ✅ URL에서 tempNo 가져오기
  const [approvalData, setApprovalData] = useState(null);

  const { tempNo } = useParams();
  const parsedTempNo = Number(tempNo);

  useEffect(() => {
    if (!parsedTempNo) return;
    
    console.log(`✅ 임시저장 데이터 요청: /api/approvalTemp/${parsedTempNo}`);

    axios.get(`http://localhost:8003/api/approvalTemp/${parsedTempNo}`)
      .then(response => {
        console.log("✅ 불러온 데이터:", response.data);
        setApprovalData(response.data);
      })
      .catch(error => {
        console.error("🚨 데이터 불러오기 실패:", error);
      });
  }, [parsedTempNo]);


  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)", paddingRight: "10px" }}>
          {approvalData ? (
            <>
              <ApprovalWriteTempHeader approvalData={approvalData} setApprovalData={setApprovalData} />
              <ApprovalWriteTempBody approvalData={approvalData} setApprovalData={setApprovalData} />
              <ApprovalWriteTempFooter approvalData={approvalData} setApprovalData={setApprovalData} />
            </>
          ) : (
            <p>⏳ 데이터를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};
