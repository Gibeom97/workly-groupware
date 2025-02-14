import { useState } from 'react';
import SearchClick from './SearchClick'; // 돋보기 검색창 컴포넌트 (네가 만든 컴포넌트라고 가정)

interface Member {
  id: number;
  name: string;
  position: string;
  team: string;
}

const SearchMember = () => {
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);

  const members: Member[] = [
    { id: 1, name: '박솜이', position: '이사', team: '경영지원팀' },
    { id: 2, name: '안관주', position: '이사', team: '경영지원팀' },
    { id: 3, name: '임사윤', position: '부장', team: '경영지원팀' },
    { id: 4, name: '김자수', position: '대리', team: '경영지원팀' },
    { id: 5, name: '김예삐', position: '주임', team: '인사팀' },
    { id: 6, name: '채소염', position: '주임', team: '인사팀' },
    { id: 7, name: '최웡카', position: '부장', team: '인사팀' },
    { id: 8, name: '김기밤', position: '대리', team: '인사팀' },
    { id: 9, name: '김젤리', position: '사원', team: '인사팀' },
    { id: 10, name: '이용휘', position: '주임', team: '인사팀' },
  ];

  const toggleCheck = (id: number) => {
    setCheckedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const groupedMembers = members.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.team]) {
      acc[member.team] = [];
    }
    acc[member.team].push(member);
    return acc;
  }, {});

  return (
    <div
      className="searchMember"
      style={{
        width: '390px',
        height: '600px',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: '3px',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        paddingTop: '5px',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          backgroundColor: '#E9EBF1',
          height: '33px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '15px',
          borderRadius: '3px 3px 0 0',
        }}
      >
        <span style={{ color: '#4880FF', fontWeight: '800', fontSize: '18px' }}>사용자 검색</span>
      </div>

      {/* 검색 입력 */}
      <div style={{ margin: '10px 45px' }}>
        <SearchClick />
      </div>

      {/* 테이블 스타일로 구성 */}
      <div style={{ overflowY: 'auto', maxHeight: '440px',paddingLeft:'40px' }}>
        <table
          style={{
            width: '90%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: 'white', borderBottom: '2px solid #4880FF' }}>
              <th style={{ color: '#4880FF', padding: '8px 0', textAlign: 'center' }}>부서명</th>
              <th
                style={{
                  color: '#4880FF',
                  padding: '8px 0',
                  textAlign: 'center',
                  borderLeft: '1px solid #D8D8D8',
                }}
              >
                성명
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedMembers).map(([team, teamMembers]) => {
              return teamMembers.map((member, index) => (
                <tr key={member.id} style={{ borderBottom: '1px solid #D8D8D8' }}>
                  {index === 0 && (
                    <td
                      rowSpan={teamMembers.length}
                      style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight: '600',
                        color: 'black',
                      }}
                    >
                      {team}
                    </td>
                  )}
                  <td
                    style={{
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      borderLeft: '1px solid #D8D8D8',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedMembers.includes(member.id)}
                      onChange={() => toggleCheck(member.id)}
                      style={{
                        marginRight: '8px',
                        accentColor: '#4880FF',
                        cursor: 'pointer',
                      }}
                    />
                    {member.name} {member.position}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>

      {/* 확인 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          style={{
            backgroundColor: '#4880FF',
            color: 'white',
            fontWeight: '600',
            borderRadius: '5px',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
          onClick={() => console.log('선택된 멤버:', checkedMembers)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SearchMember;
