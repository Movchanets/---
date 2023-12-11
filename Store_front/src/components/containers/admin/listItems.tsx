import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import { Divider, ListSubheader } from "@mui/material";


export const AdminMenu = (
  <React.Fragment>
    <Link to="">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/admin/users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link to="/admin/products">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
    <Link to="/admin/category">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
 
    
    <Link to="/admin/orders">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
       
    <Link to="/admin/Filter">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Filters" />
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1, backgroundColor: "black" }} />

 
  </React.Fragment>
);

export const HelloAdmin = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <h1>Hello Admin</h1>
     
    </div>
  );
};
