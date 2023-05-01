import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterTabs } from "./RouterTabs";
import { auth } from "../lib/firebase";

export const AppHeader: FC = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  const handleLogout = () => {
    auth.signOut();
    navigateToLogin();
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Stack
      direction="row"
      justifyContent="right"
      gap="3rem"
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <RouterTabs />

      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="large">
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button sx={{ p: 2 }} variant="text" onClick={handleLogout}>
          Sign Out
        </Button>
      </Popover>
    </Stack>
  );
};

export default AppHeader;
