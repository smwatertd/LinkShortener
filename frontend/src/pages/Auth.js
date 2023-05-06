import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { LOGIN_ROUTE } from "../utils/Consts";
import { LogInForm } from "../components/forms/LoginForm";
import { RegistrationForm } from "../components/forms/RegistrationForm";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {
        isLogin
          ?
          <LogInForm />
          :
          <RegistrationForm />
      }
    </Box>
  );
};

export { Auth };
