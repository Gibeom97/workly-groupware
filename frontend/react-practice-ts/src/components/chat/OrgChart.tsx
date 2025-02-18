import { useState } from 'react';
import profileIcon from "../../assets/Images/chat/profile.png";
import dropdownIcon from "../../assets/Images/chat/dropdown2.png";
import plusIcon from "../../assets/Images/chat/Plus circle.png";
import SearchClick from "./SearchClick";
import { Member } from "../../type/chatType"; // 멤버 타입이 별도로 있을 경우

interface OrgChartProps {
  departments: { deptName: string; members: Member[] }[];
  onOpenCreateOrg: () => void;
}

const OrgChart = ({ departments, onOpenCreateOrg }: OrgChartProps) => {
  const [openCompany, setOpenCompany] = useState<boolean>(true);
  const [openDept, setOpenDept] = useState<string | null>(null);

  const toggleDept = (deptName: string) => {
    setOpenDept(openDept === deptName ? null : deptName);
  };

  const toggleCompany = () => {
    setOpenCompany(!openCompany);
  };
  
  const handleCreateDeptClick = () => {
    onOpenCreateOrg(); // 부모 상태 변경 실행 (Chat.tsx)
  }

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
        <SearchClick />
      </div>

      {/* 그룹 추가 */}
      <div>
        <span style={{ fontWeight: 'bold', color: '#4880FF' }}>그룹</span>
        <img src={plusIcon} onClick={handleCreateDeptClick}
          style={{ width: '15px', height: '15px', marginLeft: '5px', marginTop: '15px', cursor: 'pointer' }} />
      </div>


      {/* 회사명 */}
      <div onClick={toggleCompany} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px' }}>
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
                      <div style={{ fontWeight: 'bold' }}>{member.name} {member.position}</div>
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
