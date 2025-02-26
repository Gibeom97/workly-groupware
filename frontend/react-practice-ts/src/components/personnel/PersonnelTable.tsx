import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import SearchBar from '../common/SearchBar';
import styles from './PersonnelTable.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PersonnelTable = () => {
    const [personnelList, setPersonnelList] = useState([]);
    const [pageInfo, setPageInfo] = useState();
    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState({
        cDept: "0",
        cPosi: "0",
        cStatus: "Y",
    })

    const navigate = useNavigate();
    
    const fetchPesonnel = () => {
        axios.get("http://localhost:8003/workly/personnel", {
            params: {
                cPage: currentPage,
                dept: category.cDept,
                position: category.cPosi,
                status: category.cStatus,
                name: searchMember
            }
        })
             .then((response) => {
                setPersonnelList(response.data.members);
                setPageInfo(response.data.pageInfo);
             })
             .catch(() => alert('사원 정보 조회에 실패하였습니다.'))
    };

    const handleSearch = () => {
        fetchPesonnel();
    }

    useEffect(() => {
        fetchPesonnel();
    }, [currentPage, category, searchMember]);
``
    const phoneFormat = (phone) => {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    return (
        <div className={styles.container}>
            <SearchBar 
                category={category} 
                setCategory={setCategory} 
                setCurrentPage={setCurrentPage} 
                handleSearch={handleSearch} 
                setSearchMember={setSearchMember} 
                searchMember={searchMember} 
            />
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.thStyle}>사번</th>
                        <th className={styles.thStyle}>이름</th>
                        <th className={styles.thStyle}>이메일</th>
                        <th className={styles.thStyle}>내선번호</th>
                        <th className={styles.thStyle}>연락처</th>
                        <th className={styles.thStyle}>부서</th>
                        <th className={styles.thStyle}>직급</th>
                        <th className={styles.thStyle}>입사일</th>
                        <th className={styles.thStyle}>퇴사일</th>
                        <th className={styles.thStyle}>주소</th>
                    </tr>
                </thead>
                { <tbody>
                    {personnelList.map((e, i) => (
                        <tr key={i} className={styles.rowStyle} 
                            onClick={() => navigate(`/personnel/${e.member.userNo}`)}>
                            <td className={styles.tdStyle}>{e.member.userNo}</td>
                            <td className={styles.tdStyle}>{e.member.userName}</td>
                            <td className={styles.tdStyle}>{e.member.email}</td>
                            <td className={styles.tdStyle}>{e.member.extension}</td>
                            <td className={styles.tdStyle}>{phoneFormat(e.member.phone)}</td>
                            <td className={styles.tdStyle}>{e.department.deptName}</td>
                            <td className={styles.tdStyle}>{e.position.positionName}</td>
                            <td className={styles.tdStyle}>{new Date(e.member.hireDate).toISOString().split("T")[0]}</td>
                            <td className={styles.tdStyle}>{e.member.updateDate === null ? "" : new Date(e.member.updateDate).toISOString().split("T")[0]}</td>
                            <td className={`${styles.tdStyle} ${styles.address}`}>{e.member.address}</td>
                        </tr>
                    ))}
                </tbody> }
            </table>
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default PersonnelTable;