import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { AdminMenu } from "./listItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const AdminLayout: React.FC = () => {
  const [anchorEl, setAnchorEl]: any = useState(null);
  const openProfileMenu = Boolean(anchorEl);
  const { isAuth, user } = useTypedSelector((store) => store.login);
  const { Logout } = useActions();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const isAdmin = user?.roles.toLocaleString().includes("administrator");

    if (!isAuth || !isAdmin) navigate("/sign-in");
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      {isAuth && user?.roles.toLocaleString().includes("administrator") && (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography component="h1" noWrap sx={{ flexGrow: 0.5 }}>
                <Link to="/admin" style={{ textDecoration: "none" }}>
                  <Typography variant="h5" color="white">
                    Booking_Clone
                  </Typography>
                </Link>
              </Typography>

              <Typography variant="h6" noWrap sx={{ flexGrow: 9 }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography color="white">Back to main site</Typography>
                </Link>
              </Typography>
              <div>
                {""}
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleIcon style={{ color: "white" }} />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openProfileMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem component={Link} to={"admin/profile"}>
                    {" "}
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      Logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {/* {user.role === "Administrators" && adminMenu}} */}

              {AdminMenu}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Box sx={{ width: "100%", height: "90vh" }}>
              <Box component="main" sx={{ width: "100%", display: "flex" }}>
                <Box
                  sx={{
                    px: { xs: 3, sm: 5 },
                    py: { xs: 1, sm: 2 },
                    width: "100%",
                  }}
                >
                  <Outlet />
                </Box>
              </Box>
            </Box>
          
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default AdminLayout;
