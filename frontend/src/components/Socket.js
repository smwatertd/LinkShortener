import { Typography } from "@mui/material";

const Socket = ({index, socket}) => {
  const { fullUrl, shortUrl, createdAt, views } = socket;

  return (
    <div>
      <Typography
        sx={{
          paddingLeft: 2,
          paddingTop: 2,
        }}
      >
        {index}) Full Url: {fullUrl}<br/>
        Short Url: {shortUrl}<br/>
        Created At: {createdAt}<br/>
        Views: {views}
      </Typography>
      <hr/>
    </div>
  );
};

export { Socket };
