import axios from "axios";
import React, { useEffect, useState } from "react";

interface Employee {
  USER_NO: number;
  USER_NAME: string;
  DEPT_NAME: string;
  POSITION_NAME: string;
}

const ApprovalCCModal = ({ onClose }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[selectedUsers, setSelectedUsers] = useState([]);


  // ✅ 백엔드에서 직원 목록 가져오기 (axios 사용)
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/api/approval/approvalLineList")
      .then((response) => {
        console.log("가져온 직원 목록: ", response.data)
        setEmployees(response.data);
      })
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  }, []);

  
  // ✅ 검색어 적용된 직원 목록 필터링
  const filteredEmployees = employees.filter((emp) =>
    emp.USER_NAME.includes(searchTerm)
  );

  // 직원 선택
  const handleSelect = (employee) => {
    if(!selectedUsers.some((user) => user.USER_NO === employee.USER_NO)){
      setSelectedUsers([...selectedUsers, employee]);
    }
  };
  
  // 선택한 직원 제거거
  const handleRemove = (userNo) => {
    setSelectedUsers(selectedUsers.filter((user) => user.USER_NO !== userNo));
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        {/* ✅ 모달 헤더 */}
        <div style={modalHeader}>
          <h2 style={modalTitle}>참조</h2>
          <button style={closeButton} onClick={onClose}>×</button>
        </div>

        {/* ✅ 검색창 */}
        <div style={searchContainer}>
          <input type="text" 
          placeholder="이름 입력" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInput} 
          />
        </div>

        <div style={contentContainer}>
          {/* ✅ 부서 및 사원 목록 */}
          <div style={listContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>부서</th>
                  <th style={thStyle}>사원</th>
                  <th style={thStyle}>직급</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map ((employee) => (
                    <tr key={employee.USER_NO} style={trStyle} onClick={() => handleSelect(employee)}>
                      <td style={tdStyle}>{employee.DEPT_NAME}</td>
                      <td style={tdStyle}>{employee.USER_NAME}</td>
                      <td style={tdStyle}>{employee.POSITION_NAME}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{textAlign: "center", padding: "10px", color: "gray"}}>
                      검색 결과 없음
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ 선택된 사원 목록 */}
          <div style={selectedListContainer}>
            <ul style={selectedList}>
              {selectedUsers.map((user, index) => (
                <li key={user.USER_NO} style={selectedItem}>
                  {index + 1}. {user.USER_NAME}
                  <button style={removeButton} onClick={() => handleRemove(user.USER_NO)}> - </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ 저장 버튼 */}
        <button style={saveButton}>참조 저장</button>
      </div>
    </div>
  );
};

// ✅ **스타일 정의 (JSX 외부에 위치)**
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContainer = {
  width: "770px",
  height: "600px",
  background: "white",
  borderRadius: "8px",
  padding: "20px",
  position: "relative",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "0 10px",
  position: "relative",
  height: "40px",
};

const closeButton = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "20px",
  cursor: "pointer",
  background: "none",
  border: "none",
  padding: "0",
  color: "#666",
  zIndex: "1000",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
};

const searchContainer = {
  marginBottom: "10px",
};

const searchInput = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const contentContainer = {
  display: "flex",
  gap: "20px",
};

const listContainer = {
  flex: 1,
  border: "1px solid #404040",
  borderRadius: "5px",
  overflowY: "auto",
  height: "400px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #404040",
  background: "#f5f5f5",
  fontWeight: "bold",
  textAlign: "left",
};

const trStyle = {
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
};

const selectedListContainer = {
  width: "250px",
  border: "1px solid #404040",
  borderRadius: "5px",
  padding: "10px",
  background: "white",
};

const selectedList = {
  listStyle: "none",
  padding: 0,
};

const selectedItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const removeButton = {
  background: "white",
  border: "1px solid black",
  borderRadius: "5px",
  cursor: "pointer",
  padding: "2px 8px",
  fontSize: "16px",
};

const saveButton = {
  width: "100%",
  padding: "12px",
  background: "#4880FF",
  border: "none",
  borderRadius: "5px",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "20px",
  cursor: "pointer",
};

export default ApprovalCCModal;
