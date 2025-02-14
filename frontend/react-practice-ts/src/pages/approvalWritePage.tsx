import ApprovalWriteBody from "../components/approval/approvalWriteBody"
import { ApprovalWriteFooter } from "../components/approval/approvalWriteFooter"
import { ApprovalWriteHeader } from "../components/approval/approvalWriteHeader"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

export const ApprovalWritePage = () => {
    return(

        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <div className="componentContainer1">
                <Header/>
                <ApprovalWriteHeader/>
                <ApprovalWriteBody/>
                <ApprovalWriteFooter/>
                </div>
            </div>
        </div>
    )
}