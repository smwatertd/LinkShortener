import { Box } from "@mui/material";

import { SocketCard } from "../components/SocketCard";
import { MainButton } from "../components/ui/MainButton";

const Result = () => {
  // Страница для отображения результата создания сокета
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: 5,
            borderRadius: 2,
            background: "#28384A",
          }}
        >
          <SocketCard />
          <MainButton />
        </Box>
      </Box>
    </div>
  );
};

export { Result };
