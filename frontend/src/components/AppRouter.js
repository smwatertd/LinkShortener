import React from "react";
import { Routes, Route }from "react-router-dom";
import { publicRoutes, authRoutes } from "../utils/Routes";

const AppRouter = () => {
    return (
        <Routes>
            {
                publicRoutes.map(
                    ({path, component}) => <Route key={path} path={path} element={component} exact/>
                )
            }
            {
                authRoutes.map(
                    ({path, component}) => <Route key={path} path={path} element={component} exact/>
                )
            }
        </Routes>
    );
};

export default AppRouter;
