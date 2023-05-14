import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

import { deleteSocket } from "../http/SocketApi";
import { Context } from "../index";
import { normalizeDate, normalizeShortUrl } from "../utils/SocketUtils";

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

  return (
    <Box>
      <Typography
        sx={{
          paddingLeft: 2,
          paddingTop: 2,
          paddingBottom: 1,
        }}
      >
        {num}) Full Url: {socket.fullUrl}<br/>
        Short Url: {normalizeShortUrl(socket.shortUrl)}<br/>
        Created At: {normalizeDate(socket.createdAt)}<br/>
        Views: {socket.views}
      </Typography>
      <Button
        variant="contained"
        onClick={deleteButtonClicked}
        sx={{
          marginLeft: 2,
          marginBottom: 1,
        }}
      >
        Удалить
      </Button>
      <hr/>
    </Box>
  );
};

export { Socket };
