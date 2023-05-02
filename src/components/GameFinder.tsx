import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { Boardgame } from "../types/types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

import { formikTextFieldNumberProps } from "../utils/helperFunctions";
import { Close } from "@mui/icons-material";
import { DashboardGame } from "./dashboardGame";

const validationSchema = yup.object({
  numPlayers: yup.number().min(1, "Must be 1 or greater"),
  playTime: yup.number().min(1, "Must be 1 or greater"),
  rating: yup.number().min(0, "Must be 0 or greater"),
});

const getRandomGameFromCriteria = (
  games: Boardgame[],
  criteria: any,
  setRandomGame: (game: Boardgame | null) => void
) => {
  const filteredGames = games.filter((game) => {
    if (criteria.numPlayers && game.maxPlayers < criteria.numPlayers) {
      return false;
    }
    if (criteria.playTime && game.maxPlayTime < criteria.playTime) {
      return false;
    }
    if (criteria.rating && game.rating < criteria.rating) {
      return false;
    }
    return true;
  });

  if (filteredGames.length === 0) {
    setRandomGame(null);
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredGames.length);
  setRandomGame(filteredGames[randomIndex]);
};

export default function GameFinder({
  games,
  setOpenGameFinder,
}: {
  games: Boardgame[];
  setOpenGameFinder: (open: boolean) => void;
}) {
  const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
  const [openRandomGameModal, setOpenRandomGameModal] = useState(false);
  const handleCloseRandomGameModal = () => setOpenRandomGameModal(false);

  const formik = useFormik({
    initialValues: {
      numPlayers: 4,
      playTime: 60,
      rating: 7,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      getRandomGameFromCriteria(games, values, setRandomGame);
      setOpenRandomGameModal(true);
    },
  });

  return (
    <>
      <Card>
        <CardHeader
          title="Game Finder"
          action={
            <IconButton
              onClick={() => {
                setOpenGameFinder(false);
                setRandomGame(null);
                formik.resetForm();
              }}
            >
              <Close />
            </IconButton>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              {...formikTextFieldNumberProps(
                formik,
                "numPlayers",
                "Number of Players"
              )}
            />
            <TextField
              {...formikTextFieldNumberProps(formik, "playTime", "Play Time")}
            />
            <TextField
              {...formikTextFieldNumberProps(formik, "rating", "Rating")}
            />
            <Button variant="contained" onClick={() => formik.handleSubmit()}>
              Find Game
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Modal open={openRandomGameModal} onClose={handleCloseRandomGameModal}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            maxWidth: "600px",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {randomGame ? (
              <DashboardGame {...randomGame} />
            ) : (
              <Alert severity="info">
                No games found matching your criteria
              </Alert>
            )}
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
