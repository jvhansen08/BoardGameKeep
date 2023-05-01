import { useEffect } from "react";
import { CreateAccount } from "./pages/CreateAccount";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { MyGames } from "./pages/MyGames";
import AppHeader from "./components/AppHeader";
import { Root } from "./pages/Root";
import { NearbyStores } from "./pages/NearbyStores";
import { PickGame } from "./pages/PickGame";
import { Profile } from "./pages/Profile";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/my-games",
        element: <MyGames />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/pick-game",
        element: <PickGame/>,
      },
      {
        path: "/nearby-stores",
        element: <NearbyStores/>,
      },
      {
        path: "",
        element: <LandingPage />,
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
