import React, { useState, useEffect } from "react";
import decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone'
import axios from "axios";
import {
  Grid,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  TextField,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel
} from "@material-ui/core";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'
import Header from "../components/Header";
import CheckToken from "../help/helper";
import Photo from "../images/photo.jpg"

const useStyles = makeStyles((theme) => ({
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  empty: {
    padding: theme.spacing(2)
  },
  photo: {
    width: "100%",
    borderRadius: "50%"
  },
  paragraph: {
    marginTop: theme.spacing(1)
  },
  content: {
    overflow: "hidden"
  },
  place: {
    width: "100%",
    padding: "18.5px 14px",
    background: "transparent",
    boxShadow: "none",
    border: "1px solid #c0c0c0",
    borderRadius: "4px",
    font: "inherit",
    "&:enabled:focus": {
      border: "2px solid #3f51b5",
      outline: "none"
    }
  }
}));

export default function Home() {
  const classes = useStyles();
  
  const [previewEmail, setPreEmail] = useState("")
  const [photo, setPhoto] = useState([]);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("")
  const [instagram, setInstagram] = useState("")
  const [hometown, setHomeTown] = useState("")
  const [website, setWebsite] = useState("")
  const [about, setAbout] = useState("")
  const [file, setFile] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      const token = localStorage.getItem("token");
      const decodedToken = decode(token);
      setFirstName(decodedToken.first_name)
      setLastName(decodedToken.last_name)
      setEmail(decodedToken.email)
      setPreEmail(decodedToken.email)
      if(CheckToken()) {
        axios.post(`${window.$host}/user`, {email: decodedToken.email}).then(res => {
          console.log(res)
          let userData = res.data;
          console.log("userdata", userData)
          if(userData.path) setFile(userData.path)
          if(userData.data.first_name) setFirstName(userData.data.first_name)
          if(userData.data.last_name) setLastName(userData.data.last_name)
          if(userData.data.email) setEmail(userData.data.email)
          if(userData.data.type) setType(userData.data.type)
          if(userData.data.instagram) setInstagram(userData.data.instagram)
          if(userData.data.hometown) setHomeTown(userData.data.hometown)
          if(userData.data.website) setWebsite(userData.data.website)
          if(userData.data.about) setAbout(userData.data.about)
        })
      }
  }, [])

  const handleEdit = () => {
      console.log("edit")
  }

  const handlePhotoFiles = (files) => {
    console.log(files)
    setPhoto(files)
  }

  const getLatLngForMarker = (address) => {
    console.log(address);
    setHomeTown(address.description)
  };

  const handleEditor = content => {
    setAbout(content)
  }

  const loginFormSubmit = (e) => {
    e.preventDefault()
    if(CheckToken()) {
      const formData = new FormData();
      formData.append("file", photo[0]);
      formData.append("preEmail", previewEmail)
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("type", type);
      formData.append("instagram", instagram);
      formData.append("hometown", hometown);
      formData.append("website", website);
      formData.append("about", about);
      axios.post(`${window.$host}/user/update`, formData).then(res => {
        console.log(res.data)
        if(res.data.data !== "") setFile(res.data.data)
        setOpen(false);  
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <div>
      <Header openDialog={false} title="Your Profile"/>
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">{firstName} {lastName}</Typography>
                <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
                >
                Edit your profile
                </Button>
            </Toolbar>
            <Divider />
            <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={12} sm={6} md={3} >
                  {file? <img className={classes.photo} src={"data:image/png;base64," + file} />
                  : <img className={classes.photo} src={Photo} />}
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                  <Typography variant="h6" color="primary" className={classes.paragraph} >
                    Email
                  </Typography>
                  <Typography variant="subtitle1">
                    {email}
                  </Typography>
                  <Typography variant="h6" color="primary" className={classes.paragraph} >
                    Artist Type
                  </Typography>
                  <Typography variant="subtitle1">
                    {type}
                  </Typography>
                  <Typography variant="h6" color="primary" className={classes.paragraph} >
                    Instagram
                  </Typography>
                  <Typography variant="subtitle1">
                    {instagram}
                  </Typography>
                  <Typography variant="h6" color="primary" className={classes.paragraph} >
                    Hometown
                  </Typography>
                  <Typography variant="subtitle1">
                    {hometown}
                  </Typography>
                  <Typography variant="h6" color="primary" className={classes.paragraph} >
                    Website
                  </Typography>
                  <Typography variant="subtitle1">
                    {website}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                 <Typography variant="h6" color="primary" className={classes.paragraph} >
                    About
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: about }} />
                </Grid>
              </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <form onSubmit={loginFormSubmit}>
              <DialogTitle id="form-dialog-title">Edit your profile</DialogTitle>
              <DialogContent className={classes.content}>
                <Grid container className={classes.grid} spacing={2}>
                  <Grid item xs={12} >
                    <DropzoneArea
                      acceptedFiles={['image/png, .jpg, .jpeg']}
                      dropzoneText={"Drag and drop your profile photo"}
                      filesLimit={1}
                      onChange={handlePhotoFiles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value)
                          }}
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
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value)
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"
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
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="type"
                          label="Type of Artist"
                          name="type"
                          autoComplete="type"
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value)
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="instagram"
                          label="Instagram Handle(use @)"
                          name="instagram"
                          autoComplete="instagram"
                          value={instagram}
                          onChange={(e) => {
                            setInstagram(e.target.value)
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{zIndex: '99'}}>
                    <GooglePlacesAutocomplete
                      inputClassName={classes.place}
                      onSelect={getLatLngForMarker}
                      placeholder="Hometown *"
                      initialValue={hometown}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"               
                          fullWidth
                          id="website"
                          label="Website"
                          name="website"
                          autoComplete="website"
                          value={website}
                          onChange={(e) => {
                            setWebsite(e.target.value)
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormLabel component="legend">Tell Us About Yourself</FormLabel>
                    <SunEditor
                        setOptions={{
                            plugins: plugins,
                            buttonList: [
                                ['undo', 'redo'],
                                ['fontSize', 'formatBlock'],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                ['removeFormat'],
                                ['fontColor', 'hiliteColor'],
                                ['indent', 'outdent'],
                                ['align', 'horizontalRule', 'list', 'table'],
                                ['link'],
                                ['fullScreen', 'showBlocks', 'codeView'],
                                ['preview', 'print']
                            ],
                        }}
                        setContents={about}
                        onChange={handleEditor}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" olor="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
              </form>
            </Dialog>
        </Paper>
      </Container>
    </div>      
  );
}
