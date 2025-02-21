import { useState } from "react";
import { Member } from "../../type/chatType";
import { departments, positions } from "../../type/chatType";

interface AddMemberModalProps {
  allMember: Member[];
  selectedMembers: string[];
  currentMembers: Member[];
  onClose: () => void;
  onConfirm: (newMembers: Member[]) => void;
}

const getDeptName = (deptNo: number) => {
  return departments.find((dept) => dept.deptNo === deptNo)?.deptName || "알 수 없음";
};

const getPositionName = (positionNo: number) => {
  return positions.find((pos) => pos.positionNo === positionNo)?.positionName || "알 수 없음";
};


const AddMemberModal = ({
  allMember,
  selectedMembers,
  onClose,
  onConfirm,
}: AddMemberModalProps) => {
  const [checkedMembers, setCheckedMembers] = useState<string[]>(selectedMembers);

  const handleToggle = (name: string) => {
    if (checkedMembers.includes(name)) {
      setCheckedMembers((prev) => prev.filter((m) => m !== name));
    } else {
      setCheckedMembers((prev) => [...prev, name]);
    }
  };

  const handleConfirm = () => {
    const selectedMembersObjects = allMember.filter((member) =>
      checkedMembers.includes(member.name)
    );
    onConfirm(selectedMembersObjects);
    onClose();
  };

  return (
    <div style={{ background: "white", padding: 16, borderRadius: 8 }}>
      <h3>대화상대 추가하기</h3>
      {allMember.map((Member) => (
      <div key={Member.name}>
        <input
          type="checkbox"
          checked={checkedMembers.includes(Member.name)}
          onChange={() => handleToggle(Member.name)}
          disabled={selectedMembers.includes(Member.name)} // 기존 멤버는 체크해제 불가
        />
        {getDeptName(Member.deptNo)} / {getPositionName(Member.positionNo)} - {Member.name}
      </div>
    ))}

      <button onClick={handleConfirm}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default AddMemberModal;
