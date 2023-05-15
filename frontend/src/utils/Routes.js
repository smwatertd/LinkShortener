import { Main } from "../pages/Main";
import { Profile } from "../pages/Profile";
import { Auth } from "../pages/Auth";
import { Result } from "../pages/Result";
import { Redirect } from "../pages/Redirect";
import { NotFound } from "../pages/NotFound";

import {
  ERROR_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  RESULT_ROUTE,
} from "./Consts";

export const publicRoutes = [
  // Объекты публичных маршрутов
  {
    path: MAIN_ROUTE,
    element: <Main />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: RESULT_ROUTE,
    element: <Result />,
  },
  {
    path: MAIN_ROUTE + "/:shortUrl",
    element: <Redirect />,
  },
  {
    path: ERROR_ROUTE,
    element: <NotFound />,
  },
];

export const privateRoutes = [
  // Объекты приватных маршрутов
  {
    path: PROFILE_ROUTE,
    element: <Profile />,
  },
];
