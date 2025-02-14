
import { ApprovalFooter } from '../components/approval/approvalFooter';
import { ApprovalHeader } from '../components/approval/approvalHeader';
import { ApprovalPost } from '../components/approval/approvalPost';
import { ApprovalSearchBar } from '../components/approval/approvalSearchBar';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

export const ApprovalMain = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalPost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}