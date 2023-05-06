import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Result = observer(() => {
  const [fullUrl, setFullUrl] = useState("Отсутствует");
  const [shortUrl, setShortUrl] = useState("Отсутствует");

  const handleShowResult = () => {
    const localStorageFullUrl = localStorage.getItem("fullUrl");
    const localStorageShortUrl = localStorage.getItem("shortUrl");

    if (localStorageFullUrl) {
      setFullUrl(localStorageFullUrl);
    }
    if (localStorageShortUrl) {
      setShortUrl(localStorageShortUrl);
    }
  };

  useEffect(() => {
    handleShowResult();
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Typography>
        Full Url:
      </Typography>
      <Typography>
        {fullUrl}
      </Typography>
      <br/>
      <Typography>
        Short Url:
      </Typography>
      <Typography>
        {shortUrl}
      </Typography>
    </Box>
  );
});

export { Result };
