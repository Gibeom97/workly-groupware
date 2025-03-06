import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ApprovalRejectFooterProps {
  selectedPosts: number[];
  onDelete: () => void;
}

export const ApprovalRejectFooter = ({ 
  selectedPosts, 
  onDelete 
}: ApprovalRejectFooterProps) => {
  const navigate = useNavigate();
  
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      padding: "20px",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "10px"
    }}>
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
        }}
        onClick={() => navigate('/ApprovalWritePage')}
      >
        작성하기
      </button>
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
        }}
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
};
