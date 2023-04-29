import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import Typography from '@mui/material/Typography';
import { UpdateBoardgame } from "./UpdateBoardgame";

export type gameProps = {
    id: number,
    title: string,
    minPlayers: number,
    maxPlayers: number,
    minPlayTime: number,
    maxPlayTime: number,
    rating: number,
}

export function DashboardGame(game: gameProps) {
    return(
        <Card sx={{ minWidth: 225, padding: 3}}>
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
    )
}