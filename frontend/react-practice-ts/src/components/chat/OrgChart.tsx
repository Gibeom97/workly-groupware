import { useState, useEffect } from 'react';
import axios from "axios";
import profileIcon from "../../assets/Images/chat/profile.png";
import dropdownIcon from "../../assets/Images/chat/dropdown2.png";
import plusIcon from "../../assets/Images/chat/Plus circle.png";
import SearchClick from "./SearchClick";
import { Member } from "../../type/chatType"; // 멤버 타입이 별도로 있을 경우

interface OrgChartProps {
  onOpenCreateOrg: () => void;
}

const OrgChart = ({ onOpenCreateOrg }: OrgChartProps) => {
  const [departments, setDepartments] = useState<{ deptName: string; members: Member[] }[]>([]);
  const [openCompany, setOpenCompany] = useState<boolean>(true);
  const [openDept, setOpenDept] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 1. 부서 목록 가져오기
        const deptResponse = await axios.get("http://localhost:8003/workly/api/chat/departments");
        const allDepartments: string[] = deptResponse.data;

        // ✅ 2. 사원 목록 가져오기
        const memberResponse = await axios.get("http://localhost:8003/workly/api/chat/members");
        const members: Member[] = memberResponse.data;

        // ✅ 3. 부서별 사원 매칭
        const deptMap: { [key: string]: Member[] } = {};
        allDepartments.forEach((deptName) => {
          deptMap[deptName] = [];
        });

        members.forEach((member) => {
          if (deptMap[member.deptName]) {
            deptMap[member.deptName].push(member);
          }
        });

        // ✅ 4. 최종 데이터 구조 변환
        const formattedDepartments = Object.keys(deptMap).map((deptName) => ({
          deptName,
          members: deptMap[deptName],
        }));

        setDepartments(formattedDepartments);
      } catch (err) {
        console.error("❌ 조직도 불러오기 실패", err);
      }
    };

    fetchData();
  }, []);

  const toggleDept = (deptName: string) => {
    setOpenDept(openDept === deptName ? null : deptName);
  };

  const toggleCompany = () => {
    setOpenCompany(!openCompany);
  };

  const handleCreateDeptClick = () => {
    onOpenCreateOrg(); // 부모 상태 변경 실행 (Chat.tsx)
  };

  return (
    <div style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }}>
      {/* 상단 제목 및 그룹 추가 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#4880FF' }}>조직도</span>
        <img
          src={plusIcon}
          alt="add-group"
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          onClick={onOpenCreateOrg}
        />
      </div>

      {/* 검색창 */}
      <div>
        <SearchClick onProfileClick={() => console.log("프로필 클릭됨")} />
      </div>

      {/* 그룹 추가 */}
      <div>
        <span style={{ fontWeight: 'bold', color: '#4880FF' }}>그룹</span>
        <img src={plusIcon} onClick={handleCreateDeptClick}
          style={{ width: '15px', height: '15px', marginLeft: '5px', marginTop: '15px', cursor: 'pointer' }} />
      </div>

      {/* 회사명 */}
      <div onClick={toggleCompany} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px', marginBottom:"10px" }}>
        <img src={dropdownIcon} alt="dropdown" style={{ width: '10px', height: '10px' }} />
        <span style={{ fontWeight: 'bold', color: '#4880FF' }}>Workly</span>
      </div>

      {/* 부서 목록 */}
      {openCompany && departments.map((dept, index) => (
        <div key={index} style={{ marginBottom: '8px', marginLeft: '18px' }}>
          <div
            onClick={() => toggleDept(dept.deptName)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={dropdownIcon} alt="dropdown" style={{ width: '10px', height: '10px' }} />
              <span>{dept.deptName}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#979797' }}>{dept.members.length}/{dept.members.length}</span>
          </div>

          {openDept === dept.deptName && (
            <div style={{ marginLeft: '18px', marginTop: '5px' }}>
              {dept.members.length > 0 ? (
                dept.members.map((member, nox) => (
                  <div key={nox} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#D9D9D9',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '8px'
                    }}>
                      <img src={profileIcon} alt="user" style={{ width: '22px', height: '22px', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{member.userName} ({member.positionName})</div>
                      <div style={{ color: '#4880FF', fontSize: '12px' }}>활성화</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '12px', color: '#979797' }}>등록된 사용자가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrgChart;
