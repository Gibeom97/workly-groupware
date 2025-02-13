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
    
    useEffect(() => {
        axios.get("http://localhost:8003/workly/personnel")
             .then((response) => {
                 setPersonnelList(response.data);
                 console.log(response);
                 console.log(personnelList);
             })
    }, []);

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
                            <PersonnelTable />
                            <Pagination />
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