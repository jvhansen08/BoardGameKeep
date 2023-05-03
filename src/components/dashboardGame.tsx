import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  formikTextFieldNumberProps,
  formikTextFieldProps,
} from "../utils/helperFunctions";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Boardgame } from "../types/types";

export const validationSchema = yup.object({
  title: yup.string().required("Name is required"),
  minPlayers: yup
    .number()
    .min(1, "Min players must be 1 or greater")
    .max(
      yup.ref("maxPlayers"),
      "Min players must be less than or equal to max players"
    )
    .required("Min player count is required"),
  maxPlayers: yup
    .number()
    .min(1, "Max players must be 1 or greater")
    .required("Max player count is required"),
  minPlayTime: yup
    .number()
    .min(1, "Min play time must be 1 or greater")
    .max(
      yup.ref("maxPlayTime"),
      "Min play time must be less than or equal to max play time"
    )
    .required("Min play time is required"),
  maxPlayTime: yup
    .number()
    .min(1, "Max play time must be 1 or greater")
    .required("Max play time is required"),
  rating: yup
    .number()
    .min(1, "Rating must be 1 or greater")
    .max(10, "Rating must be 10 or less")
    .required("Rating is required"),
});

export interface AddBoardGameProps {
  setRefreshTrigger: (date: Date) => void;
  game: Boardgame;
  index: number;
}

export type gameProps = {
  id: number;
  title: string;
  minPlayers: number;
  maxPlayers: number;
  minPlayTime: number;
  maxPlayTime: number;
  rating: number;
};

export function DashboardGame(game: gameProps) {
  return (
    <Card
      sx={{
        maxWidth: 225,
        minWidth: 225,
        padding: 3,
        minHeight: 160,
        maxHeight: 160,
      }}
    >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Game
      </Typography>
      <Typography variant="h5" component="div">
        {game.title}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Players: {game.minPlayers}-{game.maxPlayers}
      </Typography>
      <Typography>
        Time: {game.minPlayTime}-{game.maxPlayTime}
      </Typography>
    </Card>
  );
}

export const UpdateBoardGame: FC<AddBoardGameProps> = (props) => {
  const { setRefreshTrigger } = props;
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [error] = useState("");
  const updateFormik = useFormik({
    initialValues: {
      title: props.game.title,
      minPlayers: props.game.minPlayers,
      maxPlayers: props.game.maxPlayers,
      minPlayTime: props.game.minPlayTime,
      maxPlayTime: props.game.maxPlayTime,
      rating: props.game.rating,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!auth.currentUser) return;
      const docRef = doc(db, "userCollection", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const games = docSnap.data()?.games;
        games[props.index] = values;
        updateFormik.initialValues.title = values.title;
        updateFormik.initialValues.minPlayers = values.minPlayers;
        updateFormik.initialValues.maxPlayers = values.maxPlayers;
        updateFormik.initialValues.minPlayTime = values.minPlayTime;
        updateFormik.initialValues.maxPlayTime = values.maxPlayTime;
        updateFormik.initialValues.rating = values.rating;

        await updateDoc(doc(db, "userCollection", auth.currentUser.uid), {
          games: games,
        });
      } else {
        await setDoc(doc(db, "userCollection", auth.currentUser.uid), {
          games: [values],
        });
      }
      setRefreshTrigger(new Date());
      setUpdateOpen(false);
    },
  });

  const onClose = () => {
    setUpdateOpen(false);
  };

  const deleteGame = async (index: number) => {
    if (!auth.currentUser) return;
    const docRef = doc(db, "userCollection", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const games = docSnap.data()?.games;
      games.splice(index, 1);
      await updateDoc(doc(db, "userCollection", auth.currentUser.uid), {
        games: games,
      });
    }
    setRefreshTrigger(new Date());
  };

  return (
    <>
      <Card sx={{ maxWidth: 225, minWidth: 225, padding: 3, minHeight: 180 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Game
        </Typography>
        <Typography variant="h5" component="div">
          {props.game.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Players: {props.game.minPlayers}-{props.game.maxPlayers}
        </Typography>
        <Typography>
          Time: {props.game.minPlayTime}-{props.game.maxPlayTime}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Rating: {props.game.rating}
        </Typography>
        <Button
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            updateFormik.resetForm();
            setUpdateOpen(true);
          }}
        >
          Update
        </Button>
      </Card>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>Update Board Game</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={4}
            width={400}
          >
            <TextField
              {...formikTextFieldProps(updateFormik, "title", "Title")}
              helperText={updateFormik.errors.title}
            />
            <TextField
              {...formikTextFieldNumberProps(
                updateFormik,
                "minPlayers",
                "Min Player Count"
              )}
              helperText={updateFormik.errors.minPlayers}
            />
            <TextField
              {...formikTextFieldNumberProps(
                updateFormik,
                "maxPlayers",
                "Max Player Count"
              )}
              helperText={updateFormik.errors.maxPlayers}
            />
            <TextField
              {...formikTextFieldNumberProps(
                updateFormik,
                "minPlayTime",
                "Min Play Time"
              )}
              helperText={updateFormik.errors.minPlayTime}
            />
            <TextField
              {...formikTextFieldNumberProps(
                updateFormik,
                "maxPlayTime",
                "Max Play Time"
              )}
              helperText={updateFormik.errors.maxPlayTime}
            />
            <TextField
              {...formikTextFieldNumberProps(updateFormik, "rating", "Rating")}
              helperText={
                updateFormik.errors.rating
                  ? updateFormik.errors.rating
                  : "Rating must be between 1 and 10"
              }
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
          <Button onClick={() => updateFormik.handleSubmit()}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={4}
          width={400}
        >
          <Typography
            sx={{ fontSize: 18 }}
            color="text.secondary"
            padding={"15px"}
          >
            Are you sure you want to delete this game?
          </Typography>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button
              sx={{ color: (theme) => theme.palette.error.main }}
              onClick={() => {
                deleteGame(props.index);
                setDeleteOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};
