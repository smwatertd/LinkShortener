import React, { useContext } from "react";
import { Routes, Route }from "react-router-dom";
import { observer } from "mobx-react-lite";

import { publicRoutes, privateRoutes } from "../utils/Routes";
import { Context } from "../index";

const AppRouter = observer(() => {
  // Роутер приложения
  const { user } = useContext(Context);

  const isUserAuth = () => {
    // Проверка авторизованности пользователя
    return !!localStorage.getItem("refresh") || user.isAuth;
  };


  return (
    <Routes>
      {
        isUserAuth() && privateRoutes.map(({path, element}) =>
          <Route key={path} path={path} element={element} exact/>
        )
      }
      {
        publicRoutes.map(({path, element}) =>
          <Route key={path} path={path} element={element} exact/>
        )
      }
    </Routes>
  );
});

export default AppRouter;
