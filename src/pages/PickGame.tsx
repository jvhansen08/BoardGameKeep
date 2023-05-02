import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export const PickGame: FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"90vh"}>
      <Typography variant="h2">Pick A Game</Typography>
    </Stack>
  );
};
