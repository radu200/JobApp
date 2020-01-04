import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#3c6feb",
    color: "#fff",
    textAlign: "center",
    borderBottom: "1px solid #fff",
  },

  content: {
    backgroundColor: "#3c6feb",
    color: "#fff",
    textAlign: "center",
  },
  contentText: {
    color: "#fff",
    borderBottom:'1px solid #fff'
  },
  footer: {
    backgroundColor: "#3c6feb",
    textAlign: "center",
  },

  subscribeBtn: {
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },

 price:{
    color:"#fff"
 }
});

export default function ModalPremium({ open, handleClose }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle className={classes.title}>Descopera Premium</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contentText}>
            <Typography variant="h5">Mai multe locuri de muncă</Typography>
            <Typography variant="p">
              Postează mai multe locuri de muncă pe lună
            </Typography>
          </DialogContentText>
          <DialogContentText className={classes.contentText}>
            <Typography variant="h5">Chaturi Nelimitate</Typography>
            <Typography variant="p">
              Deblocați accesul la sute de candidați locali
            </Typography>
          </DialogContentText>{" "}
          <DialogContentText className={classes.contentText}>
            <Typography variant="h5">Angajare rapidă</Typography>
            <Typography variant="p">
              Gaseste si angajea-za mai rapid talente
            </Typography>
          </DialogContentText>
        <DialogContentText >
          <Typography variant="h6" className={classes.price} >269 Lei pe luna</Typography>
        </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button
            component={Link}
            color="primary"
            variant="contained"
            fullWidth
            className={classes.subscribeBtn}
            to="/checkout"
          >
            Incearca acum
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
