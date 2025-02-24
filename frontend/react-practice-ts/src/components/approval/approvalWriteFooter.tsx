import { useNavigate } from "react-router-dom";
import { ApprovalMemoModal } from "./approvalMemoModal";
import ApprovalOutcheckModal from "./approvalOutcheckModal";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const ApprovalWriteFooter = ({ approvalData, selectedCCUsers }) => {

    const [approvalNo, setApprovalNo] = useState<number | null>(null); // approvalNo를 상태로 관리

    useEffect(() => {
        if (approvalNo !== null && modalOpen) {
            console.log("✅ `approvalNo`가 업데이트된 후 모달 열기:", approvalNo);
            setModalOpen(true);
        }
    }, [approvalNo]); // approvalNo가 변경되면 실행

    useEffect(() => {
        console.log("✅ Footer에서 받은 참조자 목록:", selectedCCUsers);
      }, [selectedCCUsers]);

    // Redux에서 user 정보 가져오기
    const userNo = useSelector((state: any) => state.user.userNo);
    const [modalOpen, setModalOpen] = useState(false);
    const [outCheckModalOpen, setOutCheckModalOpen] = useState(false);
    
    const [approvalMemoData, setApprovalMemoData] = useState({

        userNo: userNo,
        approvalNo: approvalData.approvalNo || null, // 결재 문서 저장 후 업데이트 필요
        memoContent: "",
        memoDate: new Date().toISOString(),
    });


    // ✅ 📌 여기 추가: approvalNo가 변경될 때 approvalMemoData 업데이트

    useEffect(() => {
        if (approvalData?.approvalNo && approvalMemoData.approvalNo !== approvalData.approvalNo) {
            setApprovalMemoData((prevMemoData) => ({
                ...prevMemoData,
                approvalNo: approvalData.approvalNo,
                userNo: userNo
            }));
        }
    }, [approvalData.approvalNo, userNo]); 

    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/approvalMain/ApprovalWriteDetailPage");
    };

    // ✅ 임시저장 + 불러오기
    const handleTempSave = async () => {

        console.log("참조값 확인: ", selectedCCUsers);
        console.log("approvalNo값 확인: ", approvalNo);

        try {
          const tempApprovalData = {
            ...approvalData,
            approvalStatus: "4", // 임시저장 상태
            startDate: new Date().toISOString(), // 시작 날짜 자동 설정
          };
      
          if (!tempApprovalData.approvalTitle || !tempApprovalData.approvalContent) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
          }
      
          // 임시 저장 요청
          await axios.post(
            "http://localhost:8003/workly/api/approval/tempSave",
            tempApprovalData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
      
          alert("임시저장 완료!");
      
        } catch (error) {
          console.error("임시저장 실패:", error);
          alert("임시저장 실패!");
        }
      };
      
    

   const submitApproval = async (memoContent:any) => {

        console.log("참조값 확인: ", selectedCCUsers);
        console.log("approvalNo값 확인: ", approvalNo);


        try {

            // Redux의 userNo를 명시적으로 설정
            const finalAPprovalData = { 
                ...approvalData,
                userNo: userNo,
                ccUsers:[...selectedCCUsers], // 참조자 목록 추가
            };

            console.log("결재 문서 저장 요청 데이터:", finalAPprovalData);

            // 1️⃣ 결재 문서 저장 요청
            const approvalResponse = await axios.post(
                "http://localhost:8003/workly/api/approval/submit",
                finalAPprovalData, 
                {
                    headers: {"Content-Type": "application/json"}, //JSON명시
                }
            );

            // 2️⃣ 저장된 Approval의 approvalNo 받아오기
            const newApprovalNo = approvalResponse.data?.approvalNo;

            // approvalNo가 유효한지 확인
            if (!newApprovalNo) {
                console.error("[ERROR] approvalNo를 받지 못함. 서버 응답 확인:", approvalResponse.data);
                throw new Error("Invalid approvalNo received");
            }

            setApprovalMemoData(prevState => ({
                ...prevState,
                approvalNo: approvalNo,
                userNo: userNo

            }));

            console.log("서버에서 받은 approvalNo값:", newApprovalNo);

            setApprovalNo(newApprovalNo);            

            // **🔥 `setApprovalMemoData` 업데이트 후 비동기 처리가 끝나기를 기다림**
            await new Promise(resolve => setTimeout(resolve, 500));

            // // 3️⃣ ApprovalMemoData 업데이트 후 저장 요청
            // const finalApprovalMemoData = {
            //     ...approvalMemoData,
            //     approvalNo: newApprovalNo, // ✅ 방금 저장된 approvalNo 설정
            //     userNo: userNo,
            //     memoContent: memoContent, // ✅ 최신 결재 의견 반영
            // };
            // await axios.post("http://localhost:8003/workly/api/approvalMemos/create", finalApprovalMemoData);

            // 결재라인 저장 요청 (approvalLine 데이터 전송)
            if ((approvalData.approvalLine ?? []).length > 0) {
                const approvalLineData = [
                    approvalData.approvalLine.map(emp => ({
                    approvalNo: newApprovalNo, // 방금 저장된 결재 문서의 approvalNo
                    approvalLineType: emp.approvalType,
                    type: emp.type,
                    approvalLevel: emp.approvalLevel,
                    userNo: emp.USER_NO,
                })),
                ...(selectedCCUsers ?? []).map(emp => ({
                    approvalNo: newApprovalNo,
                    type: "참조자",
                    approvalLevel: 1,
                    userNo: emp.USER_NO,
                    
                }))
            ].flat(); // 단일배열로 평탄화 처리

                console.log("전송할 결재라인 데이터:", approvalLineData);

                await axios.post("http://localhost:8003/workly/api/approval/saveApprovalLine", approvalLineData);

                console.log("결재라인 저장 완료!");
            }

            // 파일 업로드 처리(APPROVAL_ATTACHMENT 테이블 저장)
            if(approvalData.attachments?.length > 0){
                const formData = new FormData();
                approvalData.attachments.forEach((file:File) => {
                    formData.append("files", file);
                });
                formData.append("approvalNo", newApprovalNo.toString());

            // 🔥 formData 값 확인 (FormData가 비어있으면 오류 발생 가능)
            for (const pair of formData.entries()) {
                console.log(`🔥 formData Key: ${pair[0]}, Value: ${pair[1]}`);
            }

                await axios.post(
                    "http://localhost:8003/workly/api/approval/attachments",
                    formData,
                    {
                        headers: {"Content-Type": "multipart/form-data"}
                    }
                );

                console.log("파일 업로드 성공!")
            }

        } catch (error) {
            console.error("결재 문서 저장 실패:", error);
        }
    };

    // ✅ approvalNo가 업데이트되면 메모 모달을 연다
    useEffect(() => {
        if (approvalNo !== null ) {
            console.log("✅ approvalNo 업데이트됨:", approvalNo);
            setModalOpen(true);
        }
    }, [approvalNo]);

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
            {/* 임시저장 버튼 */}
            <div>
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={handleTempSave}
                >
                    임시저장
                </button>
            </div>

            {/* 결재 & 취소 버튼 그룹 */}
            <div style={{ display: "flex", gap: "10px" }}>
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => {
                        if (!approvalData.approvalType || !approvalData.approvalTitle || !approvalData.approvalContent) {
                            alert("필수 입력사항을 모두 입력해야 합니다.");
                        } else {
                            submitApproval();
                            //setModalOpen(true);
                        }
                    }}
                >
                    결재상신
                </button>

                {modalOpen && (
                    <ApprovalMemoModal
                        approvalNo={approvalNo}
                        onClose={() => setModalOpen(false)}
                        onSave={(memoContent) => {
                            console.log("🔥 메모 저장 요청:", memoContent, "approvalNo:", approvalNo);
                            if(memoContent){
                            axios.post("http://localhost:8003/workly/api/approvalMemos/create", {
                                approvalNo: approvalNo, // ✅ 저장된 approvalNo 사용
                                userNo: userNo,
                                memoContent: memoContent,
                            }).then(() => {
                                console.log("🔥 메모 저장 완료!");
                                alert("결재상신 완료");
                            }).catch((error) => {
                                console.error("🚨 메모 저장 실패:", error);
                            })};
                            setModalOpen(false);

                        }}
                    />
                )}

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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setOutCheckModalOpen(true)}
                >
                    결재취소
                </button>

                {outCheckModalOpen && (
                    <ApprovalOutcheckModal
                        onClose={() => setOutCheckModalOpen(false)}
                        onGoBack={() => setOutCheckModalOpen(false)}
                        onExit={handleExit}
                    />
                )}
            </div>
        </footer>
    );
};
