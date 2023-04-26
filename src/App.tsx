import "./App.css";
import { CreateAccount } from "./pages/CreateAccount";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
    ],
  },
]);

function App() {
    useEffect(() => {
        console.log("Hello World");
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=games&location=41.7759,-111.8068&radius=50000&key=AIzaSyCjjeTkUXYJ_HafVKsfPkmBHwJ3GM1AYDQ")
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
