import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import HomeRounded from "@mui/icons-material/HomeRounded";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function NavigationMenu() {
  const navigate = useNavigate();

  const navigateTO = (url) => {
    navigate(url);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box>
      <List
        role="menubar"
        orientation="horizontal"
        className="d-block d-sm-flex userList-card-bg p-sm-3 justify-content-sm-center"
      >
        <ListItem role="none" className="col-6 col-sm-3 m-auto m-sm-0">
          <ListItemButton
            role="menuitem"
            className="d-flex justify-content-center"
            component="a"
            onClick={() => navigateTO("/userList")}
          >
            <ListItemDecorator>
              <HomeRounded />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>

        <ListItem role="none" className="col-6 col-sm-3 m-auto m-sm-0">
          <ListItemButton
            role="menuitem"
            className="d-flex justify-content-center"
            component="a"
            onClick={() => navigateTO("/addUser")}
          >
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Add Child
          </ListItemButton>
        </ListItem>

        <ListItem role="none" className="col-6 col-sm-3 m-auto m-sm-0">
          <ListItemButton
            role="menuitem"
            component="a"
            className="d-flex justify-content-center"
            onClick={logOut}
          >
            <ListItemDecorator>
              <LogoutIcon />
            </ListItemDecorator>
            Log Out
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
