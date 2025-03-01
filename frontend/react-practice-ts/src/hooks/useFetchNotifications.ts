import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "../features/approvalNotificationsSlice";

const useFetchNotifications = (userNo: number | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("✅ useEffect 실행됨"); // ✅ useEffect 실행 확인

    if (!userNo || typeof userNo !== "number") {
      console.warn("❌ userNo 값이 없음. API 요청 중단됨.", userNo);
      return;
    }

    const fetchUserNotifications = async () => {
      try {
        //console.log(`📢 API 요청 시작: http://localhost:8003/notifications/${userNo}`);
        const response = await fetch(`http://localhost:8003/workly/notifications/${userNo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
          throw new Error(`❌ API 오류: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        //console.log("📢 API 응답 데이터:", data); // ✅ API 응답 확인

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("❌ API 응답이 비어 있거나 배열이 아님");
          return;
        }

        // ✅ Redux 상태 업데이트 (비동기 Thunk 호출)
        dispatch(fetchNotifications(userNo) as any);
      } catch (error) {
        console.error("❌ API 호출 중 오류 발생:", error);
      }
    };

    fetchUserNotifications();
    const interval = setInterval(fetchUserNotifications, 30000); // 30초마다 새로고침

    return () => clearInterval(interval);
  }, [userNo, dispatch]);

  return null;
};

export default useFetchNotifications;
