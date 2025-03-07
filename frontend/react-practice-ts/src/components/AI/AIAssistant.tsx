import React, { useState } from "react";
import axios from "axios";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { useSelector } from "react-redux";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const AIAssistant: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [cache, setCache] = useState<{ [key: string]: string }>({}); 
  const companyId = useSelector((state: any) => state.user.companyId);
  const [isRecording, setIsRecording] = useState<boolean>(false);

    // 음성 인식 API 설정
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;
  // 음성 입력 기능
  const handleVoiceInput = () => {
    setIsRecording(true);
    recognition.start();

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const handleSendMessage = async () => {
    console.log("현재 inputText 값:", inputText);
    console.log("inputText 타입:", typeof inputText);

    if (typeof inputText !== "string") {
      console.error("오류: inputText가 문자열이 아닙니다.", inputText);
      alert("입력값이 올바르지 않습니다. 다시 시도하세요.");
      return;
    }

    const cleanedInputText = String(inputText).replace(/\s+/g, " ").trim();

    if (!cleanedInputText) {
      console.error("오류: inputText가 비어 있습니다.");
      return;
    }

    const userMessage = { role: "user", content: cleanedInputText };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // 캐시에 동일한 질문이 있는지 확인
    if (cache[cleanedInputText]) {
      console.log("캐시에서 즉시 응답:", cache[cleanedInputText]);
      const aiMessage = { role: "assistant", content: cache[cleanedInputText] };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      return;
    }

    try {
      // 사내 규정 가져오기
      const policyResponse = await axios.get(`http://localhost:8003/workly/api/policies/${companyId}`);
      const policies = policyResponse.data;

      if (!Array.isArray(policies)) {
        console.error("API 응답 데이터가 배열이 아닙니다:", policies);
        throw new Error("API 응답 데이터가 잘못되었습니다.");
      }

      if (policies.length === 0) {
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: "현재 사내 규정 데이터가 없습니다." }]);
        return;
      }

      // LangChain 벡터 데이터 변환
      const embeddings = new OpenAIEmbeddings({ openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY });
      const vectorStore = await MemoryVectorStore.fromTexts(
        policies.map((p: any) => `${p.question} ${p.answer}`),  // 백틱(`) 추가하여 템플릿 문자열 수정
        policies.map((p: any) => ({ id: p.id })),
        embeddings
      );

      const retriever = vectorStore.asRetriever();

      // Streaming AI 모델 생성
      const model = new ChatOpenAI({ 
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
        streaming: true,  // Streaming 활성화
      });

      // ConversationalRetrievalQAChain 생성
      const chain = ConversationalRetrievalQAChain.fromLLM(model, retriever, {
        returnSourceDocuments: true
      });

      console.log("chain 객체:", chain);
      console.log("chain 타입:", typeof chain);

      if (!chain || typeof chain.call !== "function") {
        console.error("AI Chain 생성 실패:", chain);
        return;
      }

      // AI 응답을 실시간으로 받기 위해 초기 메시지를 설정
      const aiMessage = { role: "assistant", content: "" };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      // `call()` 실행하여 AI 응답 받기
      const response = await chain.call({
        question: cleanedInputText,
        chat_history: [] // 초기에는 빈 배열로 전달
      });

      console.log("AI 응답 데이터:", response);

      if (!response || !response.text) {
        console.error("AI 응답이 없습니다.");
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: "AI 응답을 받을 수 없습니다." }]);
        return;
      }

      // 응답을 문자열로 변환하여 처리
      const responseText = typeof response.text === "string" ? response.text : JSON.stringify(response.text, null, 2);
      const cleanedResponse = responseText.replace(/\s+/g, " ").trim();

      // 캐시에 저장하여 동일한 질문이 오면 빠르게 응답
      setCache(prevCache => ({
        ...prevCache,
        [cleanedInputText]: cleanedResponse
      }));

      setMessages(prevMessages => [...prevMessages.slice(0, -1), { role: "assistant", content: cleanedResponse }]);

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
            {msg.content}
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
        </button>
        <button style={styles.button} onClick={handleSendMessage}>질문하기</button>
      </div>
    </div>
  );
};


// CSS 스타일 객체 (기존 코드 유지)
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
    overflowY: "auto",  // 스크롤 필요 시에만 표시
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
  voiceButton: {
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
