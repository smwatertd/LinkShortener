import { useContext } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

const LoadingIndicatior = observer(() => {
  // Индикатор загрузки
  const { loading } = useContext(Context);

  if (!(loading.isPageLoading || loading.isProfileLoading)) {
    // Проверка необходимости отображения компонента
    return;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress>
      </CircularProgress>
    </Box>
  );
});

export { LoadingIndicatior };
