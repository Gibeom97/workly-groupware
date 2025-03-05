import React, { useState } from "react";
import axios from "axios";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { useSelector } from "react-redux";

const AIAssistant: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const companyId = useSelector((state: any) => state.user.companyId);
  const [isRecording, setIsRecording] = useState<boolean>(false); // 음성 녹음 상태 추가

    // 음성 인식 API 설정
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;
  
  // 음성 입력 기능
  const handleVoiceInput = () => {
    setIsRecording(true); // 녹음 시작 시 배경색 빨간색으로 변경
    recognition.start();

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false); // 녹음 종료 후 배경색 파란색으로 변경
    };

    recognition.onend = () => {
      setIsRecording(false); // 녹음 종료 후 배경색 파란색으로 변경
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: "user", content: inputText };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // ✅ 1. 사내 규정 가져오기
      const policyResponse = await axios.get(`http://localhost:8003/workly/api/policies/${companyId}`);
      const policies = policyResponse.data;

      if (policies.length === 0) {
        setMessages([...messages, { role: "assistant", content: "현재 사내 규정 데이터가 없습니다." }]);
        return;
      }

      // ✅ 2. OpenAI에게 가장 유사한 질문을 찾도록 요청
      const gptResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "너는 회사의 사내 규정 목록을 기반으로 사용자의 질문과 가장 유사한 질문을 찾아야 해." },
            { role: "system", content: `사내 규정 목록:\n\n${policies.map((p: any) => `질문: ${p.question}\n답변: ${p.answer}`).join("\n\n")}` },
            { role: "user", content: `사용자의 질문: "${inputText}"\n위의 사내 규정 중에서 가장 유사한 질문을 찾아서 제공해줘. 하지만 답변을 '답변:' 이라는 단어 없이 자연스럽게 문장만 출력해줘. "답변:", "답변 -" 등과 같은 형식을 사용하지 말고, 답변 내용만 반환해줘.` }
          ],
          max_tokens: 300,
        },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` },
        }
      );

      const aiMessage = { role: "assistant", content: gptResponse.data.choices[0].message.content };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }

    setInputText("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>업무지원 Q&A</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === "user" ? styles.userMessage : styles.aiMessage}>
            {/* <strong>{msg.role === "user" ? "나" : "AI"}:</strong>*/} {msg.content} 
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="회사 관련 궁금한 질문을 입력하세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
         <button 
          style={{ ...styles.voiceButton, backgroundColor: isRecording ? "#ff4c4c" : "#4880ff" }} 
          onClick={handleVoiceInput}
        >
          <GraphicEqIcon />
        </button> {/* 음성 입력 버튼 추가 */}
        <button style={styles.button} onClick={handleSendMessage}>질문하기</button>
      </div>
    </div>
  );
};

// ✅ CSS 스타일 객체 (기존 코드 유지)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  title: {
    fontSize: "21px",
    marginBottom: "10px",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  chatBox: {
    border: "1px solid #ddd",
    padding: "10px",
    height: "650px",
    overflowY: "auto",  // ✅ 스크롤 필요 시에만 표시
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    boxShadow: "0px 4px 6px hsla(0, 0.00%, 0.00%, 0.10)",
    marginTop: "20px",
    marginBottom: "20px"
  },
  userMessage: {
    alignSelf: "flex-end",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    margin: "7px",
    borderRadius: "10px",
    maxWidth: "80%",
    textAlign: "left"
  },
  aiMessage: {
    alignSelf: "flex-start",
    fontSize: "14px",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    margin: "7px",
    borderRadius: "10px",
    maxWidth: "80%",
    textAlign: "left"
  },
  inputContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    height: "40px",
    padding: "20px",
    fontSize: "13px",
    borderRadius: "15px",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  },
  button: {
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#4880ff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "15px",
    transition: "0.3s"
  },
  voiceButton: { // 🎤 음성 버튼 스타일 추가
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#4880ff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "15px",
  },
};

export default AIAssistant;
