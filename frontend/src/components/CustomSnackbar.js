import React from "react";
import { Snackbar, Alert } from "@mui/material";
const CustomSnackbar = ({ message, snackbarType, isSnackbarViewable }) => {
  
  return (
    <Snackbar open={isSnackbarViewable}>
      <Alert severity={snackbarType} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
