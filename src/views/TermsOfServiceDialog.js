import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  termsConditionsListitem: {
    marginLeft: theme.spacing(3),
    // marginBottom: theme.spacing(1),
  },
  dialogActions: {
    justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),    
  },
  backIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function TermsOfServiceDialog(props) {  
  const classes = useStyles();

  let { open, onClose} = props;
  
  return (
    <div>
    <Dialog open={open} scroll="paper" onClose={onClose} hideBackdrop maxWidth="md">
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <Typography variant="h6" color="primary" >
          ARTIST LICENSING AGREEMENT
        </Typography>
        <Typography paragraph>
        This Artist Licensing Agreement (the “AGREEMENT”) is entered into effective at the time of portal signup, between you, the (“Artist”) and Cbd Palette LLC. (“Client”), individually a “party” or collectively the “Parties”. All references to the Client in this Agreement shall include Client’s parent companies, affiliates, and subsidiaries, including Palette and Palette Market.
        </Typography>
        <Typography variant="h6" color="primary">
          Scope of this Agreement.
        </Typography>
        <Typography paragraph>
          This Agreement applies to any image, graphics, digital assets, or digital images created or taken by Artist and uploaded or delivered to the Client (collectively known as “Images”). This Agreement governs the relationship between the parties and no communication or other exchange, shall modify the terms of this Agreement unless agreed to in writing.
        </Typography>
        <Typography variant="h6" color="primary">
          Rights:
        </Typography>
        <Typography paragraph>
          This license provides the Client with the limited right to reproduce, publicly display, and distribute the Images in accordance with the terms as set forth below. Images may not be used for any other purpose except with the express written permission of Artist (e.g. e-mail) and may include the payment of additional fees. Images may contain copyright management information (CMI) at the discretion of the Artist in the form of either 1) a copyright notice © and/or 2) other copyright and ownership information embedded in the metadata or elsewhere, unless otherwise agreed to by the Parties.
        </Typography>
        <Typography variant="h6" color="primary" paragraph>
          Image Uses
        </Typography>
        <Typography variant="h6" color="primary" className={classes.termsConditionsListitem}>
          Art Prints:
        </Typography>
        <Typography className={classes.termsConditionsListitem}>
          Art Images will be uploaded by the Artist, and will be printed and fulfilled currently on 5x7 and 9x12 size formats. These sizes are subject to change.  The Artist can choose to display up to 50 art designs for sale on Palette’s website. The Parties acknowledge that there may be additional editing required that will need artist collaboration and feedback in order to ensure proper image quality for final product. These art prints will be sold on Palette Market. Artist will have the right to determine the price of his/her work, a title and description of their work, and any additional identifying information.   
        </Typography>
        <Typography variant="h6" color="primary" className={classes.termsConditionsListitem}>
          Social Media:
        </Typography>
        <Typography className={classes.termsConditionsListitem}>
          Art Images to be posted on Palette’s social media pages using images selected by the Client. Artist Instagram or other social handle will be tagged in Palette Instagram post with a link to Artist Social Media Account. 
        </Typography>
        <Typography variant="h6" color="primary" className={classes.termsConditionsListitem}>
          Artist Profile: 
        </Typography>
        <Typography className={classes.termsConditionsListitem} paragraph>
          An image of the artist and other select images for the artist biography page are required, and will be shown on https://Palettemarket.com. Additional information such as hometown, Instagram handle, and type of artist will be data points collected and showcased on the Artist Profile page. 
        </Typography>
        <Typography variant="h6" color="primary">
          Relationship of the Parties:
        </Typography>
        <Typography paragraph>
          The parties agree that Artist is an independent contractor, and that neither Artist, nor Artist’s employees or contract personnel are, or shall be deemed to be, employees of Client. No agency, partnership, joint venture, or employee-employer relationship is intended or created by this Agreement. Neither party is authorized to act as agent or bind the other party except as expressly stated in this Agreement. 
        </Typography>
        <Typography variant="h6" color="primary">
          Intellectual Property.
        </Typography>
        <Typography paragraph>
          Artist and the Images or any other deliverables prepared by Artist shall not be deemed a work for hire as defined under Copyright Law. Artist retains all intellectual rights in the Images. Client is not granted any intellectual property rights hereunder other than the license rights granted herein.
        </Typography>
        <Typography variant="h6" color="primary">
          Creation:
        </Typography>
        <Typography paragraph>
          The manner and method of creating any Image is solely at the discretion of Artist. If the image quality is deemed subpar by the Client’s quality control team, (e.g. low quality dots per inch (DPI)), the Client will provide feedback to the Artist and Artist will use his/her best efforts to: (a) ensure that the Images conform to Client’s specifications; and (b) submit all Images to Client in publishable quality, on or before the applicable deadlines.
        </Typography>
        <Typography variant="h6" color="primary">
          Delivery:
        </Typography>
        <Typography paragraph>
          Artist may select delivery of photographs in JPEG, TIFF, PNG, or other standard format, at a resolution that Artist determines will be suitable for the Images as licensed. It is the Client's responsibility to verify that the Images are suitable for reproduction and to notify the Artist with ten (10) business days if the Images are not deemed suitable. Unless otherwise agreed by the Parties, Artist is not responsible to provide images 1) larger than 9”x12” at 300+ dpi or 2) in a format higher than 8-bit or in RAW format. Artist has no obligation to retain or archive any Images delivered to Client. 
        </Typography>
        <Typography variant="h6" color="primary">
          Fees:
        </Typography>
        <Typography paragraph>
          All fees and expenses payable under this agreement are due to be paid within thirty (30) business days from the sale of an individual order. Please Review Exhibit 1 for more information on Fees.
        </Typography>
        <Typography variant="h6" color="primary">
          Cancellation, Effect of Termination:
        </Typography>
        <Typography paragraph>
          If Client wishes to take their work off of Palette Market, they will notify info@palettemarket.com and requests will be handled within seven (7) business days. In such event, the all Images in the possession of Client will be removed from all forms of media and permanently destroyed within ten (10) days. Upon request, Client shall provide Artist with a written statement that all images have been removed and destroyed.
        </Typography>
        <Typography variant="h6" color="primary">
          No Exclusivity:
        </Typography>
        <Typography paragraph>
          This Agreement does not create an exclusive relationship between the Parties. Client is free to engage others to perform services of the same or similar nature to those provided by Artist, and Artist shall be entitled to offer and provide services to others, solicit other clients and otherwise advertise the services offered by Artist. 
        </Typography>
        <Typography variant="h6" color="primary">
          Limitation of Liability.
        </Typography>
        <Typography paragraph>
          Excepting for a misappropriation of the other Party’s intellectual property rights, or for gross negligence, willful misrepresentation or fraud, neither Party shall be liable for any indirect, special, punitive or consequential damages hereunder.
        </Typography>
        <Typography variant="h6" color="primary">
          General Law/Arbitration:
        </Typography>
        <Typography paragraph>
          This Agreement sets forth the entire understanding of the parties, and supersedes all prior agreements between the parties. This Agreement shall be governed, interpreted and enforced in accordance with the laws of the State of Georgia. Any claim or litigation arising out of this Agreement or its performance may be commenced only in courts physically located in Dekalb County, Georgia and the parties hereby consent to the personal jurisdiction of such courts. In the event of any litigation arising out of or relating to this Agreement, the prevailing party shall be entitled to recover its attorneys’ fees incurred in the litigation. If the Parties are unable to resolve the dispute, either Party may request mediation prior to bringing a suit in a forum mutually agreed to by the Parties. 
        </Typography>
        <Typography variant="h6" color="primary">
          Severability:
        </Typography>
        <Typography paragraph>
          If one or more of the provisions in the Agreement is found invalid, illegal or unenforceable in any respect, the validity and enforceability of the remaining provisions shall not be affected. Any such provisions will be revised as required to make them enforceable.
        </Typography>
        <Typography variant="h6" color="primary">
          Waiver:
        </Typography>
        <Typography paragraph>
          No action of either Party, other than in writing agreed to by the Parties, may be construed to waive any provision of this Agreement and a single or partial exercise by either Party of any such action will not preclude further exercise of other rights or remedies in this Agreement.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>          
        <Button onClick={onClose} variant="contained" color="primary">
          <ArrowBackIcon className={classes.backIcon} />
          Back
        </Button>          
      </DialogActions>
    </Dialog>
  </div>
  );
}