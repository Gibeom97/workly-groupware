import React, { useState } from "react";

const ApprovalCCModal = ({ onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([
    { id: 1, name: "김예삔 주임" },
    { id: 2, name: "김젤리 사원" },
  ]);

  const employees = [
    { id: 3, department: "임원", name: "박삼이 이사" },
    { id: 4, department: "영업팀", name: "최웡카 과장" },
    { id: 5, department: "영업팀", name: "김기밤 대리" },
    { id: 6, department: "영업팀", name: "채소염 주임" },
    { id: 7, department: "인사팀", name: "김예삔 주임" },
    { id: 8, department: "인사팀", name: "김젤리 사원" },
  ];

  const handleSelect = (employee) => {
    if (!selectedUsers.some((user) => user.id === employee.id)) {
      setSelectedUsers([...selectedUsers, employee]);
    }
  };

  const handleRemove = (id) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
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
          <input type="text" placeholder="이름 입력" style={searchInput} />
        </div>

        <div style={contentContainer}>
          {/* ✅ 부서 및 사원 목록 */}
          <div style={listContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>부서</th>
                  <th style={thStyle}>사원</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} style={trStyle} onClick={() => handleSelect(employee)}>
                    <td style={tdStyle}>{employee.department}</td>
                    <td style={tdStyle}>{employee.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ 선택된 사원 목록 */}
          <div style={selectedListContainer}>
            <ul style={selectedList}>
              {selectedUsers.map((user, index) => (
                <li key={user.id} style={selectedItem}>
                  {index + 1}. {user.name}
                  <button style={removeButton} onClick={() => handleRemove(user.id)}> - </button>
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
