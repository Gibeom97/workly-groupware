import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./OrganizationChart.module.css";

// 백엔드에서 업로드된 프로필 이미지가 위치하는 기본 URL
const baseProfileUrl = "http://localhost:8003/workly";

// 백엔드에서 내려오는 데이터 구조
interface MemberMap {
  userNo: number;
  userName?: string;  // 소문자 키
  USERNAME?: string; // 대문자 키
  positionNo: number;
  positionName?: string;
  deptNo: number;
  companyId: number;
  phone?: string;
  extension?: string;
  email?: string;
  profileImage?: string;
}

interface DepartmentMap {
  deptNo: number;
  deptName: string;
  topDeptCode: string;
  members: MemberMap[];
  children: DepartmentMap[];
}

// 화면에서 사용하는 직원 정보
interface Employee {
  userNo: number;
  userName: string; // 항상 소문자로 통일
  positionName?: string;
  deptName: string;
  companyId: number;
  phone?: string;
  extension?: string;
  email?: string;
  profileImage?: string;
}

const OrganizationChart: React.FC = () => {
  // 1) Redux user 가져오기
  const user = useSelector((state: any) => state.user);
  const companyId = user?.companyId;

  console.log("Redux user:", user);
  console.log("Redux user companyId:", companyId);

  // 2) 상태 정의
  const [departments, setDepartments] = useState<DepartmentMap[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 모달 관련 상태
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 3) 백엔드에서 조직도(Map) 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/organization/map")
      .then((response) => {
        console.log("✅ 조직도 데이터 (Map):", response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("🚨 조직도 불러오기 오류:", error);
      });
  }, []);

  // 4) 부서 트리에서 모든 구성원을 평면화
  const flattenEmployees = (depts: DepartmentMap[]): Employee[] => {
    let empList: Employee[] = [];
    depts.forEach((dept) => {
      // dept.members (MemberMap[]) → Employee[]
      const deptMembers = dept.members.map((m) => {
        // userName은 소문자(userName) 또는 대문자(USERNAME) 중 존재하는 값
        const name = m.userName || m.USERNAME || "";
        return {
          userNo: m.userNo,
          userName: name,
          positionName: m.positionName,
          deptName: dept.deptName,
          companyId: m.companyId,
          phone: m.phone,
          extension: m.extension,
          email: m.email,
          profileImage: m.profileImage,
        };
      });
      empList = empList.concat(deptMembers);

      if (dept.children && dept.children.length > 0) {
        empList = empList.concat(flattenEmployees(dept.children));
      }
    });
    return empList;
  };

  // 5) departments가 변경될 때마다 employees 업데이트
  useEffect(() => {
    const flatList = flattenEmployees(departments);
    setEmployees(flatList);
    console.log("flattened employees:", flatList); // ★ 모든 사원 정보 확인
  }, [departments]);

  // 6) 검색 + 회사ID 필터
  const filteredEmployees = employees.filter((emp) => {
    // userName fallback
    const name = emp.userName || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      emp.companyId === companyId
    );
  });

  console.log("searchTerm:", searchTerm);
  console.log("filteredEmployees:", filteredEmployees);

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // 행 클릭 → 모달 열기
  const handleRowClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  return (
    <div className={styles.orgChartContainer}>
      <h2 className={styles.orgChartTitle}>회사 조직도</h2>

      {/* 검색 영역 */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="사원이름 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* 직원 목록 테이블 */}
      <div className={styles.tableContainer}>
        <table className={styles.orgTable}>
          <thead>
            <tr>
              <th>부서</th>
              <th>직급</th>
              <th>사원</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, i) => (
                <tr
                  key={i}
                  onClick={() => handleRowClick(emp)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{emp.deptName}</td>
                  <td>{emp.positionName ?? ""}</td>
                  <td>{emp.userName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                  데이터 없음
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달창 */}
      {showModal && selectedEmployee && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalProfile}>
              <img
                src={
                  selectedEmployee.profileImage
                    ? baseProfileUrl + selectedEmployee.profileImage
                    : `/src/assets/Images/icon/profile.png`
                }
                alt="Profile"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.modalInfo}>
              <div className={styles.modalName}>{selectedEmployee.userName}</div>
              <p className={styles.modalDetail}>
                <strong>부서:</strong> {selectedEmployee.deptName}
              </p>
              <p className={styles.modalDetail}>
                <strong>직급:</strong> {selectedEmployee.positionName ?? ""}
              </p>
              <p className={styles.modalDetail}>
                <strong>내선번호:</strong>{" "}
                {selectedEmployee.extension ?? "정보 없음"}
              </p>
              <p className={styles.modalDetail}>
                <strong>이메일:</strong> {selectedEmployee.email ?? "정보 없음"}
              </p>
            </div>
            <button className={styles.modalCloseButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationChart;
