import { useNavigate } from "react-router-dom";

export const ApprovalWriteFooter = () => {
    const navigate = useNavigate();
    return(
    <footer>
    <button
        style={{
            width: 75,
            height: 30,
            background: "#4880FF",
            borderRadius: 14,
            border: "0.30px solid #B9B9B9",
            color: "white", // ✅ 글자색 추가
            fontSize: 12, // ✅ 글자 크기 추가
            fontWeight: 600, // ✅ 글자 두께 추가
            cursor: "pointer", // ✅ 클릭 가능한 버튼 스타일
            display: "flex", // ✅ 중앙 정렬을 위한 flex 설정
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "100px",
        }}
        onClick={() => navigate('/ApprovalWriteDetailPage')} //style={{ cursor: "pointer" }} // ✅ 클릭 이벤트 추가
        />
    </footer>
    )
}