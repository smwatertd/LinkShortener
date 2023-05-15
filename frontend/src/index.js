import React, { createContext } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import UserStore from "./store/UserStore";
import RedirectStore from "./store/RedirectStore";
import SocketListStore from "./store/SocketListStore";
import PaginationStore from "./store/PaginationStore";
import LoadingStore from "./store/LoadingStore";
import AlertStore from "./store/AlertStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    socketList: new SocketListStore(),
    redirect: new RedirectStore(),
    pagination: new PaginationStore(),
    loading: new LoadingStore(),
    alert: new AlertStore(),
  }}>
    <App />
  </Context.Provider>
);

export { Context };
