import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { FC, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import firebase from "firebase/compat/app";
import { User } from "firebase/auth";

export const Root: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
