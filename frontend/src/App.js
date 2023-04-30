import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect } from "react";

import AppRouter from "./components/AppRouter";
import { check } from "./http/UserApi";

import { Context } from "./index";

const App = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    check()
      .then(response => {
        user.setIsAuth(true);
      })
      .catch(e => {});
  }, []);

  	return (
    	<BrowserRouter>
      	<AppRouter />
    	</BrowserRouter>
  	);
};

export default App;
