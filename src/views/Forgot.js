import React, { useState, useRef, useEffect } from "react";
import decode from 'jwt-decode';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import axios from "axios";
import {
    Box,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    FormHelperText
} from '@material-ui/core';
import ButtonCircularProgress from "../components/ButtonCircularProgress";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import Header from "../components/Header";
import SignlogoImg from '../images/sign-logo.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Palette Market '}
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
}));

export default function Forgot() {
  const classes = useStyles();
  const history = useHistory();
  const { verify } = useParams();

  const [forgot, setForgot] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [hasPasswordMatchError, setHasPasswordMatchError] = useState(false);
  const [isForgotFail, setForgotFail] = useState(false)
  const [enable, setEnable] = useState(false);
  const [buttonText, setButtonText] = useState('')
  const [sendSuccess, setSendSuccess] = useState(false)

  const forgotEmail = useRef();
  const forgotPassword = useRef();
  const forgotPasswordRepeat = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null || token === "") {
      setForgot(true)
    } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          setForgot(true)
        } else {
          window.location.href="/"
        }
    }
    if(verify) {
      setEnable(true)
      setButtonText('Rest Password and Login')
    } else {
      setEnable(false)
      setButtonText('Send Password reset email')
    }
  }, [])

  const forgotFormSubmit = (e) => {
    setForgotFail(false);
    setSendSuccess(false)
    e.preventDefault()
    setIsLoading(true);
    if(verify) {
      if (forgotPassword.current.value !== forgotPasswordRepeat.current.value) {
          setHasPasswordMatchError(true);
          setIsLoading(false);
          return;
      }
      let decoded = decode(verify);
      axios.post(`${window.$host}/user/reset`, {
        email: decoded.email,
        password: forgotPassword.current.value
      }).then(res => {
        console.log(res.status)
          setIsLoading(false);
          history.push("/login")
      }).catch(err => {
          setIsLoading(false);
          setForgotFail(true)
      })
    } else {
      axios.post(`${window.$host}/user/forgot`, {
        email: forgotEmail.current.value,
      }).then(res => {
        console.log(res.status)
          setIsLoading(false);
          setSendSuccess(true)
      }).catch(err => {
          setIsLoading(false);
          setForgotFail(true)
      })
    }
    
    
    
  }

  return (
    forgot && <div>
        <Header openDialog={false} title="Forgot"/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />            
            <div className={classes.paper}>
                <img src={SignlogoImg} />
                <Typography component="h1" variant="h5">
                    Reset Your Password
                </Typography>
                <form className={classes.form} onSubmit={forgotFormSubmit}>
                {isForgotFail && <Alert severity="error">Something went wrong. Please try again.</Alert>}
                {sendSuccess && <Alert severity="success">Reset Email sent your email address. please check your email and link follow</Alert>}
                    <Grid container spacing={2}>
                        { !enable && <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                inputRef={forgotEmail}
                            />
                        </Grid>}
                        { enable && <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={forgotPassword}
                                error={hasPasswordMatchError}
                                onChange={() => {
                                    if (forgotPassword.current.value === forgotPasswordRepeat.current.value) {
                                        setHasPasswordMatchError(false);
                                    }
                                }}
                            />
                        </Grid> }
                        { enable && <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                error={hasPasswordMatchError}
                                name="repeatPassword"
                                label="Repeat Password"
                                type="password"
                                id="repeatPassword"
                                autoComplete="current-repeat-password"
                                inputRef={forgotPasswordRepeat}
                                onChange={() => {
                                    if (forgotPassword.current.value === forgotPasswordRepeat.current.value) {
                                        setHasPasswordMatchError(false);
                                    }
                                }}
                            />
                            {hasPasswordMatchError && (
                                <FormHelperText
                                  error
                                >
                                Your passwords don't match.
                                </FormHelperText>
                            )}
                        </Grid>}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {buttonText}
                        {isLoading && <ButtonCircularProgress />}
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item xs>
                      <Link href="/login" variant="body2">
                          {"Sign in?"}
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
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
     </div>   
  );
}
