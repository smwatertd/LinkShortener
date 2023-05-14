import { useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { Context } from "../index";
import { deleteSocket } from "../http/SocketApi";
import { normalizeDate, normalizeShortUrl } from "../utils/SocketUtils";

import { CopyButton } from "./ui/CopyButton";

const Socket = ({num, socket}) => {
  const navigate = useNavigate();
  const { socketList, pagination } = useContext(Context);

  const deleteButtonClicked = async () => {
    try {
      await deleteSocket({
        shortUrl: socket.shortUrl,
      });
    } catch (error) {
      console.error(error);
      return;
    }
    socketList.removeSocket(num - 1 - pagination.firstItemIndex);
    if (!socketList.sockets.length) {
      pagination.setPage(pagination.page - 1);
      navigateToPreviousPage();
    }
  };

  const navigateToPreviousPage = () => {
    navigate({
      search: createSearchParams({
        page: pagination.page,
        pageSize: pagination.pageSize,
      }).toString(),
    });
  };

  const isLastSocket = () => {
    return socketList.sockets.length === num - pagination.firstItemIndex;
  };

  return (
    <Box
      sx={{
        paddingBottom: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems:"center",
        }}
      >
        <Typography>
          {num}) Полный URL: {socket.fullUrl}
        </Typography>
        <CopyButton
          item={socket.fullUrl}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography>
          Короткий URL: {normalizeShortUrl(socket.shortUrl)}
        </Typography>
        <CopyButton
          item={normalizeShortUrl(socket.shortUrl)}
        />
      </Box>

      <Typography
        sx={{
          marginBottom: 1,
        }}
      >
        Дата создания: {normalizeDate(socket.createdAt)}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{
            marginRight: 2,
          }}
        >
          Просмотры: {socket.views}
        </Typography>

        <Button
          variant="contained"
          onClick={deleteButtonClicked}
        >
          Удалить
        </Button>
      </Box>
      {
        isLastSocket()
          ?
          <></>
          :
          <hr/>
      }
    </Box>
  );
};

export { Socket };
