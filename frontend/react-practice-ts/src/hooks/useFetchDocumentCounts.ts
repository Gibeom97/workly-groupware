import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCounts, showNotification } from "../features/approvalNotificationsSlice";

const useFetchDocumentCounts = () => {
  const dispatch = useDispatch();

  // ✅ Redux에서 현재 로그인한 사용자의 userNo 가져오기
  const userNo = useSelector((state: any) => state.user.userNo);
  const prevCounts = useSelector((state: any) => state.notifications);

  useEffect(() => {
    if (!userNo) return; // ✅ userNo가 없으면 실행하지 않음

    const fetchCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approval/counts?userNo=${userNo}`);
        dispatch(setCounts(response.data));

        // 새로운 문서가 추가되었을 경우 알림 표시
        Object.keys(response.data).forEach((key) => {
          if (response.data[key] > (prevCounts[key] || 0)) {
            dispatch(showNotification(`새로운 ${key} 문서가 도착했습니다!`));
          }
        });
      } catch (error) {
        console.error("문서 개수 가져오기 실패:", error);
      }
    };

    // 주기적으로 데이터 가져오기 (10초마다)
    const interval = setInterval(fetchCounts, 10000);
    fetchCounts(); // 초기 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [dispatch, userNo, prevCounts]);

};

export default useFetchDocumentCounts;
