import React, { createContext } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import UserStore from "./store/UserStore";
import SocketListStore from "./store/SocketListStore";
import RedirectStore from "./store/RedirectStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    socketList: new SocketListStore(),
    redirect: new RedirectStore(),
  }}>
    <App />
  </Context.Provider>
);
