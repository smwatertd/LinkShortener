import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Button } from "@mui/material";

import { Context } from "../index";
import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/Consts";

import { LogOutButton } from "./ui/LogOutButton";

const Navbar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const profileButtonClicked = () => {
    navigate(PROFILE_ROUTE);
  };

  const logInButtonClicked = () => {
    navigate(LOGIN_ROUTE);
  };

  const registrationButtonClicked = () => {
    navigate(REGISTRATION_ROUTE);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        paddingTop: 1,
        paddingRight: 1,
      }}
    >
      {
        user.isAuth
          ?
          <div>
            <Button
              variant="contained"
              onClick={profileButtonClicked}
              sx={{
                marginRight: 1,
              }}
            >
              Профиль
            </Button>
            <LogOutButton />
          </div>
          :
          <div>
            <Button
              variant="contained"
              onClick={logInButtonClicked}
              sx={{
                marginRight: 1,
              }}
            >
              Войти
            </Button>
            <Button
              variant="outlined"
              onClick={registrationButtonClicked}>
              Зарегистрироваться
            </Button>
          </div>
      }
    </Box>
  );
});

export { Navbar };
