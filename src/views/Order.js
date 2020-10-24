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
import SelfAligningOrder from "../components/SelfAligningOrder";
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
  const [sales, setSales] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = () => { 
    if(CheckToken()) {
        let salesArr = [];
        axios.get(`${window.$host}/artwork`).then(res => {
          console.log(res.data)
            setArtworks(res.data)           
        })
        axios.get(`${window.$host}/artwork/orders`).then(res => {
            console.log(res.data.orders)
            let orders = res.data.orders;
            for(let i in orders) {
                let order = orders[i].line_items
                let pro_ids = [];
                for(let j in order) {
                    let item = order[j];
                    pro_ids.push(item.product_id)
                    let exist = false;
                    for(let k = 0; k<salesArr.length; k++) {
                        let sale = salesArr[k];
                        if(sale.product_id === item.product_id) {
                            salesArr[k].total_price = sale.total_price + parseFloat(item.price) * parseFloat(item.quantity);
                            exist = true;
                        }
                    }
                    if(!exist) {
                        salesArr.push({
                            product_id: item.product_id,
                            total_price: parseFloat(item.price) * parseFloat(item.quantity)
                        })
                    }                    
                }
                pro_ids = pro_ids.filter((elem, index, self) => {
                    return index === self.indexOf(elem)
                })
                pro_ids.map(id => {
                    for(let k = 0; k<salesArr.length; k++) {
                        let sale = salesArr[k];
                        if(sale.product_id === id) {
                            if(sale.count) {
                                salesArr[k]["count"] = sale.count + 1;
                            } else {
                                salesArr[k]["count"] = 1;
                            }
                            
                        }
                    }
                })
            }
            console.log(salesArr)
            console.log(artworks)
            setSales(salesArr)          
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
                {artworks.map((artwork) => {
                  let result = sales.find(sale => {
                    return sale.product_id === Number(artwork.product_id)
                  })                    
                  if(result) {
                    return (
                        <Grid item xs={6} sm={3} key={artwork._id}>
                          <SelfAligningOrder
                              src={artwork.file}
                              title={artwork.title}
                              total_price={result.total_price}
                              count={result.count}
                          />
                        </Grid>
                    )
                } else {
                    return (
                      <Grid item xs={6} sm={3} key={artwork._id}>
                        <SelfAligningOrder
                            src={artwork.file}
                            title={artwork.title}
                            yet="No ordered yet."
                        />
                      </Grid>
                    );
                }
                    
                })}
            </Grid>
          </Box>
      );
    }
    return (
    <Box m={2}>
        <Typography className={classes.empty}>
            No artworks added yet. Please &quot;ADD NEW Artwork&quot; to create your first one.
        </Typography>
    </Box>
    );
  }

  return (
    <div>
      <Header openDialog={false} title="Artwork Orders"/>
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Your Artworks Orders</Typography>
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
