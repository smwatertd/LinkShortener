import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { observer } from "mobx-react-lite";

import { Context } from "../index";
import { LogOut } from "../components/LogOut";
import { Form } from "../components/Form";
import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/Consts";

const Main = observer(() => {
  const { user } = useContext(Context);

  return (
    <div>
      {
        user.isAuth
          ?
          <div>
            <NavLink to={PROFILE_ROUTE}>Profile</NavLink>
            <LogOut />
          </div>
          :
          <div>
            <NavLink to={LOGIN_ROUTE}>Login</NavLink><br/>
            <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
          </div>
      }
      <Form />
      <br/>
    </div>
  );
});

export {Main};
