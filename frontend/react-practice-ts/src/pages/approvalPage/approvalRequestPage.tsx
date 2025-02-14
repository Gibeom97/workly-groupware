import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalRequestePost } from '../../components/approval/approvalRequestPost';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalRequestPage = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalRequestePost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}