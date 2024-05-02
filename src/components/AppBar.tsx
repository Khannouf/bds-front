import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {  useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";


export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const  {user, setUser} = useUserContext();
  console.log(user)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disconnect = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  };

  return (
    <Box sx={{ flexGrow: 2, height: 64 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Toolbar>

          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography variant="h6" component="div" color={"primary.main"}>
              Bureau des Sports
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="Déconnexion"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={disconnect}
                color="inherit"
                sx={{ color: "#000" }}
              >
                <LogoutIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ color: "#000" }}
              >
                <AccountCircleIcon />
              </IconButton>
              {user?.role == "admin" ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <Link to={"/admin"} style={{ textDecoration: "none"}} color={"primary.main"}>
                  <MenuItem onClick={handleClose} sx={{color: "#000"}}>Admin</MenuItem>
                </Link>
              </Menu>
              ) : (
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
              </Menu>
              )}
            </>
          ) : (
            <>
              <Link to="/inscription">
                <IconButton
                  size="large"
                  aria-label="connexion"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  sx={{ color: "#000" }}
                >
                  <AppRegistrationIcon />
                </IconButton>
              </Link>
              <Link to="/connexion">
                <IconButton
                  size="large"
                  aria-label="connexion"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  sx={{ color: "#000" }}
                >
                  <LoginIcon />
                </IconButton>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
