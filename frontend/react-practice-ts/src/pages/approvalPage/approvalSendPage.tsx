import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalRequestePost } from '../../components/approval/approvalRequestPost';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import { ApprovalSendPost } from '../../components/approval/approvalSendPost';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalSendPage = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalSendPost />
          <ApprovalFooter/>
        </div>
      </div>
    </div>
  );
}