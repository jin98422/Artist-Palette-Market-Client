import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center"
    },
}));

export default function AlertDialog(props) {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.title} id="alert-dialog-title">{"Before you upload"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    - Uploaded artwork needs to be no less than 300dpi.<br />
                    - For painters and other physical mediums: please upload a high-quality photograph using proper, even lighting, or a scan.<br />
                    - All art is printed on Neenah Classic Crest, Forest Stewardship Council (FSC) Certified, carbon neutral paper made with 100% renewable energy. Finished on Eggshell Digital and a Super Heavy Weight.<br />
                    - All Photographs are printed on high quality Canon SG-201 Photo Paper Plus Semi-Gloss.<br />
                    - Images will be cropped to print on 5x7 and/or 9x12 dimensions. If your image is not cropped to fit our print sizes, our in-house editor will crop and send back to you for approval.<br />
                    - For examples of how your work will be presented, please visit <a href="https://palettemarket.com/collections/art-prints" target="_blank">Palette’s Print Shop</a>.<br />
                    - Artwork should be saved as CMYK.<br />
                    - All Artwork is printed by Palette’s Print Shop and will have your name and the artwork title listed on the back with the Palette stamp on the back as well.<br />
                    - You may price your artwork as you so choose, but be realistic!<br />
                    - Your artwork will be available for purchase on-demand once it has been approved by our staff (generally within 24 hours).<br />
                    - Please reach out to <a href="mailto:info@palettemarket.com">info@palettemarket.com</a> with any questions regarding artwork or our process.<br />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
