import React, { useState, useRef, useEffect } from "react";
import decode from 'jwt-decode';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
    Box,
    Divider,
    Button,
    CssBaseline,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Link,
    MenuItem,
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
  divider: {
    width: "100%",
    backgroundColor: "#3c4d34",
    marginTop: theme.spacing(1)
  },
  select: {
    height: '56px',
  },
  confirm: {
    fontStyle: 'italic'
  }
}));

export default function Thanks() {
  const classes = useStyles();
  const history = useHistory();
  const { verify } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('')
  const [payment, setPayment] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('')
  const [active, setActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", verify);
    let decoded = decode(verify);
    axios.post(`${window.$host}/user/check`,{
      email: decoded.email,
    }).then(res => {
      if(res.data.active) {
        history.push("/")
      } else {
        setActive(true)
        setEmail(decoded.email)
      }  
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const setInfo = (e) => {
    setIsLoginFail(false)
    e.preventDefault()
    setIsLoading(true);
    axios.post(`${window.$host}/user/setInfo`,{
      email: email,
      username: username,
      payment: payment
    }).then(res => {
          setIsLoading(false);
          axios.defaults.headers.common['Authorization'] = verify;
          history.push("/")
    }).catch(err => {
      if(err.response.status === 409) {
        setIsLoading(false);
        setError(true);
        setErrorText('This username is not available. Please choose another.')
      } else {
        setIsLoading(false);
        setIsLoginFail(true)
      } 
      console.log(err)
    })
  }

  return (
      ( active && <div>
          <Header openDialog={false} title="Login"/>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={SignlogoImg} />
                <Typography component="h1" variant="h5" className={classes.confirm}>
                  Your email was verified.
                </Typography>
                <Divider variant="fullWidth" className={classes.divider} />
                <form className={classes.form} onSubmit={setInfo}>
                {isLoginFail && <Alert severity="error">Some of your info isn't correct. Please try again.</Alert>}
                <Typography component="h4">
                  Add more info to get started
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    error={error}
                    helperText={errorText}
                    onChange={(e) => {
                      setUserName(e.target.value)
                    }}
                    autoFocus
                />
               <FormControl margin="dense" variant="outlined" required fullWidth>
                  <InputLabel id="payment-label">Payment Option</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="payment-label"
                    id="payment"
                    label="Payment Option"
                    value={payment}
                    onChange={(e) => {setPayment(e.target.value)}}
                  >
                    <MenuItem value="Paypal">Paypal</MenuItem>
                    <MenuItem value="Venmo">Venmo</MenuItem>
                  </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Set & Login
                    {isLoading && <ButtonCircularProgress />}
                </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
          </Container>
      </div> )
    )
}