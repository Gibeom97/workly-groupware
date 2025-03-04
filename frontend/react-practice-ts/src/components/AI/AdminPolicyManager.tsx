import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminPolicyManager: React.FC = () => {
  const companyId = useSelector((state: any) => state.user.companyId);
  const [category, setCategory] = useState<string>("HR");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [policies, setPolicies] = useState<{ question: string; answer: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // 수정 중인 항목 인덱스
  const [originalQuestion, setOriginalQuestion] = useState<string>(""); // 원래 질문 저장
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태 추가
  const [filteredPolicies, setFilteredPolicies] = useState<{ question: string; answer: string }[]>([]); // 검색 결과 저장
  const [originalAnswer, setOriginalAnswer] = useState<string>(""); // 원래 답변 저장

  // ✅ 기존 사내 규정 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8003/workly/api/policies/${companyId}`).then(response => {
      setPolicies(response.data);
      setFilteredPolicies(response.data); // 초기값 설정
    });
  }, [companyId]);

    // ✅ 검색 기능 추가
    useEffect(() => {
      if (searchTerm.trim() === "") {
        setFilteredPolicies(policies);
      } else {
        setFilteredPolicies(
          policies.filter(policy =>
            policy.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            policy.answer.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, [searchTerm, policies]);

  // ✅ 사내 규정 저장 또는 수정
  const handleSavePolicy = async () => {
    await axios.post("http://localhost:8003/workly/api/policies", { companyId, category, question, answer });

    // ✅ 기존 데이터 수정 시 목록 업데이트
    if (editingIndex !== null) {
      const updatedPolicies = [...policies];
      updatedPolicies[editingIndex] = { question, answer };
      setPolicies(updatedPolicies);
      setEditingIndex(null);
      setOriginalQuestion("");
      setOriginalAnswer("");
      setFilteredPolicies(updatedPolicies);
    } else {
      // ✅ 새로운 데이터 추가
      setPolicies([...policies, { question, answer }]);
    }

    alert("사내 규정이 저장되었습니다.");
    setQuestion("");
    setAnswer("");
  };

  // ✅ 기존 규정 클릭 시 수정 모드 활성화 / 비활성화
  const handleEditPolicy = (index: number) => {
    if (editingIndex === index) {
      // ❌ 이미 수정 중이면 취소 (원래 상태로 복구)
      setEditingIndex(null);
      setQuestion("");
      setAnswer("");
    } else {
      // ✅ 수정 모드 활성화
      setQuestion(policies[index].question);
      setAnswer(policies[index].answer);
      setOriginalQuestion(policies[index].question);
      setOriginalAnswer(policies[index].answer);
      setEditingIndex(index);
    }
  };

  // ✅ 삭제 기능 (DB에서도 삭제)
  const handleDeletePolicy = async (index: number, event: React.MouseEvent) => {
    event.stopPropagation();

    const policyToDelete = policies[index]; // 삭제할 항목 가져오기

    try {
      // 🔥 백엔드에 삭제 요청 보내기
      await axios.delete(`http://localhost:8003/workly/api/policies/delete/${companyId}`, {
        data: { question: policyToDelete.question } // ✅ 삭제할 데이터 전달 (질문 기준)
      });

      // ✅ UI에서도 삭제 반영
      const updatedPolicies = policies.filter((_, i) => i !== index);
      setPolicies(updatedPolicies);
      setFilteredPolicies(updatedPolicies);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제하는 동안 오류가 발생했습니다.");
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Q&A 등록</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>카테고리</label>
          <select style={styles.select} onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="HR">HR</option>
            <option value="업무 지침">업무 지침</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>질문</label>
          <input
            type="text"
            style={styles.input}
            placeholder="질문을 입력하세요"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={editingIndex !== null} // 기존 질문은 변경 불가
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>답변</label>
          <textarea
            style={styles.textarea}
            placeholder="답변을 입력하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={handleSavePolicy}>
          {editingIndex !== null ? "수정 완료" : "저장"}
        </button>
      </div>

      <div style={styles.listContainer}>
        <h3 style={styles.subtitle}>등록된 규정</h3>

         {/* ✅ 검색 기능 추가 */}
         <input
          type="text"
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul style={styles.list}>
          {filteredPolicies.map((policy, index) => (
            <li key={index} style={styles.listItem}>
              <div style={styles.textContainer} onClick={() => handleEditPolicy(index)}>
              {/* ✅ 삭제 버튼 추가 */}
              <button style={styles.deleteButton} onClick={(e) => handleDeletePolicy(index, e)}>x</button>
                <div style={styles.question}>{policy.question}</div>
                <div style={styles.answer}>{policy.answer}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ✅ 스타일 객체 (가로 배치 및 반응형 적용)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    display: "flex",
    flexDirection: "row", // ✅ 가로 배치
    gap: "20px",
    alignItems: "flex-start",
  },
  formContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    height: "600px"
  },
  listContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    height: "600px",  // ✅ 리스트 높이 고정
    overflowY: "auto"
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#2c3e50"
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#34495e"
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left"
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#7f8c8d"
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #bdc3c7",
    backgroundColor: "#ffffff"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #bdc3c7",
    backgroundColor: "#ffffff"
  },
  textarea: {
    width: "100%",
    height: "250px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #bdc3c7",
    backgroundColor: "#ffffff",
    resize: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4880ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px"
  },
  list: {
    listStyleType: "none",
    padding: 0
  },
  listItem: {
    position: "relative",  // 🔥 추가해야 함!
    backgroundColor: "#ffffff",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    cursor: "pointer",
  },
  question: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#2c3e50",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px"
  },
  answer: {
    fontSize: "14px",
    color: "#7f8c8d",
    paddingTop: "5px",
    lineHeight: "1.6"
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "12px",
    borderRadius: "8px",
    border: "1px solid #bdc3c7",
    marginBottom: "10px",
    marginTop: "10px",
  },

  deleteButton: { 
    position: "absolute", 
    right: "10px",
    top: "5px",
    fontSize: "15px", 
    color: "#0e0f0f", 
    border: "none", 
    background: "none", 
    cursor: "pointer", 
    fontWeight: "bold" 
  }

};

export default AdminPolicyManager;
