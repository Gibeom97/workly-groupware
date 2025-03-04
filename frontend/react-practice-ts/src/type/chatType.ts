export interface ChatDropdownProps {
    isOpen: boolean; // 드롭다운 열림 상태 추가
    toggleDropdown: () => void; // 드롭다운 토글 함수 추가
  }

  export interface Member {
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
    profileImg?:string;
  }

// ✅ 기본값을 가지는 빈 Member 객체를 생성
export const defaultMember: Member = {
  userNo: 0,
  userName: "알 수 없음",
  positionNo: 0,
  deptNo: 0,
  status: "비활성화",
  deptName: "미정",
  positionName: "미정",
  email: "",
  phone: "",
  extension: "",
};
  

export interface Department {
  deptName: string;
  members: Member[];
}

export const departments = [
  { deptNo: 1, deptName: '경영지원부' },
  { deptNo: 2, deptName: '인사부' },
  { deptNo: 3, deptName: '개발부' },
  { deptNo: 4, deptName: '영업부' },
  { deptNo: 5, deptName: '마케팅부' },
  { deptNo: 6, deptName: '고객지원부' },
];

export const positions = [
  { positionNo: 1, positionName: '사장' },
  { positionNo: 2, positionName: '부사장' },
  { positionNo: 3, positionName: '이사' },
  { positionNo: 4, positionName: '부장' },
  { positionNo: 5, positionName: '차장' },
  { positionNo: 6, positionName: '과장' },
  { positionNo: 7, positionName: '대리' },
  { positionNo: 8, positionName: '주임' },
  { positionNo: 9, positionName: '사원' },
];

export interface ChatMessage {
  chatNo: number;
  userNo: number;
  userName: string;
  chatRoomNo: number;
  message: string;
  receivedDate: string;
  isMine: boolean;
};


