import { Card, CircularProgress, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { StoreData } from "../types/types";

export const NearbyStores: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);
  const [stores, setStores] = useState<StoreData[]>([]);
  const [locationLoaded, setLocationLoaded] = useState<boolean>(false);
  const [storesLoaded, setStoresLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  function getStores(lat: number, lon: number) {
    // // this section is for the actual API call
    // let base =
    //   "https://us-central1-boardgamersparadise.cloudfunctions.net/getNearbyGameStores";
    // let params = `?latitude=${lat}&longitude=${lon}`;
    // let url = base + params
    // fetch(url)
    // .then(response => response.json())
    // .then(json => {
    //     setStores(json.data)
    //     setStoresLoaded(true)
    // }).catch(error => {
    //     setError(true)
    //     setStoresLoaded(true)
    //     console.log(error)
    // })
    
    // this section is for testing purposes only to avoid hitting the API limit
    console.log("lat: " + lat);
    console.log("lon: " + lon);
    setStoresLoaded(true)
    setStores([
        {
            name: "Board Game Barrister - Greenfield",
            address: "6120 W Layton Ave, Greenfield, WI 53220",
            rating: 4.5,
            numRatings: 139,
        },
        {
            name: "Board Game Barrister - Mayfair",
            address: "2500 N Mayfair Rd, Wauwatosa, WI 53226",
            rating: 3.7,
            numRatings: 240,
        },
        {
            name: "Board Game Barrister - Bayshore",
            address: "5800 N Bayshore Dr, Glendale, WI 53217",
            rating: 4.8,
            numRatings: 124,
        },
        {
            name: "Game Universe - Franklin",
            address: "6550 S Lovers Ln, Franklin, WI 53132",
            rating: 2.6,
            numRatings: 49,
        },
    ])

  }

  useEffect(() => {
    console.log("getting location");
    
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setLocationLoaded(true);
        getStores(location.coords.latitude, location.coords.longitude);
      },
      () => {
        setError(true);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <Stack alignItems={"center"} height={"90vh"}>
      {(!storesLoaded || !locationLoaded) && <CircularProgress />}
      {error && (
        <Typography>
          Something went wrong.
        </Typography>
      )}
      {stores.length === 0 && storesLoaded && <Typography>No stores found.</Typography>}
      <Stack spacing={2} width={"100%"} maxWidth={"640px"}>
        {stores.map((store, index) => (
            <Card key={index} style={{ padding: "16px" }}>
            <Typography variant="h5">{store.name}</Typography>
            <Typography variant="body1">{store.address}</Typography>
            <Typography variant="body1">
              {store.rating > 1 ? (
                <StarIcon fontSize="inherit" />
              ) : store.rating < 0.5 ? (
                <StarBorderIcon fontSize="inherit" />
              ) : (
                <StarHalfIcon fontSize="inherit" />
              )}
              {store.rating > 2 ? (
                <StarIcon fontSize="inherit" />
              ) : store.rating < 1.5 ? (
                <StarBorderIcon fontSize="inherit" />
              ) : (
                <StarHalfIcon fontSize="inherit" />
              )}
              {store.rating > 3 ? (
                <StarIcon fontSize="inherit" />
              ) : store.rating < 2.5 ? (
                <StarBorderIcon fontSize="inherit" />
              ) : (
                <StarHalfIcon fontSize="inherit" />
              )}
              {store.rating > 4 ? (
                <StarIcon fontSize="inherit" />
              ) : store.rating < 3.5 ? (
                <StarBorderIcon fontSize="inherit" />
              ) : (
                <StarHalfIcon fontSize="inherit" />
              )}
              {store.rating >= 5 ? (
                <StarIcon fontSize="inherit" />
              ) : store.rating < 4.5 ? (
                <StarBorderIcon fontSize="inherit" />
              ) : (
                <StarHalfIcon fontSize="inherit" />
              )}
              &nbsp;{store.rating} &nbsp;({store.numRatings} ratings)
            </Typography>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
