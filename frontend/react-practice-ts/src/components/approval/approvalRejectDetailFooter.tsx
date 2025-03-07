import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ApprovalRejectDetailFooter = () => {
    const navigate = useNavigate();
    const {approvalNo} = useParams();

    // 삭제 함수
    const handleDelet = async () => {
        if(!approvalNo){
            alert("삭제할 문서가 없습니다.");
            return;
        }

        // 삭제 확인 알럿
        const isConfirmed = window.confirm("삭제하시겠습니까?");
        if(!isConfirmed) return; // 사용자가 취소하면 종료

        try{
            // 백엔드에 삭제 요청
            await axios.delete(`http://localhost:8003/workly/api/approval/deleteApproval/${approvalNo}`);

            alert("문서가 삭제되었습니다.");

            // 삭제 후 페이지 이동
            navigate('/ApprovalRejectPage');
        }catch(error){
            console.log("문서 삭제 실패:", error);
            alert("문서 삭제 중 오류가 발생했습니다");
        }
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
            {/* 목록/회수 버튼 */}
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
                    onClick={() => navigate('/ApprovalRejectPage')}
                >
                    목록
                </button>
            </div>



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
                    onClick={handleDelet}
                >
                    삭제
                </button>
        </footer>
    );
};