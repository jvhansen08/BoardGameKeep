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
} from "@mui/material";
import React, { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {
  formikTextFieldNumberProps,
  formikTextFieldProps,
} from "../utils/helperFunctions";
import { setDoc, doc, addDoc, collection, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

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
}

export const AddBoardGame: FC<AddBoardGameProps> = (props) => {
  const { setRefreshTrigger } = props;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      minPlayers: 1,
      maxPlayers: 1,
      minPlayTime: 1,
      maxPlayTime: 1,
      rating: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!auth.currentUser) return;
      const docRef = doc(db, "userCollection", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setDoc(doc(db, "userCollection", auth.currentUser.uid), {
          games: [...docSnap.data()?.games, values],
        });
      } else {
        await setDoc(doc(db, "userCollection", auth.currentUser.uid), {
          games: [values],
        });
      }
      setRefreshTrigger(new Date());
      setOpen(false);
    },
  });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          formik.resetForm();
          setOpen(true);
        }}
        variant="contained"
      >
        <AddIcon />    Add Board Game
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Board Game</DialogTitle>
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
              {...formikTextFieldProps(formik, "title", "Title")}
              helperText={formik.errors.title}
            />
            <TextField
              {...formikTextFieldNumberProps(
                formik,
                "minPlayers",
                "Min Player Count"
              )}
              helperText={formik.errors.minPlayers}
            />
            <TextField
              {...formikTextFieldNumberProps(
                formik,
                "maxPlayers",
                "Max Player Count"
              )}
              helperText={formik.errors.maxPlayers}
            />
            <TextField
              {...formikTextFieldNumberProps(
                formik,
                "minPlayTime",
                "Min Play Time"
              )}
              helperText={formik.errors.minPlayTime}
            />
            <TextField
              {...formikTextFieldNumberProps(
                formik,
                "maxPlayTime",
                "Max Play Time"
              )}
              helperText={formik.errors.maxPlayTime}
            />
            <TextField
              {...formikTextFieldNumberProps(formik, "rating", "Rating")}
              helperText={
                formik.errors.rating
                  ? formik.errors.rating
                  : "Rating must be between 1 and 10"
              }
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => formik.handleSubmit()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
