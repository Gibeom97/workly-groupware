import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalReferencePost } from '../../components/approval/approvalReferencePost';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalReferencePage = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalReferencePost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}