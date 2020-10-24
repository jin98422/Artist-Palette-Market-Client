import React, { useState, useRef, useCallback } from "react";
import axios from 'axios'
import format from "date-fns/format";
import { makeStyles } from '@material-ui/core/styles';
import { GridListTileBar, Menu, MenuItem, ListItemIcon, ListItemText, Dialog } from "@material-ui/core";
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
    timeStamp,
    roundedBorder,
    theme,
    pro_id,
    refresh
  } = props;
  const img = useRef();
  const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLoad = useCallback(() => {
    if (img.current.naturalHeight < img.current.naturalWidth) {
      setHasMoreWidthThanHeight(true);
    } else {
      setHasMoreWidthThanHeight(false);
    }
    setHasLoaded(true);
  }, [img, setHasLoaded, setHasMoreWidthThanHeight]);

  const onEdit = () => {
    setAnchorEl(null);
    setOpenEdit(true)
  }

  const onDelete = () => {
    CheckToken();
    setIsDeleting(true)
    axios.get(`${window.$host}/artwork/delete?id=${pro_id}`).then(res => {
       if(res.status === 200) {
         refresh()
       } else {
         alert("fail! try again")
         setIsDeleting(false)
       }      
    }).catch(err => {
      alert("fail! try again")
      setIsDeleting(false)
    })
  }

  const handleEditClose = () => {
    refresh()
    setOpenEdit(false)
  }

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
      {title && (
        <GridListTileBar
          title={title}
          subtitle={format(new Date(timeStamp), 'MMM dd yyyy-HH-mm')}
          actionIcon={
              <div>                
                <IconButton  onClick={handleClick}  aria-label={`Edit/Delet your aritst`}>                
                  <MoreVertIcon className={classes.icon}/>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={onEdit}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                  <MenuItem onClick={onDelete}>
                    <ListItemIcon>
                    {isDeleting ? <ButtonCircularProgress /> : <DeleteIcon fontSize="small" />}                      
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </MenuItem>
                </Menu>
              </div>
          }
        />
      )}
       <Dialog fullScreen open={openEdit}>
            <EditArtwork handleClose={handleEditClose} pro_id={pro_id} />
          </Dialog>
    </div>
  );
}
