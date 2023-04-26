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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
