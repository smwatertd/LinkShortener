import { useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Context } from "../index";
import { deleteSocket } from "../http/SocketApi";
import { normalizeDate, normalizeShortUrl } from "../utils/SocketUtils";

import { CopyButton } from "./ui/CopyButton";

const Socket = observer(({num, socket}) => {
  // Компонент отображения сокета
  // num - номер
  // socket - сокет
  const navigate = useNavigate();
  const { socketList, pagination, loading } = useContext(Context);

  const deleteButtonClicked = async () => {
    // Обработчик нажатия кнопки удаления сокета
    loading.setIsButtonLoading(true);

    await deleteSocket({
      shortUrl: socket.shortUrl,
    });
    removeSocket();
    loading.setIsButtonLoading(false);
  };

  const removeSocket = () => {
    // Удаление сокета из mobx хранилища
    socketList.removeSocket(num - 1 - pagination.firstItemIndex);
    if (!socketList.sockets.length) {
      pagination.setPage(pagination.page - 1);
      navigateToPreviousPage();
    }
  };

  const navigateToPreviousPage = () => {
    // Перенаправление на предыдущую страницу
    navigate({
      search: createSearchParams({
        page: pagination.page,
        pageSize: pagination.pageSize,
      }).toString(),
    });
  };

  const isLastSocket = () => {
    // Проверка является ли сокет последним на странице
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

        <LoadingButton
          variant="contained"
          onClick={deleteButtonClicked}
          loading={loading.isButtonLoading}
        >
          Удалить
        </LoadingButton>
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
});

export { Socket };
