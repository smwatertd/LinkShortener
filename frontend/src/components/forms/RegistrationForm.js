import { Typography, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { registration, logIn } from "../../http/UserApi";
import { Context } from "../../index";
import { MAIN_ROUTE } from "../../utils/Consts";

const RegistrationForm = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [ username, setUsername ] = useState("admin");
  const [ password, setPassword ] = useState("599523956qQ");
  const [ email, setEmail] = useState("admin@gmail.com");

  const buttonClicked = async () => {
    await registration({
      email,
      username,
      password,
    })
      .catch(e => {
        return;
      });
    
    await logIn({
      username,
      password,
    })
      .then(response => {
        user.setIsAuth(true);
      })
      .catch(e => {
        return;
      })
      .finally(() => {
        navigate(MAIN_ROUTE);
      });
  };

  return (
    <div>
      <Typography>
        Регистрация
      </Typography>
      <TextField type="text" placeholder="Email" onChange={
        event => setEmail(event.target.value)}></TextField><br/>
      <TextField type="text" placeholder="Username" onChange={
        event => setUsername(event.target.value)}></TextField><br/>
      <TextField type="password" placeholder="Password" onChange={
        event => setPassword(event.target.value)}></TextField><br/>
      <Button
        variant="contained"
        onClick={buttonClicked}
      >
        Register
      </Button>
    </div>
  );
};

export { RegistrationForm };
