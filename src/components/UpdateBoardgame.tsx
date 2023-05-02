import { FC, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
    CardContent,
    Card,
    Stack,
    TextField,
    Typography,
    Dialog,
    IconButton,
    Alert,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { formikTextFieldNumberProps, formikTextFieldProps } from '../utils/helperFunctions'
import { LoadingButton } from '@mui/lab'
import { Boardgame } from '../types/types'

export interface UpdateBoardgameProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    updateBoardgame: (boardgame: Boardgame) => void;
}


export const UpdateBoardgame: FC<UpdateBoardgameProps> = (props) => {
    const { open, setOpen } = props
    const [error, setError] = useState<string | null>(null)
    const [game] = useState<Boardgame>({} as Boardgame)

    useEffect(() => {
        return;
    }, [])

    const formik = useFormik({
        initialValues: {
            title: game.title,
            minPlayers: game.minPlayers,
            maxPlayers: game.maxPlayers,
            minPlayTime: game.minPlayTime,
            maxPlayTime: game.maxPlayTime,
            rating: game.rating,
        },
        validationSchema: yup.object({
            name: yup.string(),
            species: yup.string(),
            sex: yup.string(),
        }),
        onSubmit: () => {
            setError(null)
            //Post to firebase
        },
    })

    return (
        <Dialog open={open}>
            <Card>
                <CardContent>
                    <Stack gap='2rem' justifyContent='center'>
                        <Stack>
                            <IconButton
                                sx={{
                                    alignSelf: 'flex-start',
                                }}
                                onClick={() => setOpen(false)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography
                                variant='h4'
                                align='center'
                                width='100%'
                                sx={{ mr: 7, mt: 2 }}
                            >
                                Update Game
                            </Typography>
                        </Stack>
                        <TextField
                            {...formikTextFieldProps(formik, 'title', 'Title')}
                            helperText={
                                formik.touched.title && formik.errors.title
                            }
                        />
                        <TextField 
                            {...formikTextFieldNumberProps(formik, 'minPlayers', 'Min Players')}
                            helperText={
                                formik.touched.minPlayers && formik.errors.minPlayers
                            }
                        />
                        <TextField 
                            {...formikTextFieldNumberProps(formik, 'maxPlayers', 'Max Players')}
                            helperText={
                                formik.touched.maxPlayers && formik.errors.maxPlayers
                            }
                        />
                        <TextField
                            {...formikTextFieldNumberProps(formik, 'minPlayTime', 'Min Play Time')}
                            helperText={
                                formik.touched.minPlayTime && formik.errors.minPlayTime
                            }
                        />
                        <TextField
                            {...formikTextFieldNumberProps(formik, 'maxPlayTime', 'Max Play Time')}
                            helperText={
                                formik.touched.maxPlayTime && formik.errors.maxPlayTime
                            }
                        />
                        <TextField
                            {...formikTextFieldNumberProps(formik, 'rating', 'Rating')}
                            helperText={
                                formik.touched.rating && formik.errors.rating
                            }
                        />
                        {error && (
                            <Alert severity='error' sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </Stack>
                    <Stack
                        direction='row'
                        justifyContent='center'
                        sx={{
                            mt: 2,
                        }}
                    >
                        <LoadingButton
                            variant='contained'
                            onClick={formik.submitForm}
                            loading={formik.isSubmitting}
                        >
                            Update
                        </LoadingButton>
                    </Stack>
                </CardContent>
            </Card>
        </Dialog>
    )
}

export default UpdateBoardgame
