import ApprovalWriteBody from "../components/approval/approvalWritebody"
import { ApprovalWriteFooter } from "../components/approval/approvalWriteFooter"
import { ApprovalWriteHeader } from "../components/approval/approvalWriteHeader"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import styles from "./MainPage.module.css"

export const ApprovalWritePage = () => {
    return(

        <div className={styles.mainpageContainer}>
            <Sidebar/>           
            <div className={styles.componentContainer}>
            <Header/>
            <ApprovalWriteHeader/>
            <ApprovalWriteBody/>
            <ApprovalWriteFooter/>

        </div>
        </div>


        
    )
}