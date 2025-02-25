import { useEffect, useState } from 'react';
import { Member } from '../../type/chatType';
//import { departments, Member, positions } from '../../type/chatType';
import SearchClick from './SearchClick';
import { useDispatch } from "react-redux";
import { setMemberInvite } from "../../features/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // RootState 임포트 필요


interface AddMemberPanelProps {
  allEmployees: Member[];
  currentMembers: Member[];
  onClose: () => void;
  onConfirm: (newMembers: Member[]) => void;
}



const AddMemberPanel = ({
  allEmployees,
  currentMembers,
  onClose,
  onConfirm,
}: AddMemberPanelProps) => {
  const currentMemberuserNos = currentMembers.map((m) => m.userNo);

  const [checkedMembers, setCheckedMembers] = useState<number[]>(currentMemberuserNos);

  const memberInvite = useSelector((state: RootState) => state.chat.memberInvite);
  // 나중에 없애기
  useEffect(() => {
    console.log("백엔드에서 받은 사원 목록:", allEmployees);
  }, [allEmployees]);
  

  // ✅ currentMembers가 바뀔 때마다 checkedMembers 초기화
  useEffect(() => {
    // ✅ 현재 멤버와 Redux에서 가져온 초대 멤버 합치기 (중복 제거)
    const invitedUserNos = allEmployees
      .filter(member => memberInvite.includes(member.userName))
      .map(member => member.userNo);
  
    setCheckedMembers([...new Set([...currentMemberuserNos, ...invitedUserNos])]);
  }, [allEmployees, memberInvite, currentMembers]);


  const handleToggle = (userNo: number) => {
    if (currentMemberuserNos.includes(userNo)) return;
    setCheckedMembers((prev) =>
      prev.includes(userNo) ? prev.filter((m) => m !== userNo) : [...prev, userNo]
    );
  };


const dispatch = useDispatch(); // Redux Dispatch 추가

const handleConfirm = () => {
  const selectedMembersObjects = allEmployees.filter((member) =>
    checkedMembers.includes(member.userNo)
  );

  // ✅ 기존 멤버 제외하고 새로 초대된 멤버만 Redux에 저장
  const newInvitedMembers = selectedMembersObjects
    .map(member => member.userName)
    .filter(name => !currentMembers.some(m => m.userName === name));

  dispatch(setMemberInvite(newInvitedMembers));

  onConfirm(selectedMembersObjects);
  onClose();
}


  return (
    <div
      style={{
        width: '390px',
        height: '600px',
        backgroundColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '3px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: '#F5F7FA',
          padding: '10px',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
        }}
      >
        {currentMembers.map((member) => (
          <span
            key={member.userNo}
            style={{
              backgroundColor: '#E9F3FF',
              color: '#4880FF',
              padding: '5px 10px',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          >
            {member.userName}
          </span>
        ))}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            left: 360,
            background: 'transparent',
            border: 'none',
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: '10px' }}>
        <SearchClick onProfileClick={() => console.log("프로필 클릭됨")}/>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '0 10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F7FA', borderBottom: '2px solid #4880FF' }}>
              <th style={{ width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }}>부서명</th>
              <th style={{ width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }}>성명</th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.map((member) => {
              const isAlreadyAdded = currentMemberuserNos.includes(member.userNo);
              const isSelected = checkedMembers.includes(member.userNo);

              return (
                <tr key={member.userNo} style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '8px', textDecoration:"bold" }}>
                    {member.deptName || "알 수 없음"}
                    </td>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected || isAlreadyAdded}
                      onChange={() => handleToggle(member.userNo)}
                      disabled={isAlreadyAdded}
                      style={{ marginRight: '8px', accentColor: '#4880FF' }}
                    />
                    {member.userName} 
                    ({member.positionName})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: '10px',
          borderTop: '1px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          style={{
            backgroundColor: '#4880FF',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '5px',
            border: 'none',
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

export default AddMemberPanel;