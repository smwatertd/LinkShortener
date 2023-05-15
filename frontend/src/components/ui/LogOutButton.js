import { useContext } from "react";
import { Button } from "@mui/material";

import { logOut } from "../../http/UserApi";
import { Context } from "../../index";

const LogOutButton = () => {
  // Кнопка деавторизации пользователя
  const { user } = useContext(Context);

  const buttonClicked = () => {
    // Обработчик нажатия кнопки деавторизации
    logOut();
    user.setIsAuth(false);
  };

  return (
    <Button
      variant="outlined"
      onClick={buttonClicked}
    >
      Выйти
    </Button>
  );
};

export { LogOutButton };
