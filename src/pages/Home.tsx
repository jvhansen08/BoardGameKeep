import { FC, useEffect } from "react";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { DashboardGame } from "../components/dashboardGame";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const dummyData = [
  {
    id: 1,
    title: "Diceforge",
    minPlayers: 2,
    maxPlayers: 4,
    minPlayTime: 20,
    maxPlayTime: 45,
    rating: 9,
  },
  {
    id: 2,
    title: "Shadows over Camelot",
    minPlayers: 3,
    maxPlayers: 7,
    minPlayTime: 60,
    maxPlayTime: 120,
    rating: 8
  },
  {
    id: 3,
    title: "Diceforge",
    minPlayers: 2,
    maxPlayers: 4,
    minPlayTime: 20,
    maxPlayTime: 45,
    rating: 9,
  },
  {
    id: 4,
    title: "Shadows over Camelot",
    minPlayers: 3,
    maxPlayers: 7,
    minPlayTime: 60,
    maxPlayTime: 120,
    rating: 8
  },
  {
    id: 5,
    title: "Shadows over Camelot",
    minPlayers: 3,
    maxPlayers: 7,
    minPlayTime: 60,
    maxPlayTime: 120,
    rating: 8
  },
  {
    id: 6,
    title: "Shadows over Camelot",
    minPlayers: 3,
    maxPlayers: 7,
    minPlayTime: 60,
    maxPlayTime: 120,
    rating: 8
  }
]

export const Home: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>

      <Container sx={{width:1}}>
        <Box sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"beginning",
          flexWrap:"wrap",
          width:3/4,
          maxHeight: 1/2,
          overflowY:"auto"
        }}>
        {dummyData.map((game) => (
          <div style={{ padding: "15px"}}>
            <DashboardGame {...game} />
          </div>
        ))}
        </Box>
      </Container>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};
