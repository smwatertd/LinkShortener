import React, { createContext } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import UserStore from "./store/UserStore";
import SocketListStore from "./store/SocketListStore";
import RedirectStore from "./store/RedirectStore";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    socketList: new SocketListStore(),
    redirect: new RedirectStore(),
  }}>
    <Header />
    <App />
    <Footer />
  </Context.Provider>
);
