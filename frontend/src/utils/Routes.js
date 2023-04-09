import { Auth } from "../pages/Auth";
import { Main } from "../pages/Main";
import { Result } from "../pages/Result";
import { Redirect } from "../pages/Redirect";
import { Profile } from "../pages/Profile";
import { LogOut } from "../components/LogOut";

import {
    LOGIN_ROUTE,
    LOG_OUT_ROUTE,
    REGISTRATION_ROUTE,
    USER_SOCKETS_ROUTE,
    MAIN_ROUTE,
    RESULT_ROUTE,
} from "./Consts";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        component: <Main />,
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth />,
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth />,
    },
    {
        path: RESULT_ROUTE,
        component: <Result />,
    },
    {
        path: MAIN_ROUTE + "/:shortUrl",
        component: <Redirect />,
    },
];

export const authRoutes = [
    {
        path: USER_SOCKETS_ROUTE,
        component: <Profile />,
    },
    {
        path: LOG_OUT_ROUTE,
        component: <LogOut />,
    },
];
