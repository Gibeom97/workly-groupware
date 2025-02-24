import SearchClick from './SearchClick';
import { useEffect, useState } from 'react';
import { RootState } from "../../store"; 
import { useSelector } from 'react-redux';
//import { filter } from 'lodash';
import axios from 'axios';


interface Member {
  userNo: number;     // 고유번호
    userName: string;       // 이름
    positionNo?: number; // 직급번호
    deptNo?: number;     // 부서번호
    status?:string;// 상태값
    deptName: string;
    positionName: string;
    email?: string;
    phone?: string;
    extension?: string;
};


const SearchMember = ({
  chatType,
  roomTitle,
  member,
  onComplete,
}: {
  chatType: string;
  roomTitle: string;
  member : Member;
  onComplete: (newChatRoom: {
    roomTitle: string;
    chatType: string;
    selectedMembers: Member[];
  }) => void;
}) => {
  const [checkedMembers, setCheckedMembers] = useState<number[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  // 🔹 현재 로그인한 사용자 정보 가져오기 (Redux에서 가져옴)
  const loggedInUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8003/workly/api/chat/members");
        const filteredMembers = response.data.filter(
          (m:Member) => m.userNo !== loggedInUser.userNo
        );
        setMembers(filteredMembers);
      }catch(error){
        console.error("멤버 목록 불러오기 실패:", error);
      }
    };

    fetchMembers();
  }, [loggedInUser.userNo]); // 로그인한 사용자가 변경될 때 다시 가져오기
 
  

  const toggleCheck = (no: number) => {
    if (chatType === '1:1') {
      setCheckedMembers((prev) => (prev.includes(no) ? [] : [no])); // ✅ 1:1 채팅 - 한 명만 선택
    } else {
      setCheckedMembers((prev) =>
        prev.includes(no) ? prev.filter((memberNo) => memberNo !== no) : [...prev, no] // ✅ 그룹 채팅 - 여러 명 선택 가능
      );
    }
  };


const handleConfirm = async () => {
  if (checkedMembers.length === 0) {
    alert("대화 상대를 선택해주세요");
    return;
  }

  const requestData = {
    roomTitle,
    chatType:chatType,
    participants: [loggedInUser.userNo, ...checkedMembers], // ✅ 로그인한 사용자 포함
  };

  console.log("📡 보내는 데이터:", JSON.stringify(requestData, null, 2)); // ✅ 디버깅 추가

  try {
    const response = await axios.post("http://localhost:8003/workly/api/chat/createChatRoom", requestData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("채팅방 생성 완료되었습니다.");
      const newChatRoomNo = response.data.chatRoomNo;
      console.log("새 채팅방 번호:", newChatRoomNo);
      onComplete({ roomTitle, chatType, selectedMembers: members.filter((m) => checkedMembers.includes(m.userNo)) });
    }
  } catch (error) {
    console.error("채팅방 생성 오류:", error);
    alert("채팅방 생성 중 오류가 발생했습니다.");
  }
};


  // const handleConfirm = async () => {
  //   if (checkedMembers.length === 0) {
  //     alert("대화 상대를 선택해주세요");
  //     return;
  //   }

  //   alert('채팅방 생성 완료되었습니다.');

  //   const selectedMembers = members.filter((m) => checkedMembers.includes(m.userNo));

  //   // 부모 컴포넌트로 새 방 정보 전달
  //   onComplete({ roomTitle, chatType, selectedMembers });
  // };

  const groupedMembers = members.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.deptName]) {
      acc[member.deptName] = [];
    }
    acc[member.deptName].push(member);
    return acc;
  }, {});

  // 검색창 열림
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true); // ✅ 검색창 열림/닫힘 관리 추가

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

      {/* 검색창 */}
      <div style={{ margin: '10px 45px' }}>
      <SearchClick 
      onProfileClick={(member) => { 
        toggleCheck(member.userNo);  
        setIsSearchOpen(false);      // ✅ 검색창 닫기
      }} 
      />
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
                      {dept}
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
                      checked={checkedMembers.includes(member.userNo)} // ✅ 선택된 멤버 유지
                      onChange={() => toggleCheck(member.userNo)} // ✅ 체크박스 클릭 시 toggleCheck 실행
                      style={{
                        marginRight: '10px',
                        marginLeft: '10px',
                        accentColor: '#4880FF',
                        cursor: 'pointer',
                      }}
                    />
                      {member.userName} ({member.positionName})
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
