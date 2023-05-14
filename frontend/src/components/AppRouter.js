import React from "react";
import { Routes, Route }from "react-router-dom";
import { observer } from "mobx-react-lite";

import { publicRoutes, privateRoutes } from "../utils/Routes";

const AppRouter = observer(() => {
  const isRefreshTokenExists = () => {
    return !!localStorage.getItem("refresh");
  };

  return (
    <Routes>
      {
        isRefreshTokenExists() && privateRoutes.map(({path, element}) =>
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
