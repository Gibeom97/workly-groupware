import { ApprovalCompleteHeader } from "../components/approval/approvalCompleteHeader"
import ApprovalCompleteReply from "../components/approval/approvalCompleteRply"

import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import styles from "./MainPage.module.css"

export const ApprovalCompletePage = () => {
    return(
        <div className={styles.mainpageContainer}>
        <Sidebar/>           
        <div className={styles.componentContainer}>
        <Header/>
        <ApprovalCompleteHeader/>
        <ApprovalCompleteReply/>

    </div>
    </div>
    )
}