
import { ApprovalFooter } from '../components/approval/approvalFooter';
import { ApprovalHeader } from '../components/approval/approvalHeader';
import { ApprovalPost } from '../components/approval/approvalPost';
import { ApprovalSearchBar } from '../components/approval/approvalSearchBar';
import './App.css'

const approvalMain = () => {

      return (
        <div id="container">
          <ApprovalHeader />
            <ApprovalSearchBar />
            <ApprovalPost />
          <ApprovalFooter />
        </div>
      );
}