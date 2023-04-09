import { useNavigate } from "react-router-dom";
import { logOut } from "../http/UserApi"

const LogOut = () => {
    const navigate = useNavigate();
    logOut();
    navigate("/");
}

export { LogOut };
