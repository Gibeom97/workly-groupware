export interface ChatDropdownProps {
    isOpen: boolean; // 드롭다운 열림 상태 추가
    toggleDropdown: () => void; // 드롭다운 토글 함수 추가
  }

export interface Member {
  no: number;
  name: string;
  position: string;
  team: string;
}

export interface Department {
  deptName: string;
  members: Member[];
}
