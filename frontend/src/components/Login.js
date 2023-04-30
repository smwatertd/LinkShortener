import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../http/UserApi";
import { Context } from "..";
import { MAIN_ROUTE } from "../utils/Consts";

const Login = ({props}) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const buttonClicked = async () => {
    await login(props)
      .then(response => {
        user.setIsAuth(true);
        navigate(MAIN_ROUTE);
      });
  };

  return (
    <button onClick={buttonClicked}>
      Login
    </button>
  );
};

export { Login };
