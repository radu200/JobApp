import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#3c6feb",
    color: "white",
    textAlign:"center",
    borderBottom:'1px solid white'
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#3c6feb",
    color: "white",
    textAlign:"center",
    padding: '10px', 
    
  },
  contentTitle:{
     marginBottom:'5px'
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#3c6feb",
    color: "white",
  },
}))(MuiDialogActions);

export default function ModalPremium({ open, handleClose, classes }) {
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Descoper Premium
        </DialogTitle>
        <DialogContent dividers>
          <Typography  variant="h5" >Mai multe locuri de muncă</Typography>
          <Typography variant="p">
            Postează mai multe locuri de muncă pe lună
          </Typography>
          <Typography style={{ marginTop: 16}} variant="h5">Chaturi Nelimitate</Typography>
          <Typography variant="p">
            Deblocați accesul la sute de candidați locali
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="h5">
            Gaseste si angajea-za mai rapid talente
          </Typography>
          <Typography variant="p">
            Postează mai multe locuri de muncă pe lună
          </Typography>
          <Typography style={{ marginTop: 16}} variant="h6">299 Lei pe luna</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" fullWidth>
            Incearca Acum
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
