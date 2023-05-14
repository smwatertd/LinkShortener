import { IconButton } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const CopyButton = ({item, sx=null}) => {
  const buttonClicked = () => {
    navigator.clipboard.writeText(item);
  };

  return (
    <IconButton
      onClick={buttonClicked}
    >
      <ContentCopyOutlinedIcon
        size="small"
        sx={{
          color: "#1976d2",
        }}
      />
    </IconButton>
  );
};

export { CopyButton };
