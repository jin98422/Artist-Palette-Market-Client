import React, { useState, useRef, useEffect } from "react";
import decode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
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
    Container,
    FormHelperText
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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

export default function Register() {
  const classes = useStyles();
  const history = useHistory();

  const [register, setRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [hasPasswordMatchError, setHasPasswordMatchError] = useState(false);
  const [isRegisterFail, setRegisterFail] = useState(false)
  const [isUserExist, setIsUserExist] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const registerEmail = useRef();
  const registerFirstName = useRef();
  const registerLastName = useRef();
  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null || token === "") {
      setRegister(true)
    } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          setRegister(true)
        } else {
          window.location.href="/"
        }
    }
  }, [])

  const openTermsDialog = () => {
    setOpenTerm(true)
  }

  const closeTermsDialog = () => {
    setOpenTerm(false)
  }

  const registerFormSubmit = (e) => {
    setRegisterFail(false);
    setIsUserExist(false);
    setRegisterSuccess(false)
    e.preventDefault()   
    if (!registerTermsCheckbox.current.checked) {
        setHasTermsOfServiceError(true);
        return;
    }
    if (registerPassword.current.value !== registerPasswordRepeat.current.value) {
        setHasPasswordMatchError(true);
        return;
    }
    setIsLoading(true);
    axios.post(`${window.$host}/user/register`, {
      first_name: registerFirstName.current.value,
      last_name: registerLastName.current.value,
      email: registerEmail.current.value,
      password: registerPassword.current.value
    }).then(res => {
      console.log(res.status)
      if(res.status === 200) {
        setIsLoading(false);
        setRegisterSuccess(true)
        // localStorage.setItem("token", res.data.token);
        // axios.defaults.headers.common['Authorization'] = res.data.token;
        // history.push("/")
      }else {
        setIsLoading(false);
        setRegisterFail(true)
      }
    }).catch(err => {
      if(err.response.status === 409) {
        setIsLoading(false);
        setIsUserExist(true)
      } else {
        setIsLoading(false);
        setRegisterFail(true)
      }      
    })
  }

  return (
    register && <div>
        <TermsOfServiceDialog open={openTerm} onClose={closeTermsDialog} />
        <Header openDialog={false} title="Register"/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />            
            <div className={classes.paper}>
                <img src={SignlogoImg} />
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={registerFormSubmit}>
                {isRegisterFail && <Alert severity="error">Something went wrong. Please try again.</Alert>}
                {isUserExist && <Alert severity="error">You have already registered. Please try login.</Alert>}
                {registerSuccess && <Alert severity="success">Confirm Email sent your email address. please check your email and link follow</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                inputRef={registerFirstName}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={registerLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                inputRef={registerEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={registerPassword}
                                error={hasPasswordMatchError}
                                onChange={() => {
                                    if (registerPassword.current.value === registerPasswordRepeat.current.value) {
                                        setHasPasswordMatchError(false);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                inputRef={registerPasswordRepeat}
                                onChange={() => {
                                    if (registerPassword.current.value === registerPasswordRepeat.current.value) {
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
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allow" color="primary" inputRef={registerTermsCheckbox} />}
                                label={
                                    <Typography variant="body2">
                                        I agree to the
                                        <span
                                        className={classes.link}
                                        onClick={openTermsDialog}
                                        tabIndex={0}
                                        role="button"                                       
                                        >
                                        {" "}
                                        terms of service
                                        </span>
                                    </Typography>
                                } 
                            />
                            {hasTermsOfServiceError && (
                                <FormHelperText
                                error
                                >
                                In order to create an account, you have to accept our terms of
                                service.
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                        {isLoading && <ButtonCircularProgress />}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
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
