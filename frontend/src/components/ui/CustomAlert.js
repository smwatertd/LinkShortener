import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Snackbar } from "@mui/material";

import { Context } from "../../index";

const CustomAlert = observer(() => {
  const { alert } = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    alert.setIsAlert(false);
  };

  const getAleftInfo = () => {
    return alert.alertInfo.message;
  };

  return (
    <Snackbar
      open={alert.isAlert}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{
          width: "100%",
        }}
      >
        {getAleftInfo()}
      </Alert>
    </Snackbar>
  );
});

export { CustomAlert };
