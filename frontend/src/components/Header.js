import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { clearCart } from '../actions/cartActions';

const drawerWidth = 240;

const navItemsNoUser = [
  { title: "Shop", route: "/" },
  { title: "Login", route: "/login" },
  { title: "SignUp", route: "/register" },
];
const navItemsUser = [
  { title: "Shop", route: "/" },
  { title: "Orders", route: "/orders" },
];
const navItemsAdmin = [
  { title: "Products", route: "/" },
  { title: "Orders", route: "/orders" },
  { title: "Users", route: "/users" },
  { title: "Add Product", route: "/addProduct" },
];

const displayNavItems = (userType) => {
  if (!userType) return navItemsNoUser;
  if (userType === "user") return navItemsUser;
  if (userType === "admin") return navItemsAdmin;
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    dispatch(clearCart())
    dispatch(logout());
    navigate("/");
  };

  const navItemsToDisplay = displayNavItems(userLogin.userInfo?.role);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        S T E E L Y S H O P
      </Typography>
      <Divider />
      <List>
        {navItemsToDisplay.map((item) => {
          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} component={Link} to={item.route}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="relative">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              S T E E L Y S H O P
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" }, mr: 4 }}>
            {navItemsToDisplay.map((item) => (
              <Button
                key={item.title}
                sx={{ color: "#fff" }}
                component={Link}
                to={item.route}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          {userLogin.userInfo?.role !== "admin" && (
            <Box marginRight={"20px"}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </Box>
          )}
          {Object.keys(userLogin).length !== 0 && (
            <Button
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={logoutHandler}
              sx={{ ml: "auto" }}
              variant="outlined"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
