
import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalProgressPost } from '../../components/approval/approvalProgressPost';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalProgressPage = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalProgressPost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}