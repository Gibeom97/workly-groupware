import { useEffect, useState } from "react"
import ApprovalWriteBody from "../../components/approval/approvalWriteBody"
import { ApprovalWriteFooter } from "../../components/approval/approvalWriteFooter"
import { ApprovalWriteHeader } from "../../components/approval/approvalWriteHeader"
import Header from "../../components/common/Header"
import Sidebar from "../../components/common/Sidebar"
import axios from "axios"

export const ApprovalWritePage = () => {
  const [selectedCCUsers, setSelectedCCUsers] = useState([]); // ✅ 참조자 목록 상태 추가

  useEffect(() => {
    console.log("🚀 ApprovalWritePage에서 관리하는 selectedCCUsers:", selectedCCUsers);
  }, [selectedCCUsers]);

  // 전자결재 데이터를 관리하는 상태 추가
  const [approvalData, setApprovalData] = useState({
    userNo: "",
    approvalType: "",
    approvalTitle: "",
    approvalContent: "",
    startDate: "",
    approvalUser: "",
    leaveType: "", // ✅ 기안양식 (연차, 반차 등)
    startLeaveDate: "", // ✅ 연차 시작일
    endDate: "", // ✅ 연차 종료일
    halfDayDate: "", // ✅ 반차 사용 날짜
    leaveDays: 0, // ✅ 사용 연차 일수
  });

  // 게시글 데이터 자동 불러오기
  // useEffect(() => {
  //   if (approvalNo) {
  //     const fetchApprovalData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8003/workly/api/approval/getApproval/${approvalNo}`
  //         );
  //         setApprovalData(response.data); // 기존 approvalData에 저장된 값 업데이트
  //       } catch (error) {
  //         console.error("게시글 데이터를 불러오는 데 실패했습니다.", error);
  //       }
  //     };
  //     fetchApprovalData();
  //   }
  // }, [approvalNo]);

  useEffect(() => {
    setApprovalMemoData((prevMemoData) => ({
      ...prevMemoData,
      userNo: approvalData.userNo,
    }));
  }, [approvalData.userNo]);

  // 결재 의견 상태 추가
  const [approvalMemoData, setApprovalMemoData] = useState({
    userNo: approvalData.userNo || "",
    approvalNo: null, // 결재 문서 저장 후 업데이트 필요
    memoContent: "",
    memoDate: new Date().toISOString(),
  });

// Spring Boot로 데이터 전송하는 함수
  // const submitApproval = async () => {
  //   try {
  //     // 1. 결재 문서 저장 요청
  //     const response = await axios.post(
  //       "http://localhost:8003/workly/api/approval/create",
  //       approvalData
  //     );

  //     // 2. 저장된 approvalNo 받아오기
  //     const approvalNo = response.data.approvalNo;

  //     if (!approvalNo || approvalNo === 0) {
  //       throw new Error("Invalid approvalNo received");
  //     }

  //     // 3. 결재 의견 데이터 업데이트 후 저장 요청
  //     const finalApprovalMemoData = {
  //       ...approvalMemoData,
  //       approvalNo: approvalNo,
  //       memoContent: approvalMemoData.memoContent, // 최신 결재 의견 반영
  //     };

  //     await axios.post(
  //       "http://localhost:8003/workly/api/approvalMemo/create",
  //       finalApprovalMemoData
  //     );

  //     alert("결재 문서와 결재 의견이 성공적으로 저장되었습니다.");
  //     console.log("결재 문서:", approvalData);
  //     console.log("결재 의견:", finalApprovalMemoData);
  //   } catch (error) {
  //     console.error("결재 문서 저장 실패:", error);
  //   }
  // };

    return(
        <div className="mainpageContainer">
        <Sidebar />
        <div className="componentContainer">
            <Header/>
            <div style={scrollableContentStyle}>
            {/*setApprovalData를 Header, Body에 전달하여 입력 데이터 업데이트*/}
            <ApprovalWriteHeader approvalData={approvalData} setApprovalData={setApprovalData} selectedCCUsers={selectedCCUsers} setSelectedCCUsers={setSelectedCCUsers}/>
            <ApprovalWriteBody approvalData={approvalData} setApprovalData={setApprovalData}/>
            {/*submitApproval Footer에 전달하여 입력 데이터 업데이트*/}
            <ApprovalWriteFooter approvalData={approvalData} setApprovalMemoData={setApprovalMemoData} setApprovalData={setApprovalData} selectedCCUsers={selectedCCUsers} setSelectedCCUsers={setSelectedCCUsers} />
            </div>
          </div>
        </div>   
    )
}

// ✅ **스타일 정의 (TSX 내부에서 적용)**
const scrollableContentStyle = {
  overflowY: "auto", // ✅ 세로 스크롤바 적용
  maxHeight: "calc(100vh - 100px)", // ✅ 화면 높이에서 일부 여백 제외 (조정 가능)
  paddingRight: "10px", // ✅ 스크롤바 공간 확보
};
