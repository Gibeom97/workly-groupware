// axios전송시 항상 header에 jwt토큰정보를 추가
import axios, { AxiosError } from "axios";
import { getCookie } from "./Cookie";

const CustomAxios = axios.create();

CustomAxios.interceptors.request.use((req) => {
    req.headers.Authorization = `${getCookie('accessToken')}`;
    return req;
})

CustomAxios.interceptors.response.use(
    (res) => res , // 토큰에 문제가 없는 경우 정상반환
    (error:AxiosError) => { // 에러발생시 실행할 콜백함수

        // 403 -- Forbidden 권함없음에러.        
        if(error.status === 403){
            // 토큰이 만료된 경우 로그인 페이지로 이동
            alert("접근 권한이 없습니다.")
            // window.location.assign("/");
        }
        return Promise.reject(error);
    }
)

export default CustomAxios;

