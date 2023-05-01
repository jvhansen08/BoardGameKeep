import { FC, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DashboardGame } from "../components/dashboardGame";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { AddBoardGame } from "../components/AddBoardGame";
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
        } else {
          setError(true);
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
    <Stack alignItems={"center"} justifyContent={"center"} sx={{ mt: 10 }}>
      {loading && <CircularProgress />}
      {error && <Typography>Something went wrong</Typography>}
      {games.length === 0 && !loading && !error && (
        <Typography variant="h4">No games found</Typography>
      )}
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
        {games.map((game, index) => (
          <div key={index} style={{ padding: "15px" }}>
            <DashboardGame {...game} />
          </div>
        ))}
      </Box>
      <Stack sx={{mt:4}} direction="row">
        <AddBoardGame setRefreshTrigger={setRefreshTrigger} />
      </Stack>
    </Stack>
  );
};
