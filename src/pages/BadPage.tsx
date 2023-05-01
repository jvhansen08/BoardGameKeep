import { Button, Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const BadPage: FC = () => {
    const navigate = useNavigate();
    
      return (
     <Stack justifyContent={"center"} alignItems={"center"} height={"90vh"} spacing={2}> 
        <Typography variant="h4">Sorry this page doesn't exist, please head to our landing page</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Landing Page</Button>
     </Stack>
      );
    };