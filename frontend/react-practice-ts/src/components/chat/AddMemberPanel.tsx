import { useEffect, useState } from 'react';
import { Member } from '../../type/chatType';
import SearchClick from './SearchClick';

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
  const currentMemberNos = currentMembers.map((m) => m.no);

  const [checkedMembers, setCheckedMembers] = useState<number[]>(currentMemberNos);

  // ✅ currentMembers가 바뀔 때마다 checkedMembers 초기화
  useEffect(() => {
    setCheckedMembers(currentMembers.map((m) => m.no));
  }, [currentMembers]);

  const handleToggle = (no: number) => {
    if (currentMemberNos.includes(no)) return;
    setCheckedMembers((prev) =>
      prev.includes(no) ? prev.filter((m) => m !== no) : [...prev, no]
    );
  };

  const handleConfirm = () => {
    const selectedMembersObjects = allEmployees.filter((member) =>
      checkedMembers.includes(member.no)
    );
    onConfirm(selectedMembersObjects);
    onClose();
  };

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
            key={member.no}
            style={{
              backgroundColor: '#E9F3FF',
              color: '#4880FF',
              padding: '5px 10px',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          >
            {member.name}
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
        <SearchClick />
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
              const isAlreadyAdded = currentMemberNos.includes(member.no);
              const isSelected = checkedMembers.includes(member.no);

              return (
                <tr key={member.no} style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '8px' }}>{member.team}</td>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected || isAlreadyAdded}
                      onChange={() => handleToggle(member.no)}
                      disabled={isAlreadyAdded}
                      style={{ marginRight: '8px', accentColor: '#4880FF' }}
                    />
                    {member.name} ({member.position})
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
