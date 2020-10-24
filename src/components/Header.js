import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import LogoImg from '../images/logo.png'
import logoImg from '../images/logo.png'
import logoMobileImg from '../images/logo-white.png'
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Dialog from '../components/Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#3c4d34",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  },
  help: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(props.openDialog)
  const open = Boolean(anchorEl);
  const [showMenu, setShowMenu] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null || token === "") {
      setAuth(false)     
    } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          setAuth(false)  
        } else {
          setAuth(true)
        }
    }
    window.addEventListener("resize", () => {
      console.log(window.innerWidth)
      setShowMenu(window.innerWidth )
    })   
  }, [])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = () => {
    setAnchorEl(null);
    history.push("/")
  }

  const handleOrder = () => {
    setAnchorEl(null);
    history.push("/order")
  }

  const handleProfile = () => {
    setAnchorEl(null);
    history.push("/profile")
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login")
  }

  const dialogClose = () => {
    setOpenDialog(false)
  }

  const dialogOpen = () => {
    setOpenDialog(true)
  }

  const menu = props.menu && (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    <MenuIcon />
    </IconButton>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          {menu}
          { showMenu > 1100 ? <img src={logoImg} /> : <img src={logoMobileImg} />}
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Typography color="inherit">{props.title}</Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={dialogOpen}
              >
                <HelpOutlineIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Dialog  open={openDialog} handleClose={dialogClose} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleUpload}>View uploads</MenuItem>
                <MenuItem onClick={handleOrder}>View orders</MenuItem>
                <MenuItem onClick={handleProfile}>View profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}