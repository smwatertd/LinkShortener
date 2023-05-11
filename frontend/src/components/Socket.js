import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { deleteSocket } from "../http/SocketApi";
import { Context } from "../index";
import { normalizeDate, normalizeShortUrl } from "../utils/SocketUtils";

const Socket = ({index, socket}) => {
  const { socketList } = useContext(Context);

  const deleteButtonClicked = async () => {
    const shortUrl = socket.shortUrl;
    await deleteSocket({shortUrl})
      .then(response => {
        socketList.removeSocket(index - 1);
      })
      .catch(error => {});
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
        {index}) Full Url: {socket.fullUrl}<br/>
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
