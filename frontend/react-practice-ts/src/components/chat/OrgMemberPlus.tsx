import { useState } from 'react';
import SearchClick from './SearchClick';
import { departments, positions } from '../../type/chatType';

interface Member {
  userNo: number;
  name: string;
  positionNo: number;
  deptNo: number;
}

interface OrgMemberPlusProps {
  deptName: string; // ✅ 추가
  onComplete: (result: { deptName: string; selectedMembers: Member[] }) => void;
}

const getDeptName = (deptNo: number) => {
  return departments.find((dept) => dept.deptNo === deptNo)?.deptName || "알 수 없음";
};

const getPositionName = (positionNo: number) => {
  return positions.find((pos) => pos.positionNo === positionNo)?.positionName || "알 수 없음";
};


const OrgMemberPlus = ({ deptName, onComplete }: OrgMemberPlusProps) => {
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);

  const members: Member[] = [
    { userNo: 1, name: '박솜이', positionNo: 3, deptNo: 1 },
    { userNo: 2, name: '안관주', positionNo: 3, deptNo: 1 },
    { userNo: 3, name: '임사윤', positionNo: 4, deptNo: 1 },
    { userNo: 4, name: '김자수', positionNo: 7, deptNo: 1 },
    { userNo: 5, name: '김예삐', positionNo: 8, deptNo: 2 },
    { userNo: 6, name: '채소염', positionNo: 8, deptNo: 2 },
    { userNo: 7, name: '최웡카', positionNo: 4, deptNo: 2 },
    { userNo: 8, name: '김기밤', positionNo: 7, deptNo: 2 },
    { userNo: 9, name: '김젤리', positionNo: 9, deptNo: 2 },
    { userNo: 10, name: '이용휘', positionNo: 8, deptNo: 2 },
  ];
  

  const toggleCheck = (no: number) => {
    setCheckedMembers((prev) =>
      prev.includes(no) ? prev.filter((memberno) => memberno !== no) : [...prev, no]
    );
  };

  const handleConfirm = () => {
    if (checkedMembers.length === 0) {
      alert('부서원을 선택해주세요');
      return;
    }

    const selectedMembers = members.filter((m) => checkedMembers.includes(m.userNo));

    alert(`부서 생성 완료: ${deptName}`);
    onComplete({ deptName, selectedMembers }); // ✅ deptName 반영됨
  };

  const groupedMembers = members.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.deptNo]) {
      acc[member.deptNo] = [];
    }
    acc[member.deptNo].push(member);
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
        <span style={{ color: '#4880FF', fontWeight: '800', fontSize: '18px' }}>부서원 선택</span>
      </div>

      <div style={{ margin: '10px 45px' }}>
        <SearchClick />
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '500px', paddingLeft: '30px' }}>
        <table style={{ width: '90%', borderCollapse: 'collapse' }}>
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
          {Object.entries(groupedMembers).map(([dept, deptMembers]) =>
          deptMembers.map((member, index) => (
            <tr key={member.userNo} style={{ position: 'relative', height: '35px' }}>
              {index === 0 && (
                <td
                  rowSpan={deptMembers.length}
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    fontWeight: '600',
                    color: 'black',
                    position: 'relative',
                  }}
                >
                  {getDeptName(Number(dept))}
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
                    checked={checkedMembers.includes(member.userNo)}
                    onChange={() => toggleCheck(member.userNo)}
                    style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      accentColor: '#4880FF',
                      cursor: 'pointer',
                    }}
                  />
                  {member.name} ({getPositionName(member.positionNo)})
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

export default OrgMemberPlus;
