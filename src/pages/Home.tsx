import { FC, useEffect } from "react";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};
