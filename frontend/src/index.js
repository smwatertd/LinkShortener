import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import UserStore from "./store/UserStore";
import RedirectStore from './store/RedirectStore';
import SocketListStore from './store/SocketListStore';
import SocketStore from "./store/SocketStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    redirect: new RedirectStore(),
    socket: new SocketStore(),
    socketList: new SocketListStore()
  }}>
    <Header />
    <App />
    <Footer />
  </Context.Provider>
);
