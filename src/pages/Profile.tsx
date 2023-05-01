import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }else{
        setUser(user);
      }
    });
  }, [navigate]);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"90vh"}>
      <Card sx={{width:"40vw", height:"40vh"}}>
        <CardContent>
          <CardHeader title={"Profile"} />
          <Typography variant={"h5"}>{user?.displayName}</Typography>
          <Typography variant={"h5"}>{user?.email}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
