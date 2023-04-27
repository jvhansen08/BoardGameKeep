import { FC, useEffect } from "react";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { DashboardGame } from "../components/dashboardGame";

const dummyData = [
  {
    id: 1,
    title: "Diceforge",
    minPlayers: 2,
    maxPlayers: 4,
    minPlayTime: 20,
    maxPlayTime: 45,
    rating: 9,
  },
  {
    id: 2,
    title: "Shadows over Camelot",
    minPlayers: 3,
    maxPlayers: 7,
    minPlayTime: 60,
    maxPlayTime: 120,
    rating: 8
  }
]

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

      <div>
        {dummyData.map((game) => (
          <div style={{ padding: "2px"}}>
            <DashboardGame {...game} />
          </div>
        ))}
      </div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};
