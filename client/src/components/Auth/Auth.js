import { React, useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";

import icon from "./icon";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";

const Auth = () => {
  const classes = useStyles();

  const [isSignup, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later!");
  };
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id:
          "543257735253-rn3qi9l3tbj2mbm0bo47519v63pnihvc.apps.googleusercontent.com",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? <strong>Sign up</strong> : <strong>Sign in</strong>}
          </Button>
          <GoogleLogin
            clientId="543257735253-rn3qi9l3tbj2mbm0bo47519v63pnihvc.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? (
                  <strong>Already have an account? Sign In</strong>
                ) : (
                  <strong>Dont have an account? Sign up!</strong>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
