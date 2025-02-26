import styles from './ApprovalCard.module.css'

const ApprovalCard = () => {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>전자결재</span>
      </div>
      <div className={styles.contentContainer}>
        <span>결재 문서가
          <span className={styles.strong}>2</span>
          건 있습니다.
          <span className={styles.location}>&gt;&gt;</span>
        </span>
        <span>승인 대기 중인 결재 문서가 
          <span className={styles.strong}>5</span> 
          건 있습니다.
          <span className={styles.location}>&gt;&gt;</span>
        </span>
      </div>
    </div>
  )
}
export default ApprovalCard;