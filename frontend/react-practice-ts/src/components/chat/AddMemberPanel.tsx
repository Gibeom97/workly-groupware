import { useEffect, useState } from 'react';
import SearchClick from './SearchClick';
import { useDispatch, useSelector } from "react-redux";
import { setMemberInvite } from "../../features/chatSlice";
import { RootState } from "../../store";
import axios from 'axios';
import { Member } from '../../type/chatType';

interface ChatRoomProps {
  chatRoomNo: number;  // 백엔드 API와 일치하는 필드명
}

interface AddMemberPanelProps {
  currentMembers: Member[];    // 이미 채팅방에 있는 멤버들
  room: ChatRoomProps;         // room.chatRoomNo로 접근
  onClose: () => void;
  onConfirm: (newMembers: Member[]) => void;
}

const AddMemberPanel = ({
  currentMembers,
  room,
  onClose,
  onConfirm,
}: AddMemberPanelProps) => {
  // 전체 사원 목록 상태
  const [allEmployees, setAllEmployees] = useState<Member[]>([]);
  const dispatch = useDispatch();
  const memberInvite = useSelector((state: RootState) => state.chat.memberInvite);

  // 백엔드에서 전체 사원 목록 불러오기
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8003/workly/api/chat/members");
        setAllEmployees(response.data);
      } catch (error) {
        console.error("사원 목록 불러오기 실패:", error);
      }
    };
    fetchEmployees();
  }, []);

  // 이미 채팅방에 있는 멤버의 userNo 배열
  const currentMemberUserNos = currentMembers.map(m => m.userNo);

  // 이미 들어온 멤버는 목록에서 제외
  const filteredEmployees = allEmployees.filter(
    (member) => !currentMemberUserNos.includes(member.userNo)
  );

  // 새로 선택한 멤버의 userNo 배열
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);

  // 만약 Redux의 memberInvite가 있다면, 그것도 체크 상태에 포함 (원하는 경우)
  // useEffect(() => {
  //   const invitedUserNos = filteredEmployees
  //     .filter(member => memberInvite.includes(member.userName))
  //     .map(member => member.userNo);
  //   setCheckedMembers(invitedUserNos);
  // }, [filteredEmployees, memberInvite]);

  // 체크박스 토글 함수
  const handleToggle = (userNo: number) => {
    setCheckedMembers(prev =>
      prev.includes(userNo)
        ? prev.filter((m) => m !== userNo)
        : [...prev, userNo]
    );
  };

  // 확인 버튼 클릭 시, 선택된 멤버 객체 추출 후 백엔드에 요청
  const handleConfirm = async () => {
    const selectedMembersObjects = filteredEmployees.filter((member) =>
      checkedMembers.includes(member.userNo)
    );

    if (selectedMembersObjects.length === 0) {
      alert("추가할 멤버를 선택해주세요.");
      return;
    }

    const newUserNos = selectedMembersObjects.map(member => member.userNo);

    try {
      await axios.post("http://localhost:8003/workly/api/chat/addMembers", {
        chatRoomNo: room.chatRoomNo,
        userNos: newUserNos,
      });
      console.log("✅ 멤버 추가 성공");
      dispatch(setMemberInvite(selectedMembersObjects.map(m => m.userName)));
      onConfirm(selectedMembersObjects);
      onClose();
    } catch (error) {
      console.error("❌ 멤버 추가 실패", error);
      alert("멤버 추가에 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        width: '388px',
        height: '590px',
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -45%)',
        borderRadius: '3px',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* 상단: 이미 채팅방에 있는 멤버 표시 */}
      <div
        // style={{
        //   backgroundColor: '#E9EBF1',
        //   padding: '10px',
        //   borderTopLeftRadius: '3px',
        //   borderTopRightRadius: '3px',
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   gap: '5px',
        //   position: 'relative',
        // }}
      >
        {currentMembers.map(member => (
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
        {/* <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          ✕
        </button> */}
      </div>

      {/* 검색 컴포넌트 (필요시) */}
      <div style={{ padding: '10px' }}>
        <SearchClick onProfileClick={() => console.log("프로필 클릭됨")} />
      </div>

      {/* 테이블: 필터된 사원 목록 */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '0 10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F7FA', borderBottom: '2px solid #4880FF' }}>
              <th style={{ width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }}>
                부서명
              </th>
              <th style={{ width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }}>
                성명
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(member => {
              const isSelected = checkedMembers.includes(member.userNo);
              return (
                <tr key={member.userNo} style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '8px', fontWeight: "bold" }}>
                    {member.deptName || "알 수 없음"}
                  </td>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(member.userNo)}
                      style={{ marginRight: '8px', accentColor: '#4880FF' }}
                    />
                    {member.userName} ({member.positionName})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 하단 확인 버튼 */}
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
