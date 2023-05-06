import { Typography, TextField, Button, Box } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registration, logIn } from "../../http/UserApi";
import { Context } from "../../index";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/Consts";

const RegistrationForm = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [ username, setUsername ] = useState("admin");
  const [ password, setPassword ] = useState("599523956qQ");
  const [ email, setEmail] = useState("admin@gmail.com");

  const registrationButtonClicked = async () => {
    try {
      await registration({
        email,
        username,
        password,
      });

      await logIn({
        username,
        password,
      });

      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.log(error.message);
      return;
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
        placeholder="Email"
        onChange={event => setEmail(event.target.value)}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <TextField
        type="text"
        placeholder="Username"
        onChange={event => setUsername(event.target.value)}
        sx={{
          width: "100%",
        }}
      />
      <br/>
      <TextField
        type="password"
        placeholder="Password"
        onChange={event => setPassword(event.target.value)}
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
