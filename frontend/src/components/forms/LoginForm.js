import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Typography, TextField, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Context } from "../../index";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/Consts";
import { logIn } from "../../http/UserApi";

const LogInForm = observer(() => {
  // Форма авторизации пользователя
  const navigate = useNavigate();
  const { user, loading } = useContext(Context);
  const [ logInForm, setLogInForm ] = useState({
    username: "",
    password: "",
  });

  const loginButtonClicked = async () => {
    // Обработчик нажатия кнопки авторизации
    loading.setIsButtonLoading(true);

    try {
      await logIn(logInForm);
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.error(error);
    } finally {
      loading.setIsButtonLoading(false);
    }
  };

  const registrationButtonClicked = () => {
    // Обработчик нажатия кнопки регистрации
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
        <LoadingButton
          variant="contained"
          onClick={loginButtonClicked}
          loading={loading.isButtonLoading}
          sx={{
            marginRight: 1,
          }}
        >
          Войти
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={registrationButtonClicked}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </div>
  );
});

export { LogInForm };
