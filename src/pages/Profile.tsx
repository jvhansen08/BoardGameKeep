import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [name, setName] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(new Date());
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        setName(user.displayName || "");
        setEmail(user.email || "");
      }
    });
  }, [navigate, auth, auth.currentUser, refreshTrigger]);

  const handleUpdateName = async () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
        setRefreshTrigger(new Date());
      });
    }
  };

  const handleUpdateEmail = async () => {
    if (auth.currentUser) {
      updateEmail(auth.currentUser, email).then(() => {
        setRefreshTrigger(new Date());
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (auth.currentUser) {
      updatePassword(auth.currentUser, password).then(() => {
        setNewPassword(password);
      });
    }
  };

  return (
    <Stack mt="2em" justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ width: "40vw" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4">Profile</Typography>
            <Typography variant={"h5"}>Name</Typography>
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
            <Button
              disabled={name === user?.displayName || name === ""}
              onClick={handleUpdateName}
            >
              Update Name
            </Button>
            <Typography variant={"h5"}>Email</Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              disabled={email === user?.email || name === ""}
              onClick={handleUpdateEmail}
            >
              Update Email
            </Button>
            <Typography variant={"h5"}>Change Your Password</Typography>
            <TextField
              helperText="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
            />
            <TextField
              helperText="Confirm New Password"
              value={passwordValidation}
              onChange={(e) => setPasswordValidation(e.target.value)}
              type={"password"}
            />
            {password !== passwordValidation && (
              <Alert severity="error">Passwords do not match</Alert>
            )}
            <Button
              disabled={
                password === "" ||
                password !== passwordValidation ||
                password === newPassword
              }
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
