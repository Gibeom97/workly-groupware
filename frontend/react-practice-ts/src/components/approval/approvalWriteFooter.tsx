import { useNavigate } from "react-router-dom";
import { ApprovalMemoModal } from "./approvalMemoModal";
import ApprovalOutcheckModal from "./approvalOutcheckModal";
import { useEffect, useState } from "react";
import axios from "axios";

export const ApprovalWriteFooter = ({ approvalData}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [outCheckModalOpen, setOutCheckModalOpen] = useState(false);

    const [approvalMemoData, setApprovalMemoData] = useState({
        userNo: approvalData?.userNo ?? 1, // null이나 undefined가 오면 1로 설정
        approvalNo: approvalData.approvalNo || null, // 결재 문서 저장 후 업데이트 필요
        memoContent: "",
        memoDate: new Date().toISOString(),
    });

    // ✅ 📌 여기 추가: approvalNo가 변경될 때 approvalMemoData 업데이트
    useEffect(() => {
        if (approvalData?.approvalNo && approvalMemoData.approvalNo !== approvalData.approvalNo) {
            setApprovalMemoData(prevMemoData => ({
                ...prevMemoData,
                approvalNo: approvalData.approvalNo,
                userNo: prevMemoData.userNo
            }));
        }
    }, [approvalData.approvalNo]); 

    const navigate = useNavigate();
    
    const handleExit = () => {
        navigate('/approvalMain/ApprovalWriteDetailPage');
    };

    // ✅ 결재 문서 + 결재 의견 함께 저장
    const submitApproval = async (memoContent:any) => {

        try {

            console.log("결재 문서 저장 요청 데이터:", approvalData);

            // 1️⃣ 결재 문서 저장 요청
            const approvalResponse = await axios.post(
                "http://localhost:8003/workly/api/approval/submit",
                approvalData, 
                {
                    headers: {"Content-Type": "application/json"}, //JSON명시
                }
            );

            // 2️⃣ 저장된 Approval의 approvalNo 받아오기
            const approvalNo = approvalResponse.data?.approvalNo;

            // approvalNo가 유효한지 확인
            if (!approvalNo) {
                console.error("[ERROR] approvalNo를 받지 못함. 서버 응답 확인:", approvalResponse.data);
                throw new Error("Invalid approvalNo received");
            }

            setApprovalMemoData(prevState => ({
                ...prevState,
                approvalNo: approvalNo
            }));
    
            // **🔥 `setApprovalMemoData` 업데이트 후 비동기 처리가 끝나기를 기다림**
            await new Promise(resolve => setTimeout(resolve, 500));

            // 3️⃣ ApprovalMemoData 업데이트 후 저장 요청
            const finalApprovalMemoData = {
                ...approvalMemoData,
                approvalNo: approvalNo, // ✅ 방금 저장된 approvalNo 설정
                userNo: approvalData.userNo,
                memoContent: memoContent, // ✅ 최신 결재 의견 반영
            };
            await axios.post("http://localhost:8003/workly/api/approvalMemos/create", finalApprovalMemoData);

            // 파일 업로드 처리(APPROVAL_ATTACHMENT 테이블 저장)
            if(approvalData.attachments?.length > 0){
                const formData = new FormData();
                approvalData.attachments.forEach((file:File) => {
                    formData.append("files", file);
                });
                formData.append("approvalNo", approvalNo.toString());

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


            alert("결재상신 완료");

        } catch (error) {
            console.error("결재 문서 저장 실패:", error);
        }
    };

    return (
        <footer
            style={{
                display: "flex",
                justifyContent: "center", // ✅ 버튼들을 중앙으로 배치
                alignItems: "center",
                padding: "20px 20px",
                width: "100%",
                gap: "700px", // ✅ 그룹 사이 간격 조정
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
                    onClick={() => navigate('/approvalMain/ApprovalWriteDetailPage')}
                >
                    임시저장
                </button>
            </div>

            {/* 결재 & 취소 버튼 그룹 */}
            <div style={{ display: "flex", gap: "10px" }}> {/* ✅ 버튼 간격 유지 */}
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
                            alert("필수 입력사항을 모두 입력해야 합니다."); // 🚨 경고 메시지
                        } else {
                            setModalOpen(true);
                        }
                    }}
                >
                    결재상신
                </button>

                {/* ✅ 모달 창 */}
                {modalOpen && (
                    <ApprovalMemoModal
                        onClose={() => setModalOpen(false)}
                        onSave={(memoContent) => {
                            setApprovalMemoData((prevData) => ({
                                ...prevData,
                                memoContent,
                            }));
                            setModalOpen(false);
                            submitApproval(memoContent); // ✅ 저장 후 데이터 전송
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

                {/* 결재취소 확인 모달 */}
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
