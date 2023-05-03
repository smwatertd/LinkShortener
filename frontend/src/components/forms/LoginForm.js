import { Typography, TextField, Button } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../index";
import { MAIN_ROUTE } from "../../utils/Consts";
import { logIn } from "../../http/UserApi";

const LogInForm = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [ username, setUsername ] = useState("admin");
  const [ password, setPassword ] = useState("599523956qQ");

  const buttonClicked = async () => {
    await logIn({
      username,
      password,
    })
      .then(response => {
        user.setIsAuth(true);
      })
      .finally(() => {
        navigate(MAIN_ROUTE);
      });
  };

  return (
    <div>
      <Typography>
        Войти в систему
      </Typography>
      <TextField type="text" placeholder="Username" onChange={
        e => setUsername(e.target.value)}></TextField><br/>
      <TextField type="password" placeholder="Password" onChange={
        e => setPassword(e.target.value)}></TextField><br/>
      <Button
        variant="contained"
        onClick={buttonClicked}
      >
        Войти
      </Button>
    </div>
  );
};

export { LogInForm };
