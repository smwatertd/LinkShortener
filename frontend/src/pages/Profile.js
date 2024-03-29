import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";
import { SocketList } from "../components/SocketList";
import { CustomPagination } from "../components/CustomPagination";
import { MainButton } from "../components/ui/MainButton";
import { LoadingIndicatior } from "../components/LoadingIndicator";

const Profile = observer(() => {
  // Страница профиля пользователя
  const [ searchParams ] = useSearchParams();
  const { socketList, pagination, loading } = useContext(Context);

  const handleFetchUserSockets = async () => {
    // Обработчик получения сокетов пользователя
    loading.setIsProfileLoading(true);

    const response = await fetchSockets({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    socketList.setSockets(response.data.sockets);
    pagination.setItemsCount(response.data.count);
    loading.setIsProfileLoading(false);
  };

  const scrollToTop = () => {
    // Задание положения страницы вверх
    window.scrollTo(0, 0);
  };

  const setPage = () => {
    // Обработчик получения номера страницы из параметров поиска
    const page = Number(searchParams.get("page"));
    pagination.setPage(page);
  };

  const setPageSize = () => {
    // Обработчик получения количества сокетов на страницу
    // из параметров поиска
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
        <MainButton
          sx={{
            position: "absolute",
            marginRight: 2,
            right: 0,
          }}
        />
      </Box>

      {
        loading.isProfileLoading
          ?
          <LoadingIndicatior />
          :
          <Box
            sx={{
              paddingLeft: 2,
              paddingTop: 2,
              paddingRight: 2,
            }}
          >
            <SocketList />
            <CustomPagination />
          </Box>
      }
    </div>
  );
});

export { Profile };
