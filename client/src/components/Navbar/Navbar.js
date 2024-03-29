import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";

import { jwtDecode } from 'jwt-decode';

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import memoriesLogo from "./../../images/memoriesLogo.png";
import memoriesText from "./../../images/memoriesText.png"
import { Link } from "react-router-dom";
function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(user);


  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp *1000 < new Date().getTime())logout();
        }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
       <img src={memoriesText} alt="Memories Text" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              {/* <Avatar
                className={classes.purple}
                alt={user.result.givenName}
                src={user.result.imageUrl}
              >
                {user.result.givenName}
              </Avatar> */}
              <Typography className={classes.userName} variant="h6">
                {user?.result?.name}{" "}
              </Typography>
              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      
    </AppBar>
  );
}

export default Navbar;
