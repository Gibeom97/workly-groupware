import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import Sidebar from '../components/common/Sidebar';
import Category from '../components/personnel/Category';
import PersonnelTable from '../components/personnel/PersonnelTable';
import CreateEmployee from '../components/personnel/CreateEmployee';
import ManagePermission from '../components/personnel/ManagePermission';
import axios from 'axios';

const PersonnelMain = () => {
    const [activeComponent, setActiveComponent] = useState("viewPersonnel");
    const [personnelList, setPersonnelList] = useState([]);
    const [pageInfo, setPageInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    
    const fetchPesonnel = () => {
        axios.get("http://localhost:8003/workly/personnel", {
            params: {cPage: currentPage}
        })
             .then((response) => {
                setPersonnelList(response.data.members);
                setPageInfo(response.data.pageInfo);
             })
    };

    useEffect(() => {
        fetchPesonnel();
    }, [currentPage]);


    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <Category activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>
                    {activeComponent === "viewPersonnel" && (
                        <>
                            <SearchBar />
                            <PersonnelTable personnelList={personnelList}/>
                            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
                        </>
                    )}
                    {activeComponent === "createEmployee" && <CreateEmployee/>}
                    {activeComponent === "managePermissions" && <ManagePermission/>}
                </div>
            </div>
        </div>
    )
}

export default PersonnelMain;