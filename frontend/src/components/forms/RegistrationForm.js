import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { observer } from "mobx-react-lite";

import { Context } from "../../index";
import { registration, logIn } from "../../http/UserApi";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/Consts";

const RegistrationForm = observer(() => {
  const navigate = useNavigate();
  const { user, loading } = useContext(Context);
  const [ registrationForm, setRegistrationForm ] = useState({
    email: "",
    username: "",
    password: "",
  });

  const registrationButtonClicked = async () => {
    loading.setIsButtonLoading(true);
    const logInForm = {...registrationForm};
    delete logInForm["email"];

    try {
      await registration(registrationForm);
      await logIn(logInForm);
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.error(error);
    } finally {
      loading.setIsButtonLoading(false);
    }
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
        <LoadingButton
          variant="contained"
          onClick={registrationButtonClicked}
          loading={loading.isButtonLoading}
          sx={{
            marginRight: 1,
          }}
        >
          Зарегистрироваться
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={loginButtonClicked}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
});

export { RegistrationForm };
