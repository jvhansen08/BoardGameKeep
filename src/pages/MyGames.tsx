import { FC, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { AddBoardGame } from "../components/AddBoardGame";
import { UpdateBoardGame } from "../components/dashboardGame";
import { doc, getDoc } from "firebase/firestore";
import { Boardgame } from "../types/types";

export const MyGames: FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Boardgame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(new Date());
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });
  }, [navigate, auth, auth.currentUser]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const docRef = doc(db, "userCollection", user.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data) {
            setGames(data.games);
          }
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshTrigger, user]);

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: 10 }}>
      {loading && <CircularProgress />}
      {error && <Typography>Something went wrong</Typography>}
      {games.length === 0 && !loading && !error && (
        <Alert severity="info">No games found</Alert>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "15px",
          width: "75%",
          maxHeight: "50%",
        }}
      >
        {games.map((game, index) => (
          <Box
            key={index}
            sx={{
              justifyContent: "start",
            }}
          >
            <UpdateBoardGame
              game={game}
              index={index}
              setRefreshTrigger={setRefreshTrigger}
            />
          </Box>
        ))}
      </Box>
      <Stack sx={{ mt: 4 }} direction="row">
        <AddBoardGame setRefreshTrigger={setRefreshTrigger} />
      </Stack>
    </Stack>
  );
};
