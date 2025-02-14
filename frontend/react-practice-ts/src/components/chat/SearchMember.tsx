import { useState } from 'react';

interface Member {
  id: number;
  name: string;
  position: string;
  dept: string;
}

const SearchMember = () => {
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);

  const members: Member[] = [
    { id: 1, name: '박솜이', position: '이사', dept: '경영지원팀' },
    { id: 2, name: '안관주', position: '이사', dept: '경영지원팀' },
    { id: 3, name: '임사윤', position: '부장', dept: '경영지원팀' },
    { id: 4, name: '김자수', position: '대리', dept: '경영지원팀' },
    { id: 5, name: '김예삐', position: '주임', dept: '인사팀' },
    { id: 6, name: '채소염', position: '주임', dept: '인사팀' },
    { id: 7, name: '최웡카', position: '부장', dept: '인사팀' },
    { id: 8, name: '김기밤', position: '대리', dept: '인사팀' },
    { id: 9, name: '김젤리', position: '사원', dept: '인사팀' },
    { id: 10, name: '이용휘', position: '주임', dept: '인사팀' },
  ];

  const toggleCheck = (id: number) => {
    setCheckedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const groupedMembers = members.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.dept]) {
      acc[member.dept] = [];
    }
    acc[member.dept].push(member);
    return acc;
  }, {});

  return (
    <div
      className="searchMember"
      style={{
        width: '391px',
        height: '600px',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: '3px',
        padding: '10px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* 헤더 */}
      <div style={{ backgroundColor: '#E9EBF1', height: '33px', display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
        <span style={{ color: '#4880FF', fontWeight: '800', fontSize: '18px' }}>사용자 검색</span>
      </div>

      {/* 테이블 헤더 */}
      <div style={{ display: 'flex', marginTop: '15px', marginBottom: '5px' }}>
        <div style={{ flex: 1, color: '#4880FF', fontWeight: '600' }}>부서명</div>
        <div style={{ flex: 1, color: '#4880FF', fontWeight: '600' }}>성명</div>
      </div>

      {/* 리스트 */}
      <div style={{ height: '450px', overflowY: 'scroll', borderTop: '2px solid #4880FF' }}>
        {Object.entries(groupedMembers).map(([dept, deptMembers], index) => (
          <div key={dept}>
            {index !== 0 && <hr style={{ margin: '10px 0', border: '0.5px solid #D8D8D8' }} />}
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>{dept}</div>
            {deptMembers.map((member) => (
              <div key={member.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}></div>
                <input
                  type="checkbox"
                  checked={checkedMembers.includes(member.id)}
                  onChange={() => toggleCheck(member.id)}
                />
                <div style={{ flex: 1 }}>{`${member.name} ${member.position}`}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 확인 버튼 */}
      <button
        style={{
          marginTop: '10px',
          backgroundColor: '#4880FF',
          color: 'white',
          fontWeight: '600',
          borderRadius: '5px',
          border: 'none',
          padding: '8px',
          width: '70px',
          cursor: 'pointer',
          alignSelf: 'center',
        }}
        onClick={() => console.log('선택된 멤버:', checkedMembers)}
      >
        확인
      </button>
    </div>
  );
};

export default SearchMember;
