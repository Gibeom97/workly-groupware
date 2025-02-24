import { useNavigate } from "react-router-dom";
import { ApprovalMemoModal } from "./approvalMemoModal";
import ApprovalOutcheckModal from "./approvalOutcheckModal";
import { useEffect, useState } from "react";
import axios from "axios";

export const ApprovalWriteFooter = ({ approvalData, approvalLine }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [outCheckModalOpen, setOutCheckModalOpen] = useState(false);

    const [approvalMemoData, setApprovalMemoData] = useState({
        userNo: approvalData?.userNo ?? 1,
        approvalNo: approvalData.approvalNo || null,
        memoContent: "",
        memoDate: new Date().toISOString(),
    });

    // 데이터 확인용 로그
    useEffect(() => {
        console.log("footer에서 받은 approvalData:", approvalData);
    }, [approvalData]);

    useEffect(() => {
        if (approvalData?.approvalNo && approvalMemoData.approvalNo !== approvalData.approvalNo) {
            setApprovalMemoData((prevMemoData) => ({
                ...prevMemoData,
                approvalNo: approvalData.approvalNo,
                userNo: prevMemoData.userNo,
            }));
        }
    }, [approvalData.approvalNo]);

    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/approvalMain/ApprovalWriteDetailPage");
    };

    // ✅ 임시저장 + 불러오기
    const handleTempSave = async () => {
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
      
    


    // ✅ 결재 문서 + 결재 의견 + 결재라인 저장
    const submitApproval = async (memoContent: any) => {
        try {
            const approvalResponse = await axios.post(
                "http://localhost:8003/workly/api/approval/submit",
                approvalData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const approvalNo = approvalResponse.data?.approvalNo;

            if (!approvalNo) {
                console.error("approvalNo를 받지 못함. 서버 응답 확인:", approvalResponse.data);
                throw new Error("Invalid approvalNo received");
            }

            setApprovalMemoData((prevState) => ({
                ...prevState,
                approvalNo: approvalNo,
            }));

            await new Promise((resolve) => setTimeout(resolve, 500));

            const finalApprovalMemoData = {
                ...approvalMemoData,
                approvalNo: approvalNo,
                userNo: approvalData.userNo,
                memoContent: memoContent,
            };

            await axios.post(
                "http://localhost:8003/workly/api/approvalMemos/create",
                finalApprovalMemoData
            );

            if ((approvalData.approvalLine ?? []).length > 0) {
                const approvalLineData = approvalData.approvalLine.map((emp) => ({
                    approvalNo: approvalNo,
                    approvalLineType: emp.approvalType,
                    type: emp.type,
                    approvalLevel: emp.level,
                    userNo: emp.USER_NO,
                }));

                await axios.post(
                    "http://localhost:8003/workly/api/approval/saveApprovalLine",
                    approvalLineData
                );
            }

            if (approvalData.attachments?.length > 0) {
                const formData = new FormData();
                approvalData.attachments.forEach((file: File) => {
                    formData.append("files", file);
                });
                formData.append("approvalNo", approvalNo.toString());

                await axios.post(
                    "http://localhost:8003/workly/api/approval/attachments",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
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
                            setModalOpen(true);
                        }
                    }}
                >
                    결재상신
                </button>

                {modalOpen && (
                    <ApprovalMemoModal
                        onClose={() => setModalOpen(false)}
                        onSave={(memoContent) => {
                            setApprovalMemoData((prevData) => ({
                                ...prevData,
                                memoContent,
                            }));
                            setModalOpen(false);
                            submitApproval(memoContent);
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
