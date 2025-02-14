import { ApprovalCompleteHeader } from "../components/approval/approvalCompleteHeader"
import ApprovalCompleteReply from "../components/approval/approvalCompleteRply"

import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

export const ApprovalCompletePage = () => {
    return(
        <div className="mainpageContainer">
        <Sidebar />
        <div className="componentContainer">
            <div className="componentContainer1">
        <Header/>
        <ApprovalCompleteHeader/>
        <ApprovalCompleteReply/>
    </div>
    </div>
    </div>
    )
}