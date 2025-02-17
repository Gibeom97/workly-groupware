import { useState } from 'react';
import searchIcon from "../../assets/Images/chat/search.png"; 

const CreateOrg = ({
  onClose,
  invitePeople
}: {
  invitePeople: (deptName: string) => void;
  onClose: () => void;
}) => {
  const [deptName, setDeptName] = useState('');
  
  const handleInviteClick = () => {
    console.log("부서 생성 단계 진입");
    invitePeople(deptName); // SearchMember 단계로 넘기기
  };  

  return (
    <div
      className="DeptCreate"
      style={{
        width: 390,
        height: 600,
        position: "relative",
      }}
    >
      {/* 배경 */}
      <div
        className="DeptCreate-Background"
        style={{
          width: 390,
          height: 600,
          left: 0,
          top: 0,
          position: "absolute",
          background: "white",
          borderRadius: 5,
        }}
      />
      {/* 헤더 배경 */}
      <div
        className="DeptCreate-HeaderBackground"
        style={{
          width: 390,
          height: 170.18,
          left: 0,
          top: 0,
          position: "absolute",
          background: "#E9EBF1",
          borderRadius: 5,
        }}
      />
      <div
        className="DeptCreate-TitleWrapper"
        style={{
          width: 95,
          height: 19.64,
          paddingBottom: 1.64,
          paddingRight: 6.16,
          left: 23,
          top: 19.64,
          position: "absolute",
          borderRadius: 5,
          justifyContent: "flex-start",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div
          className="DeptCreate-TitleText"
          style={{
            width: 88.84,
            color: "#4880FF",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "800",
            wordWrap: "break-word",
          }}
        >
          New Dept
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            left: 325,
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      

      {/* 부서 정보 설정 카드 */}
      <div
        className="DeptCreate-InfoCard"
        style={{
          width: 300,
          height: 190,
          left: 50,
          top: 192,
          position: "absolute",
          background: "white",
          borderRadius: 5,
          border: "0.50px #979797 solid",
        }}
      />

      {/* 카드 헤더 (파란색) */}
      <div
        className="DeptCreate-InfoHeader"
        style={{
          width: 300,
          height: 29.45,
          left: 50,
          top: 192,
          position: "absolute",
          background: "#4880FF",
          borderRadius: "5px 5px 0 0",
          border: "0.50px #979797 solid",
        }}
      />
      <div
        className="DeptCreate-InfoHeaderText"
        style={{
          position: "absolute",
          left: 68,
          top: 195.8,
          color: "white",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
        }}
      >
        부서 정보설정
      </div>

      {/* 부서 이름 레이블 */}
      <div
        style={{
          position: "absolute",
          left: 73,
          top: 243,
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#979797",
        }}
      >
        부서 이름
      </div>

      {/* 부서 이름 입력란 */}
      <input
        type="text"
        placeholder="부서 이름을 입력하세요"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
        style={{
          position: "absolute",
          left: 73,
          top: 265,
          width: "240px",
          height: "25px",
          paddingLeft: "10px",
          border: "1px solid #B3B3B3",
          borderRadius: "3px",
        }}
      />

      {/* 사원 추가 레이블 */}
      <div
        onClick={handleInviteClick}
        style={{
          position: "absolute",
          left: 73,
          top: 298,
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#979797",
          cursor: "pointer",
        }}
      >
        사원 이름을 입력하세요
      </div>

      {/* 사원 추가 클릭 영역 */}
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          left: 73,
          top: 320,
          width: "254px",
          height: "25px",
          backgroundColor: "#E9EBF1",
          display: "flex",
          alignItems: "center",
          paddingLeft: "8px",
          borderRadius: "3px",
          color: "#B3B3B3",
          fontSize: "11px",
          fontFamily: "Roboto",
        }}
        onClick={handleInviteClick}
      >
        이름을 입력하세요
        <img
          src={searchIcon}
          alt="검색"
          style={{ width: "18px", height: "18px", marginLeft: "auto", marginRight: "8px" }}
        />
      </div>
    </div>
  );
};

export default CreateOrg;
