import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { registration, login } from "../http/UserApi";
import { Context } from "../index";
import { MAIN_ROUTE } from "../utils/Consts";

const Registration = ({props}) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const buttonClicked = async () => {
    await registration(props)
      .catch(e => {
        return;
      });
    await login(props)
      .then(response => {
        user.setIsAuth(true);
        navigate(MAIN_ROUTE);
      });
  };

  return (
    <button onClick={buttonClicked}>
      Register
    </button>
  );
};

export { Registration };
