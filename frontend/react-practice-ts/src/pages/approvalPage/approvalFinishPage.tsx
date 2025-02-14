import { ApprovalFinishPost } from '../../components/approval/approvalFinishPost';
import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalFinishPage = () => {

  return (
    <div className="mainpageContainer">
    <Sidebar />
    <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalFinishPost />
          <ApprovalFooter />
        </div>
      </div>
    </div>
  );
}