import { useLocation } from "react-router-dom";
import { useState } from "react";

import { LOGIN_ROUTE } from "../utils/Consts";
import { Login } from "../components/Login";
import { Registration } from "../components/Registration";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [ username, setUsername ] = useState("admin");
  const [ email, setEmail ] = useState("admin@gmail.com");
  const [ password, setPassword ] = useState("599523956qQ");

  return (
    <div>
      {
        isLogin
          ?
          <div>
            <div>Войти в систему</div>
            <input type="text" placeholder="Username" onChange={
              e => setUsername(e.target.value)}></input><br/>
            <input type="password" placeholder="Password" onChange={
              e => setPassword(e.target.value)}></input><br/>
            <Login props={{username, password}}/>
          </div>
          :
          <div>
            <div>Регистрация</div>
            <input type="text" placeholder="Email" onChange={
              e => setEmail(e.target.value)}></input><br/>
            <input type="text" placeholder="Username" onChange={
              e => setUsername(e.target.value)}></input><br/>
            <input type="password" placeholder="Password" onChange={
              e => setPassword(e.target.value)}></input><br/>
            <Registration props={{email, username, password}}/>
          </div>
      }
    </div>
  );
};

export { Auth };
