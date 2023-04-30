import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";
import { SocketList } from "../components/SocketList";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const { socketList } = useContext(Context);

  useEffect(() => {
    if (user.isAuth === false) {
      return;
    }

    fetchSockets()
      .then(response => {
        socketList.setSocketList(response.data);
      });
  }, [user.isAuth]);

  return (
    <div>
      {
        user.isAuth
          ?
          <div>
            Profile
            {
              socketList.socketList.length === 0
                ?
                <div>У вас нет записей</div>
                :
                <SocketList />
            }
          </div>
          :
          <div>
            Вы не авторизованы
          </div>
      }
    </div>
  );
});

export { Profile };
