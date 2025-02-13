
import { ApprovalFooter } from '../components/approval/approvalFooter';
import { ApprovalHeader } from '../components/approval/approvalHeader';
import { ApprovalPost } from '../components/approval/approvalPost';
import { ApprovalSearchBar } from '../components/approval/approvalSearchBar';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import styles from "./MainPage.module.css"

export const ApprovalMain = () => {

  return (
    <div className={styles.mainpageContainer}>
      <Sidebar />
      <div className={styles.componentContainer}>
        <Header />
        <div id="container">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalPost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}