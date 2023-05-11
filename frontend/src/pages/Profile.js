import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";
import { MAIN_ROUTE } from "../utils/Consts";
import { SocketList } from "../components/SocketList";
import { CustomPagination } from "../components/CustomPagination";

const Profile = observer(() => {
  const [searchParams] = useSearchParams();
  const { socketList, pagination } = useContext(Context);
  const navigate = useNavigate();

  const handleFetchUserSockets = () => {
    fetchSockets({
      page: pagination.page,
      pageSize: pagination.pageSize,
    })
      .then(response => response.data)
      .then(response => {
        socketList.setSockets(response.sockets);
        pagination.setItemsCount(response.count);
      })
      .catch(error => {});
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const navigateToMain = () => {
    navigate(MAIN_ROUTE);
  };

  const setPage = () => {
    const page = Number(searchParams.get("page"));
    pagination.setPage(page);
  };

  const setPageSize = () => {
    const pageSize = Number(searchParams.get("pageSize"));
    pagination.setPageSize(pageSize);
  };

  useEffect(() => {
    setPage();
    setPageSize();
  }, []);

  useEffect(() => {
    handleFetchUserSockets();
    scrollToTop();
  }, [pagination.page]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#28384A",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography
          sx={{
            color: "white",
          }}
        >
          Ваш профиль
        </Typography>
        <Button
          sx={{
            position: "absolute",
            marginRight: 2,
            right: 0,
          }}
          onClick={event => navigateToMain()}
        >
          Главная
        </Button>
      </Box>

      {
        socketList.sockets
          ?
          <div>
            <SocketList />
            <CustomPagination />
          </div>
          :
          <Typography>
            У вас нет записей
          </Typography>
      }
    </div>
  );
});

export { Profile };
