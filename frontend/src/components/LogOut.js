import { useContext } from "react";

import { logout } from "../http/UserApi";
import { Context } from "../index";

const LogOut = () => {
  const { user } = useContext(Context);

  const buttonClicked = () => {
    logout();
    user.setIsAuth(false);
  };

  return (
    <button onClick={buttonClicked}>
      LogOut
    </button>
  );
};

export { LogOut };
