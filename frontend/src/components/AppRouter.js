import React from "react";
import { Routes, Route }from "react-router-dom";

import { publicRoutes, privateRoutes } from "../utils/Routes";

const AppRouter = () => {
  const isTokenExists = () => {
    return !!localStorage.getItem("refresh");
  };

  return (
    <Routes>
      {
        isTokenExists() && privateRoutes.map(({path, element}) =>
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
};

export default AppRouter;
