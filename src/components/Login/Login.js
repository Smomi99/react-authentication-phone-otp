import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import login from "../../images/undraw_Mobile_login_re_9ntv.png";
const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, isLoading, authError } = useAuth();
  // const location = useLocation();
  // const history = useHistory();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password);
    e.preventDefault();
  };
  const handleGoogleSignIn = () => {
    // signInWithGoogle(location, history);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={login} style={{ width: "120%" }} alt="" />
        </Grid>
        <Grid sx={{ mt: 8 }} item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Email"
              name="email"
              type="email"
              onChange={handleOnChange}
              variant="standard"
            />
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Password"
              name="password"
              onChange={handleOnChange}
              variant="standard"
              type="password"
            />

            <Button
              sx={{ width: "75%", m: 1 }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
            <NavLink
              sx={{ width: "75%", m: 1 }}
              style={{ textDecoration: "none" }}
              to="/register"
            >
              <Button variant="text">New User? Please Register !</Button>
            </NavLink>

            {isLoading && <CircularProgress />}
            {user?.email && (
              <Alert severity="success">User login Successfully !</Alert>
            )}
            {authError && <Alert severity="error">{authError}</Alert>}
          </form>
          <p>----------------OR-------------</p>
          <Link to="/phonesignup">
            <Button variant="contained">Sign In with Phone</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
