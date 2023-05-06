import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";
import { SocketList } from "../components/SocketList";
import { MAIN_ROUTE } from "../utils/Consts";
import { CustomPagination } from "../components/CustomPagination";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const { socketList } = useContext(Context);
  const navigate = useNavigate();

  const pagesLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(socketList.socketList.length / pagesLimit);
  const lastSocketIndex = currentPage * 10;
  const firstSocketIndex = lastSocketIndex - pagesLimit;
  socketList.setLastSocketIndex(lastSocketIndex);
  socketList.setFirstSocketIndex(firstSocketIndex);

  const handleFetchUserSockets = () => {
    fetchSockets()
      .then(response => {
        socketList.setSocketList(response.data);
      })
      .catch(error => {});
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleFetchUserSockets();
  }, [user.isAuth]);

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
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
          <div>
            <SocketList />
            <CustomPagination props={{
              pagesCount,
              currentPage,
              setCurrentPage,
            }}/>
          </div>
      }
    </div>
  );
});

export { Profile };
