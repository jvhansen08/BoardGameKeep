import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Boardgame } from "../types/types";
import GamesTable from "../components/GamesTable";

export const PickGame: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [games, setGames] = useState<Boardgame[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

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
  }, [user]);

  return (
    <Stack mt="4em" alignItems={"center"} height={"90vh"}>
      {loading && <CircularProgress />}
      {error && <Typography>Something went wrong</Typography>}
      {games.length === 0 && !loading && !error && (
        <Alert severity="info">No games found</Alert>
      )}
      {games.length > 0 && !loading && !error && (
        <>
          <Typography variant="h2">Pick A Game</Typography>
          <Container
            maxWidth="lg"
            sx={{
              mt: 5,
            }}
          >
            <GamesTable games={games} />
          </Container>
        </>
      )}
    </Stack>
  );
};
