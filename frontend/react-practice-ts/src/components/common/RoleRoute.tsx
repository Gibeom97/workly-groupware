import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";

const RoleRoute= ({roles}) => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        console.log(user);
        if(user.userNo === 0) {
            alert("로그인 후 이용해주세요.");
            navigate("/");
            return;
        }

        if(!roles.includes(user.role)) {
            alert("접근 권한이 없습니다.");
            navigate("/main ");
            return;
        }
    }, [])

    return <Outlet/>
}

export default RoleRoute;