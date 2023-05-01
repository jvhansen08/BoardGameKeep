import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { FC, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { User } from "firebase/auth";
import { AuthPaths } from "../types/types";

export const Root: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if(!Object.values(AuthPaths).some((path) => location.pathname === path) && user) {
        navigate("/my-games");
      }
    });
  }, [navigate]);

  return (
    <>
      {user && <AppHeader />}
      <Outlet />
    </>
  );
};
