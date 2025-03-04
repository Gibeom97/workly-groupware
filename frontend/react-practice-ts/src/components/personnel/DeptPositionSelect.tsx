import { useEffect, useState } from 'react'
import styles from './DeptPositionSelect.module.css'
import axios from '../../utils/CustomAxios'

const DeptPositionSelect = ({positionNo, deptNo, handleChange}) => {

    const [dept, setDept] = useState([]);
    const [position, setPosition] = useState([]);
    const [selectedDept, setSelectedDept] = useState(deptNo);
    const [selectedPosition, setSelectedPosition] = useState(positionNo);
    
    useEffect(() => {
        axios.get("http://localhost:8003/workly/dept-posi")
             .then((response) => {
                setDept(response.data.department);
                setPosition(response.data.position);
             })
             .catch(() => alert("부서 정보 조회에 실패하였습니다."))
    }, [])

    useEffect(() => {
        setSelectedDept(deptNo);
        setSelectedPosition(positionNo);
    }, [deptNo, positionNo]);
    // value={selectedDept}
    return (
        <>
            <select name="deptNo" value={selectedDept} className={styles.input} onChange={handleChange} required>
                <option value="0" disabled >부서명</option>
                { 
                    dept.map(function(e, i){
                        return (
                            <option key={e.deptNo} value={e.deptNo}>{e.deptName}</option>    
                        )
                    })
                }
            </select>
            <select name="positionNo" value={selectedPosition} className={styles.input} onChange={handleChange} required>
                <option value="0" disabled>직급명</option>
                {
                    position.map(function(e,i) {
                        return (
                            <option key={e.positionNo} value={e.positionNo}>{e.positionName}</option>    
                        )
                    })
                }
            </select>
        </>
    )
}

export default DeptPositionSelect;