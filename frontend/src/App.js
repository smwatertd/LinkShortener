import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect } from "react";

import AppRouter from "./components/AppRouter";
import { check } from "./http/UserApi";

import { Context } from "./index";

import "./styles/App.css";

const App = () => {
  const { user } = useContext(Context);

  const checkUserAuth = () => {
    check()
      .then(response => {
        user.setIsAuth(true);
      })
      .catch(e => {});
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
