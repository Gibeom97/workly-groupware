import profileBig from "../../assets/Images/chat/profileBig.png";
import chatBig from "../../assets/Images/chat/chatBig.png";
import bell from "../../assets/Images/chat/bell.png";
import starBig from "../../assets/Images/chat/starBig.png";
import { defaultMember } from "../../type/chatType";



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
}

type MemberInfoProps = {
  member?: Member;
  onClose: () => void; // 닫기 버튼 이벤트 핸들러 추가
  chatType?: string;
};

const MemberInfo = ({ member= defaultMember, onClose }: MemberInfoProps) => {
  return (
    <div
      className="meminfo"
      style={{
        width: 300,
        height: 500,
        backgroundColor: "white",
        paddingBottom: 16,
        marginLeft: "-10px",
        position: "relative"
        
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: -45,
          right: 5,
          background: "transparent",
          border: "none",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <div
        className="meminfo-profile"
        style={{
          display: "flex",
          alignItems: "center", // 세로 중앙 정렬
          marginTop: 40,
          paddingLeft: 75, // 왼쪽 여백 추가해서 더 왼쪽으로 붙이기
        }}
      >
        <img
          style={{ width: 100, height: 100}}
          src={profileBig}
          alt="profile"
        />
      </div>

      <div style={{ marginTop: 35, paddingLeft: 0, paddingRight: 16}}>
        {[
          { label: "이름", value: member.userName },
          { label: "부서", value: member.deptName},
          { label: "직급", value: member.positionName },
          { label: "이메일", value: member.email },
          { label: "연락처", value: member.phone },
          { label: "내선번호", value: member.extension },
        ].map((item, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 15 }}>
            <div
              style={{
                width: 90,
                color: "#979797",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Inter",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                color: "#202224",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Inter",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        gap : "25px",
        paddingTop: "35px",
        marginLeft: "15px",
        position: "relative"
    }}>
        {/* 1:1 채팅 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img className="chatBig" style={{ width: 28, height: 28 }} src={chatBig} alt="chat icon" />
        <span style={{
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: '600',
            marginTop: '4px'
        }}
        //onClick={} // 여기 수정하기()
        >1:1 채팅</span>
        </div>

        {/* 알림 설정 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img className="bellBig" style={{ width: 28, height: 28 }} src={bell} alt="alarm icon" />
        <span style={{
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: '600',
            marginTop: '4px'
        }}
        
        >알림 설정</span>
        </div>

        {/* 즐겨찾기 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img className="starBig" style={{ width: 28, height: 28 }} src={starBig} alt="favorite icon" />
        <span style={{
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: '600',
            marginTop: '4px'
        }}>즐겨찾기</span>
        </div>
    </div>

    </div>
  );
};

export default MemberInfo;
