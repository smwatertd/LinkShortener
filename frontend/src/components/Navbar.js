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
import { logOut } from "../http/UserApi";

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const profileButtonClicked = () => {
    navigate(PROFILE_ROUTE);
  };

  const logOutButtonClicked = () => {
    logOut();
    user.setIsAuth(false);
  };

  const logInButtonClicked = () => {
    navigate(LOGIN_ROUTE);
  };

  const registrationButtonClicked = () => {
    navigate(REGISTRATION_ROUTE);
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "right",
    }}>
      {
        user.isAuth
          ?
          <div>
            <Button
              variant="contained"
              onClick={profileButtonClicked}
            >
              Profile
            </Button>
            <Button
              variant="outlined"
              onClick={logOutButtonClicked}
            >
              LogOut
            </Button>
          </div>
          :
          <div>
            <Button
              variant="contained"
              onClick={logInButtonClicked}>
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={registrationButtonClicked}>
              Registration
            </Button>
          </div>
      }
    </Box>
  );
});

export { Navbar };
