import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";


const RoleRoute= ({roles}) => {
    const navigate = useNavigate();
    const role = useSelector((state: any) => state.user.role);

    useEffect(() => {
        if(!roles.includes(role)) {
            alert("접근 권한이 없습니다.");
            navigate("/");
            return;
        }
    }, [])

    return <Outlet/>
}

export default RoleRoute;