import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MainNav from "../../NavBars/MainNav/MainNav";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { supportEmail } from "../../../Utils/email";
import { fbPageId, fbAppId } from "../../../Utils/Keys/Keys";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
  },
  text: {
    marginRight: 10,
  },
});

const ContactUs = () => {
  const classes = useStyles();

  return (
    <>
      <MainNav />
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            className={classes.title}
            variant="h5"
            component="div"
            gutterBottom
          >
            Contacteza-ne
          </Typography>
          <Typography className={classes.text} variant="h6" component="div">
            Pentru ajutor vă rugăm să ne contactați pe acest mail:
          </Typography>
          <Typography color="secondary" variant="h6" component="div">
            {supportEmail}
          </Typography>
        </Grid>
      </Grid>
      <MessengerCustomerChat
        pageId={fbPageId}
        appId={fbAppId}
        htmlRef={window.location.pathname}
        language="ro"
      />
    </>
  );
};
export default ContactUs;
