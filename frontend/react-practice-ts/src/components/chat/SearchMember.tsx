import SearchClick from './SearchClick';
import { useState } from 'react';

interface Member {
  no: number;
  name: string;
  position: string;
  team: string;
}

const SearchMember = ({
  chatType,
  chatName,
  onComplete,
}: {
  chatType: string;
  chatName: string;
  onComplete: (newChatRoom: {
    chatName: string;
    chatType: string;
    selectedMembers: Member[];
  }) => void;
}) => {
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);

  const members: Member[] = [
    { no: 1, name: '박솜이', position: '이사', team: '경영지원팀' },
    { no: 2, name: '안관주', position: '이사', team: '경영지원팀' },
    { no: 3, name: '임사윤', position: '부장', team: '경영지원팀' },
    { no: 4, name: '김자수', position: '대리', team: '경영지원팀' },
    { no: 5, name: '김예삐', position: '주임', team: '인사팀' },
    { no: 6, name: '채소염', position: '주임', team: '인사팀' },
    { no: 7, name: '최웡카', position: '부장', team: '인사팀' },
    { no: 8, name: '김기밤', position: '대리', team: '인사팀' },
    { no: 9, name: '김젤리', position: '사원', team: '인사팀' },
    { no: 10, name: '이용휘', position: '주임', team: '인사팀' },
  ];

  const toggleCheck = (no: number) => {
    if (chatType === '1:1') {
      setCheckedMembers((prev) => (prev.includes(no) ? [] : [no]));
    } else {
      setCheckedMembers((prev) =>
        prev.includes(no) ? prev.filter((memberNo) => memberNo !== no) : [...prev, no]
      );
    }
  };

  const handleConfirm = () => {
    if (checkedMembers.length === 0) {
      alert('대화 상대를 선택해주세요');
      return;
    }

    alert('채팅방 생성 완료되었습니다.');

    const selectedMembers = members.filter((m) => checkedMembers.includes(m.no));

    // 부모 컴포넌트로 새 방 정보 전달
    onComplete({ chatName, chatType, selectedMembers });
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
                <tr key={member.no} style={{ position: 'relative', height: '35px' }}>
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
                          right: '-17px', // 50%가 아니라 세로 구분선에 딱 맞게
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
                        checked={checkedMembers.includes(member.no)}
                        onChange={() => toggleCheck(member.no)}
                        style={{
                          marginRight: '10px',
                          marginLeft: '10px',
                          accentColor: '#4880FF',
                          cursor: 'pointer',
                        }}
                      />
                      {member.name} {member.position}
                    </div>
                    {/* 세로 구분선 */}
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
                    {/* 이름쪽 가로 구분선 시작 위치 조정 */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '17px', // 세로 구분선에 딱 맞게 조정
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

      {/* 확인 버튼 복구 */}
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
          //onClick={() => console.log('선택된 멤버:', checkedMembers)}
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SearchMember;
