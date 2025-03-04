import styles from './SearchBar.module.css'
import search from '../../assets/images/icon/search.png';
import { useEffect, useState } from 'react';
import axios from '../../utils/CustomAxios';

const SearchBar = ({ category, setCategory, searchMember, setSearchMember, handleSearch, setCurrentPage }) => {
    const [dept, setDept] = useState([]);
    const [position, setPosition] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8003/workly/dept-posi")
            .then((response) => {
                setDept(response.data.department);
                setPosition(response.data.position);
            })
    }, [category])

    const handleCategoryChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
        setCurrentPage(1)
    }

    const handleSearchMember = (e) => {
        setSearchMember(e.target.value);
        setCurrentPage(1)
    }

    const handleReset = () => {
        setCategory({
            cDept: "0",
            cPosi: "0",
            cStatus: "Y",
        });
        setSearchMember('');
    }

    const handelEnter = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.filterGroup}>
                <select name="cDept" value={category.cDept} className={styles.select} onChange={handleCategoryChange}>
                    <option value="0" >부서명</option>
                    {
                        dept.map(function (e, i) {
                            return (
                                <option key={e.deptNo} value={e.deptNo}>{e.deptName}</option>
                            )
                        })
                    }
                </select>
                <select name="cPosi" value={category.cPosi} className={styles.select} onChange={handleCategoryChange}>
                    <option value="0">직급</option>
                    {
                        position.map(function (e, i) {
                            return (
                                <option key={e.positionNo} value={e.positionNo}>{e.positionName}</option>
                            )
                        })
                    }
                </select>
                <select name="cStatus" value={category.cStatus} className={styles.select} onChange={handleCategoryChange}>
                    <option value="0">전체</option>
                    <option value="Y">재직</option>
                    <option value="X">퇴직</option>
                    <option value="Z">휴직</option>
                </select>
                <div onClick={handleReset} className={styles.reset}>초기화</div>
            </div>
            <div className={styles.search} onKeyDown={handelEnter}>
                <input type="text" value={searchMember} onChange={handleSearchMember} className={styles.input} placeholder="사원 검색" />
                <button onClick={handleSearch} className={styles.searchButton}><img src={search}  alt='search' /></button>
            </div>
        </div>
    )
}

export default SearchBar;
