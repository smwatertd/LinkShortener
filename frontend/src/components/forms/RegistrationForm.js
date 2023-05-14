import { Typography, TextField, Button, Box } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registration, logIn } from "../../http/UserApi";
import { Context } from "../../index";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/Consts";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [ registrationForm, setRegistrationForm ] = useState({
    email: "",
    username: "",
    password: "",
  });

  const registrationButtonClicked = async () => {
    const logInForm = {...registrationForm};
    delete logInForm["email"];

    try {
      await registration(registrationForm);
      await logIn(logInForm);
    } catch (error) {
      console.error(error);
      return;
    }
    user.setIsAuth(true);
    navigate(MAIN_ROUTE);
  };

  const loginButtonClicked = () => {
    navigate(LOGIN_ROUTE);
  };

  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: 1,
        }}
      >
        Регистрация
      </Typography>
      <TextField
        type="text"
        placeholder="Адрес эл.почты"
        onChange={event => setRegistrationForm({...registrationForm, email: event.target.value})}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <TextField
        type="text"
        placeholder="Имя пользователя"
        onChange={event => setRegistrationForm({...registrationForm, username: event.target.value})}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <TextField
        type="password"
        placeholder="Пароль"
        onChange={event => setRegistrationForm({...registrationForm, password: event.target.value})}
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
          onClick={registrationButtonClicked}
          sx={{
            marginRight: 1,
          }}
        >
          Зарегистрироваться
        </Button>
        <Button
          variant="outlined"
          onClick={loginButtonClicked}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};

export { RegistrationForm };
