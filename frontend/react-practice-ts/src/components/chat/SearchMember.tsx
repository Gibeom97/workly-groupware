import SearchClick from './SearchClick';
import { useState } from 'react';

interface Member {
  id: number;
  name: string;
  position: string;
  team: string;
}

export interface SearchMemberProps {
  chatType: string;
  chatName: string;
  onComplete: (result: {
    chatName?: string;
    chatType?: string;
    selectedMembers?: Member[];
    deptName?: string;
  }) => void;
  mode?: 'chat' | 'dept'; // mode prop 추가
}

const SearchMember = ({
  chatType,
  chatName,
  onComplete,
  mode = 'chat', // 기본값은 'chat'
}: SearchMemberProps) => {
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
    if (chatType === '1:1') {
      setCheckedMembers((prev) => (prev.includes(id) ? [] : [id]));
    } else {
      setCheckedMembers((prev) =>
        prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
      );
    }
  };

  const handleConfirm = () => {
    if (checkedMembers.length === 0) {
      alert('대화 상대를 선택해주세요');
      return;
    }

    const selectedMembers = members.filter((m) => checkedMembers.includes(m.id));

    if (mode === 'chat') {
      alert('채팅방 생성 완료되었습니다.');
      onComplete({ chatName, chatType, selectedMembers });
    } else if (mode === 'dept') {
      alert('부서 생성 완료되었습니다!');
      onComplete({ deptName: '신규 부서명' });
    }
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
        paddingLeft: '5px',
      }}
    >
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

      <div style={{ margin: '10px 45px' }}>
        <SearchClick />
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '440px', paddingLeft: '30px' }}>
        <table
          style={{
            width: '90%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: 'white', borderBottom: '2px solid #4880FF' }}>
              <th style={{ width: '45%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }}>
                부서명
              </th>
              <th style={{ width: '55%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }}>
                성명
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedMembers).map(([team, teamMembers]) =>
              teamMembers.map((member, index) => (
                <tr key={member.id} style={{ position: 'relative', height: '35px' }}>
                  {index === 0 && (
                    <td
                      rowSpan={teamMembers.length}
                      style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight: '600',
                        color: 'black',
                        position: 'relative',
                      }}
                    >
                      {team}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: '-17px',
                          left: 0,
                          height: '1px',
                          backgroundColor: '#D8D8D8',
                        }}
                      />
                    </td>
                  )}

                  <td style={{ position: 'relative', paddingLeft: '25px', height: '35px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={checkedMembers.includes(member.id)}
                        onChange={() => toggleCheck(member.id)}
                        style={{
                          marginRight: '10px',
                          marginLeft: '10px',
                          accentColor: '#4880FF',
                          cursor: 'pointer',
                        }}
                      />
                      {member.name} {member.position}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '17px',
                        width: '1px',
                        backgroundColor: '#D8D8D8',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '17px',
                        right: 0,
                        height: '1px',
                        backgroundColor: '#D8D8D8',
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          style={{
            marginTop: '10px',
            backgroundColor: '#4880FF',
            color: 'white',
            fontWeight: '600',
            borderRadius: '5px',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SearchMember;