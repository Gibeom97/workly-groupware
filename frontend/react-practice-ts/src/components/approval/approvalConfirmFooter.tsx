import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ApprovalConfirmMemoModal } from "./approvalConfirmMemoModal";

export const ApprovalConfirmFooter = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const {approvalNo} = useParams();

    const handleSave = (memoContent) => {
        console.log("Memo Content:", memoContent);

        setModalOpen(false);
    }
    
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
            {/* 목록 버튼 */}
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
                    onClick={() => navigate('/approvalMain')}
                >
                    목록
                </button>
            </div>

            {/* 승인 & 반려 버튼 그룹 */}
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
                    onClick={() => setModalOpen(true)}
                >
                    승인
                </button>

                {/*모달 창*/}
                {modalOpen && (
                    <ApprovalConfirmMemoModal
                    approvalNo={approvalNo}
                     onClose={() => setModalOpen(false)} 
                     onSave={handleSave}
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
                    //onClick={() => navigate('/approvalMain/ApprovalWriteDetailPage')}
                >
                    반려
                </button>
            </div>
        </footer>
    );
};
