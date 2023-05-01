import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useRouteMatch } from "../utils/helperFunctions";


export const RouterTabs = () => {
  const routeMatch = useRouteMatch([
    "/my-games",
    "/pick-game",
    "/nearby-stores",
    "/profile",
  ]);
  const currentTab = routeMatch?.pattern?.path;

  const tabs = [
      {
          label: "My Games",
          path: "/my-games",
        },
        {
            label: "Pick a Game",
            path: "/pick-game",
        },
        {
            label: "Nearby Stores",
            path: "/nearby-stores",
        },
        {
          label: "Profile",
          path: "/profile",
        },
  ];


  return (
    <Tabs value={currentTab ?? "/my-games"}>
      {tabs.map((tab) => (
        <Tab
          key={tab.path}
          label={tab.label}
          value={tab.path}
          to={tab.path}
          component={Link}
        />
      ))}
    </Tabs>
  );
};
