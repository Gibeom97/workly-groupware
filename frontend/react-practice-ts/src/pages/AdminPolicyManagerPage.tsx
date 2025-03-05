import AdminPolicyManager from '../components/AI/AdminPolicyManager';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AdminPolicyManagerPage = () => {
    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div>
                    <AdminPolicyManager/>
                </div>
            </div>
        </div>
    )
}

export default AdminPolicyManagerPage;