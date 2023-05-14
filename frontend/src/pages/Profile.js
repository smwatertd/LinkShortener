import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { fetchSockets } from "../http/SocketApi";
import { Context } from "../index";
import { SocketList } from "../components/SocketList";
import { CustomPagination } from "../components/CustomPagination";
import { MainButton } from "../components/ui/MainButton";

const Profile = observer(() => {
  const [ searchParams ] = useSearchParams();
  const { socketList, pagination } = useContext(Context);

  const handleFetchUserSockets = async () => {
    let response;

    try {
      response = await fetchSockets({
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
    } catch (error) {
      console.error(error);
      return;
    }

    socketList.setSockets(response.data.sockets);
    pagination.setItemsCount(response.data.count);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
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
        <MainButton
          sx={{
            position: "absolute",
            marginRight: 2,
            right: 0,
          }}
        />
      </Box>

      <Box
        sx={{
          paddingLeft: 2,
          paddingTop: 2,
          paddingRight: 2,
        }}
      >
        {
          socketList.sockets.length
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
      </Box>
    </div>
  );
});

export { Profile };
