import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { check } from "./http/UserApi";
import AppRouter from "./components/AppRouter";
import { LoadingIndicatior } from "./components/LoadingIndicator";

import { Context } from "./index";

import "./styles/App.css";

const App = observer(() => {
  const { user, loading } = useContext(Context);

  const checkUserAuth = async () => {
    loading.setIsPageLoading(true);

    try {
      await check();
      user.setIsAuth(true);
    } catch(error) {
      console.error(error);
    } finally {
      loading.setIsPageLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  	return (
    <div>
      {
        loading.isPageLoading
          ?
          <LoadingIndicatior />
          :
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
      }
    </div>
  	);
});

export default App;
