import React, { useState, useRef, useCallback } from "react";
import axios from 'axios'
import format from "date-fns/format";
import { makeStyles } from '@material-ui/core/styles';
import { GridListTileBar, GridListTile, Menu, MenuItem, ListItemIcon, ListItemText, Dialog } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CheckToken from "../help/helper";
import EditArtwork from "../views/EditArtwork";
import ButtonCircularProgress from "./ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    paddingTop: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  icon: {
    color: 'white'
  }
}));

export default function SelfAligningImage(props) {
  const classes = useStyles()
  const {
    src,
    title,
    total_price,
    count,
    roundedBorder,
    theme,
    yet,
  } = props;
  const img = useRef();
  const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onLoad = useCallback(() => {
    if (img.current.naturalHeight < img.current.naturalWidth) {
      setHasMoreWidthThanHeight(true);
    } else {
      setHasMoreWidthThanHeight(false);
    }
    setHasLoaded(true);
  }, [img, setHasLoaded, setHasMoreWidthThanHeight]);

  return (
    <div className={classes.imageContainer}>
      <img
        style={{
          height: hasMoreWidthThanHeight ? "100%" : "auto",
          width: hasMoreWidthThanHeight ? "auto" : "100%",
          display: hasLoaded ? "block" : "none",
          borderRadius: roundedBorder ? theme.shape.borderRadius : 0,
        }}
        ref={img}
        className={classes.image}
        onLoad={onLoad}
        src={src}
        alt=""
      />
      {yet ? <GridListTileBar
          title={title}
          subtitle={yet}
        />
        : <GridListTileBar
        title={title}
        subtitle={`$${total_price.toFixed(2)} - ${count} customers`}
      />
      }
    </div>
  );
}
