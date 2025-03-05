import { useSelector } from 'react-redux';
import styles from './ApprovalCard.module.css'
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const ApprovalCard = () => {

const navigate = useNavigate();
const approvalRejectCount = useSelector((state: RootState) => state.notifications.approvalReject);
const approvalRequestCount = useSelector((state: RootState) => state.notifications.approvalRequest);

const goToApprovalRejectPage = () => {
  navigate("/approvalRejectPage");
};

const goToApprovalRequestPage = () => {
  navigate("/ApprovalRequestPage");
}


  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>전자결재</span>
      </div>
      <div className={styles.contentContainer}>
        <span>결재 반려된 문서가
          <span className={styles.strong}>{approvalRejectCount}</span>
          건 있습니다.
          <span className={styles.location} onClick={goToApprovalRejectPage}>&gt;&gt;</span>
        </span>
        <span>승인 대기 중인 결재 문서가 
          <span className={styles.strong}>{approvalRequestCount}</span> 
          건 있습니다.
          <span className={styles.location} onClick={goToApprovalRequestPage}>&gt;&gt;</span>
        </span>
      </div>
    </div>
  )
}
export default ApprovalCard;