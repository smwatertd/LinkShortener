import { Typography, TextField, Button, Box } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../index";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/Consts";
import { logIn } from "../../http/UserApi";

const LogInForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [ logInForm, setLogInForm ] = useState({
    username: "",
    password: "",
  });

  const loginButtonClicked = async () => {
    try {
      await logIn(logInForm);
    } catch (error) {
      console.error(error);
      return;
    }
    user.setIsAuth(true);
    navigate(MAIN_ROUTE);
  };

  const registrationButtonClicked = () => {
    navigate(REGISTRATION_ROUTE);
  };

  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: 1,
        }}
      >
        Войти в систему
      </Typography>
      <TextField
        type="text"
        placeholder="Имя пользователя"
        onChange={event => setLogInForm({...logInForm, username: event.target.value})}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <TextField
        type="password"
        placeholder="Пароль"
        onChange={event => setLogInForm({...logInForm, password: event.target.value})}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={loginButtonClicked}
          sx={{
            marginRight: 1,
          }}
        >
          Войти
        </Button>
        <Button
          variant="outlined"
          onClick={registrationButtonClicked}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </div>
  );
};

export { LogInForm };
