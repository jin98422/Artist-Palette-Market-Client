import React, { useState, useRef, useEffect } from "react";
import decode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
    Box,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import ButtonCircularProgress from "../components/ButtonCircularProgress";
import Header from "../components/Header";
import logoImg from '../images/logo.png'
import SignlogoImg from '../images/sign-logo.png'
import BackgroundImg from '../images/background.png'
import { el } from "date-fns/locale";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Palette Market
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    if(localStorage.getItem("isChecked")) {
      console.log(localStorage.getItem("isChecked"))
      setEmail(localStorage.getItem("email"))
      setPassword(localStorage.getItem("password"))
      setChecked(localStorage.getItem("isChecked"))
    }
    const token = localStorage.getItem("token");
    if(token === null || token === "") {
      setLogin(true)
    } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          setLogin(true)
        } else {
          window.location.href="/"
        }
    }
  }, [])

  const loginFormSubmit = (e) => {
    setIsLoginFail(false)
    setIsConfirm(false)
    e.preventDefault()
    setIsLoading(true);
    axios.post(`${window.$host}/user/login`,{
      email: email,
      password: password
    }).then(res => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        if(isChecked) {
          localStorage.setItem("email", email)
          localStorage.setItem("password", password)
          localStorage.setItem("isChecked", isChecked)
        }
        history.push("/")
    }).catch(err => {
      console.log(err)
      if(err.response.status === 401) {
        setIsLoading(false);
        setIsConfirm(true)
      } else {
        setIsLoading(false);
        setIsLoginFail(true)
      } 
    })
  }

  const handleChecked = () => {
    setChecked(!isChecked);
  }

  return (
    login && (
      <div>
          <Header openDialog={false} title="Login"/>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={SignlogoImg} />
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={loginFormSubmit}>
                {isLoginFail && <Alert severity="error">Some of your info isn't correct. Please try again.</Alert>}
                {isConfirm && <Alert severity="error">You need to confirm your account. We have already sent verify email. Please check your email.</Alert>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                />
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleChecked} value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                    {isLoading && <ButtonCircularProgress />}
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="/forgot" variant="body2">
                        {"Forgot Password?"}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
          </Container>
      </div> 
    )
  );
}