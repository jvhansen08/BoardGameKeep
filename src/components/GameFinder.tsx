import { Stack, TextField } from "@mui/material";
import { Boardgame } from "../types/types";

export default function GameFinder({ games }: { games: Boardgame[] }) {
  return (
    // <Form>
    <Stack spacing={2}>
      <TextField id="numPlayers" label="Number of Players" type="number" />
      <TextField id="playTime" label="Play Time" type="number" />
      <TextField id="rating" label="Rating" type="number" />
    </Stack>
    // </Form>
  );
}
