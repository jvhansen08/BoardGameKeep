import { FC, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DashboardGame } from "../components/dashboardGame";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { AddBoardGame } from "../components/AddBoardGame";
import { QuerySnapshot, collection, doc, getDocs } from "firebase/firestore";
import { Boardgame } from "../types/types";


export const MyGames: FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Boardgame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(new Date());

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    getDocs(collection(db, "boardGames")).then((querySnapshot) => {
      const games: Boardgame[] = [];
      querySnapshot.forEach((doc) => {
        games.push(doc.data() as Boardgame);
      });
      setGames(games);
  }).catch((error) => {
    setError(true);
  }).finally(() => {
    setLoading(false);
  });
  }, [refreshTrigger]);
  


  return (
    <Stack alignItems={"center"} justifyContent={"center"} sx={{mt:10}}>
      <AddBoardGame setRefreshTrigger={setRefreshTrigger}/>
      {loading && <CircularProgress />}
      {error && <Typography>Something went wrong</Typography>}
      {games.length === 0 && !loading && !error && <Typography variant="h4">No games found</Typography>}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "beginning",
            flexWrap: "wrap",
            width: 3 / 4,
            maxHeight: 1 / 2,
            overflowY: "auto",
          }}
        >
          {games.map((game) => (
            <div key={game.id} style={{ padding: "15px" }}>
              <DashboardGame {...game} />
            </div>
          ))}
        </Box>
    </Stack>
  );
};
