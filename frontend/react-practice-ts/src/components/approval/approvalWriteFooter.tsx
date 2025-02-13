import { useNavigate } from "react-router-dom";
import { ApprovalMemoModal } from "./approvalMemoModal";
import { useState } from "react";

export const ApprovalWriteFooter = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
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
                    onClick={() => setModalOpen(true)}
                >
                    결재상신
                </button>

                {/*모달 창*/}
                {modalOpen && <ApprovalMemoModal onClose={() => setModalOpen(false)} />}

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
                    onClick={() => navigate('/approvalMain/ApprovalWriteDetailPage')}
                >
                    결재취소
                </button>
            </div>
        </footer>
    );
};
