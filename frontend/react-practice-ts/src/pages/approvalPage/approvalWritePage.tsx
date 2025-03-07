import { useEffect, useState } from "react"
import ApprovalWriteBody from "../../components/approval/approvalWriteBody"
import { ApprovalWriteFooter } from "../../components/approval/approvalWriteFooter"
import { ApprovalWriteHeader } from "../../components/approval/approvalWriteHeader"
import Header from "../../components/common/Header"
import Sidebar from "../../components/common/Sidebar"
import axios from "axios"
import { useSearchParams } from "react-router-dom"; 
import { useSelector } from "react-redux"

export const ApprovalWritePage = () => {
  const userNo = useSelector((state: any) => state.user.userNo);
  
  const [selectedCCUsers, setSelectedCCUsers] = useState([]); // 참조자 목록 상태 추가
  const [searchParams] = useSearchParams();
  const [approvalNo, setApprovalNo] = useState<number | null>(null); // 결재 번호 상태 추가

  useEffect(() => {
    //console.log("ApprovalWritePage에서 관리하는 selectedCCUsers:", selectedCCUsers);
  }, [selectedCCUsers]);

  // 전자결재 데이터를 관리하는 상태 추가
  const [approvalData, setApprovalData] = useState({
    userNo: userNo,
    approvalType: "",
    approvalTitle: "",
    approvalContent: "",
    startDate: "",
    approvalUser: "",
    leaveType: "", 
    startLeaveDate: "", 
    endDate: "", 
    halfDayDate: "", 
    leaveDays: 0, 
    approvalLine: [], 
    attachments: [], 
  });

  const [approvalMemoData, setApprovalMemoData] = useState({
    userNo: userNo,
    approvalNo: null, // 결재 문서 저장 후 업데이트 필요
    memoContent: "",
    memoDate: new Date().toISOString(),
  });

  // 결재 데이터 백엔드 전송 함수
  const submitApproval = async () => {
    //console.log("전송할 데이터:", approvalData);
    //console.log("참조자 데이터 확인 (selectedCCUsers):", selectedCCUsers);

    try {
      const finalApprovalData = { 
        ...approvalData,
        userNo: userNo,
        ccUsers: [...selectedCCUsers],
      };

      console.log("결재 문서 저장 요청 데이터:", finalApprovalData);

      // 1. 결재 문서 저장 요청
      const approvalResponse = await axios.post(
        "http://localhost:8003/workly/api/approval/submit",
        finalApprovalData, 
        { headers: { "Content-Type": "application/json" } }
      );

      // 2️. 저장된 approvalNo 받아오기
      const newApprovalNo = approvalResponse.data?.approvalNo;
      if (!newApprovalNo) throw new Error("approvalNo를 받지 못함");

      //console.log("서버에서 받은 approvalNo:", newApprovalNo);
      setApprovalNo(newApprovalNo);

      // 3️. 휴가원 데이터 저장
      if (approvalData.approvalType === "휴가원") {
        const leaveRequestData = {
          approvalNo: newApprovalNo,
          leaveType: approvalData.leaveType,
          startDate: approvalData.startLeaveDate,
          endDate: approvalData.endDate,
          leaveDays: approvalData.leaveDays,
          userNo: userNo,
        };

        //console.log("휴가 데이터 백엔드 전송:", leaveRequestData);

        await axios.post(
          "http://localhost:8003/workly/api/approval/leaveRequest",
          leaveRequestData,
          { headers: { "Content-Type": "application/json" } }
        );

        //console.log("휴가 데이터 저장 완료");
      }

      // 4️. 결재라인 저장
      if (approvalData.approvalLine?.length > 0) {
        const approvalLineData = [approvalData.approvalLine.map(emp => ({
          approvalNo: newApprovalNo,
          approvalLineType: emp.approvalType,
          type: emp.type,
          approvalLevel: emp.approvalLevel,
          userNo: emp.USER_NO,
        })),
          // 참조자 추가 
        ...selectedCCUsers.map(emp => ({
          approvalNo: newApprovalNo,
          type: "참조자",
          approvalLevel: 1, // 참조자는 레벨 1로 설정
          userNo: emp.USER_NO,
        })),
      ].flat(); // 중첩 배열 평탄화

        //console.log("전송할 결재라인 데이터:", approvalLineData);

        await axios.post(
          "http://localhost:8003/workly/api/approval/saveApprovalLine",
          approvalLineData
        );

        //console.log("결재라인 저장 완료");
      }

      // 5️. 파일 업로드 처리
      if (approvalData.attachments?.length > 0) {
        const formData = new FormData();
        approvalData.attachments.forEach((file: File) => {
          formData.append("files", file);
        });
        formData.append("approvalNo", newApprovalNo.toString());

        await axios.post(
          "http://localhost:8003/workly/api/approval/attachments",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        //console.log("파일 업로드 성공");
      }

      alert("결재 상신 완료");

    } catch (error) {
      //console.error("결재 문서 저장 실패:", error);
      alert("결재 저장 실패");
    }
  };

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header/>
        <div style={scrollableContentStyle}>
          <ApprovalWriteHeader 
            approvalData={approvalData} 
            setApprovalData={setApprovalData} 
            selectedCCUsers={selectedCCUsers} 
            setSelectedCCUsers={setSelectedCCUsers} 
          />
          <ApprovalWriteBody 
            approvalData={approvalData} 
            setApprovalData={setApprovalData} 
          />
          {/* submitApproval을 Footer로 전달 */}
          <ApprovalWriteFooter 
            approvalData={approvalData} 
            setApprovalMemoData={setApprovalMemoData} 
            setApprovalData={setApprovalData} 
            selectedCCUsers={selectedCCUsers} 
            setSelectedCCUsers={setSelectedCCUsers} 
            submitApproval={submitApproval} 
            approvalNo={approvalNo} 
          />
        </div>
      </div>
    </div>   
  );
}

//  **스타일 정의 (TSX 내부에서 적용)**
const scrollableContentStyle = {
  overflowY: "auto", // 세로 스크롤바 적용
  maxHeight: "calc(100vh - 100px)", // 화면 높이에서 일부 여백 제외 (조정 가능)
  paddingRight: "10px", // 스크롤바 공간 확보
};
