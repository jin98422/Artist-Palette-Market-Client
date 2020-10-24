import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
  Grid,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  Box,
  Container,
  CssBaseline,
  Dialog
} from "@material-ui/core";
import UploadArtwork from "./UploadArtwork";
import SelfAligningImage from "../components/SelfAligningImage";
import Header from "../components/Header";
import CheckToken from "../help/helper";

const useStyles = makeStyles((theme) => ({
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
  paper: {
    marginTop: theme.spacing(8)
  },
  empty: {
    padding: theme.spacing(2)
  }
}));

export default function Home() {
  const classes = useStyles();
  const [artworks, setArtworks] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => { 
    if(CheckToken()) {
      axios.get(`${window.$host}/artwork`).then(res => {
          setArtworks(res.data)           
      })
    }
  }

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleClose = () => {  
    getData();
    setOpenAdd(false)
  }

  const printImageGrid = () => {
    if (artworks.length > 0) {
      return (
          <Box p={1}>
            <Grid container spacing={1}>
                {artworks.map((artwork) => (
                    <Grid item xs={6} sm={3} key={artwork._id}>
                    <SelfAligningImage
                        src={ artwork.file }
                        title={artwork.title}
                        timeStamp={artwork.createdAt}
                        pro_id ={artwork.product_id}
                        refresh={getData}
                    />
                    </Grid>
                ))}
            </Grid>
          </Box>
      );
    }
    return (
    <Box m={2}>
        <Typography className={classes.empty}>
            No artworks added yet. Click on &quot;ADD NEW&quot; to create your first one.
        </Typography>
    </Box>
    );
  }

  return (
    <div>
      <Header openDialog={false} title="Your Artworks"/>
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Your Artworks</Typography>
              <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenAdd}
              >
              Add New
              </Button>
          </Toolbar>
          <Divider />
          {printImageGrid()}           
        </Paper>
        <Dialog fullScreen open={openAdd}>
          <UploadArtwork handleClose={handleClose} />
        </Dialog>
      </Container>
    </div>      
  );
}
