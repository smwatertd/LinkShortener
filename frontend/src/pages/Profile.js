import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";

import { SocketList } from "../components/SocketList";
import { MAIN_ROUTE } from "../utils/Consts";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const { socketList } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSockets = () => {
      fetchSockets()
        .then(response => {
          socketList.setSocketList(response.data);
        })
        .catch(error => {
          window.location.reload();
        });
    };

    fetchUserSockets();
  }, [user.isAuth]);

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#28384A",
            alignItems: "center",
            paddingLeft: 2,
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              width: "90%",
            }}
          >
            Ваш профиль
          </Typography>
          <Button
            onClick={event => navigate(MAIN_ROUTE)}
          >
            Главная
          </Button>
        </Box>

        {
          socketList.socketList.length === 0
            ?
            <Typography>
              У вас нет записей
            </Typography>
            :
            <SocketList />
        }
      </div>
    </div>
  );
});

export { Profile };
