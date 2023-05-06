import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { deleteSocket } from "../http/SocketApi";
import { Context } from "../index";
import { getShortUrl } from "../utils/LinksUtils";

const Socket = ({index, socket}) => {
  const { socketList } = useContext(Context);
  const { fullUrl, shortUrl, createdAt, views } = socket;

  const deleteButtonClicked = async () => {
    await deleteSocket({
      shortUrl: getShortUrl(shortUrl),
    })
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
        {index}) Full Url: {fullUrl}<br/>
        Short Url: {shortUrl}<br/>
        Created At: {createdAt}<br/>
        Views: {views}
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
