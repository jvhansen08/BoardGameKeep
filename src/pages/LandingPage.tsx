import { Button, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const LandingPage: React.FC = () => {
  const navigate = useNavigate();


  return (
    <Stack direction="column" justifyContent={"center"} alignItems={"center"} height={"90vh"} spacing={2}>
      <Typography variant="h2" >
        Welcome to BoardGameKeep!
      </Typography>
      <Typography variant="h5" >
        We are here to help you keep track of your board games!
      </Typography>
      <Stack direction="column" spacing={1}>
        <Button
          style={{ backgroundColor:"primary" }}
          variant="contained"
          onClick={() => navigate("/login")}
          color="primary"
        >
          Login
        </Button>
        <Button
          color="primary"
          variant="text"
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </Button>
      </Stack>
    </Stack>
  );
};
