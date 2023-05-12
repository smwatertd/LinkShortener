import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect } from "react";

import AppRouter from "./components/AppRouter";
import { check } from "./http/UserApi";

import { Context } from "./index";

import "./styles/App.css";

const App = () => {
  const { user } = useContext(Context);

  const checkUserAuth = async () => {
    try {
      await check();
    } catch(error) {
      console.error(error);
      return;
    }
    user.setIsAuth(true);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  	return (
    	<BrowserRouter>
      	<AppRouter />
    	</BrowserRouter>
  	);
};

export default App;
